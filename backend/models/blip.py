import warnings
warnings.filterwarnings("ignore")
import logging
import os

from models.vit import VisionTransformer, interpolate_pos_embed
from models.med import BertConfig, BertModel, BertLMHeadModel
from transformers import BertTokenizer

import torch
from torch import nn
try:
    from torch.hub import get_dir
except ImportError:
    from torch.hub import _get_torch_home as get_dir
from torch.hub import HASH_REGEX, download_url_to_file, urlparse

        
class BLIP_Decoder(nn.Module):
    def __init__(self,                 
                 med_config = 'models/medConfig.json',  
                 imageSize = 384,
                 visionWidth = 1024,
                 depth = 24,
                 numHeads = 16,
                 dropPathRate = 0.1
                 ):
        
        super().__init__()
        
        self.visual_encoder, vision_width = createVit(imageSize, visionWidth, depth, numHeads, dropPathRate)
        self.tokenizer = initTokenizer()   
        med_config = BertConfig.from_json_file(med_config)
        med_config.encoder_width = vision_width
        self.text_decoder = BertLMHeadModel(config=med_config)    
        
        self.prompt = "a picture of "
        self.prompt_length = len(self.tokenizer(self.prompt).input_ids)-1

        
    def forward(self, image, caption):
        
        imageEmbeds = self.visual_encoder(image) 
        imageAtts = torch.ones(imageEmbeds.size()[:-1],dtype=torch.long).to(image.device)
        
        text = self.tokenizer(caption, padding='longest', truncation=True, max_length=40, return_tensors="pt").to(image.device) 
        
        text.input_ids[:,0] = self.tokenizer.bos_token_id
        
        decoderTargets = text.input_ids.masked_fill(text.input_ids == self.tokenizer.pad_token_id, -100)         
        decoderTargets[:,:self.prompt_length] = -100
    
        decoderOutput = self.text_decoder(text.input_ids, 
                                           attention_mask = text.attention_mask, 
                                           encoder_hidden_states = imageEmbeds,
                                           encoder_attention_mask = imageAtts,                  
                                           labels = decoderTargets,
                                           return_dict = True,   
                                          )   
        loss = decoderOutput.loss
        
        return loss
        
    def generate(self, image, strategy, num_beams=3, max_length=20, min_length=5, top_p=0.9, repetition_penalty=1.0):
        imageEmbeds = self.visual_encoder(image)

        if strategy == "Beam Search":
            imageEmbeds = imageEmbeds.repeat_interleave(num_beams,dim=0)
            
        imageAtts = torch.ones(imageEmbeds.size()[:-1],dtype=torch.long).to(image.device)
        model_kwargs = {"encoder_hidden_states": imageEmbeds, "encoder_attention_mask":imageAtts}
        
        prompt = [self.prompt] * image.size(0)
        input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids.to(image.device) 
        input_ids[:,0] = self.tokenizer.bos_token_id
        input_ids = input_ids[:, :-1] 

        if strategy == "Nucleus Sampling":
            outputs = self.text_decoder.generate(input_ids=input_ids,
                                                  max_length=max_length,
                                                  min_length=min_length,
                                                  do_sample=True,
                                                  top_p=top_p,
                                                  num_return_sequences=1,
                                                  eos_token_id=self.tokenizer.sep_token_id,
                                                  pad_token_id=self.tokenizer.pad_token_id, 
                                                  repetition_penalty=1.1,                                            
                                                  **model_kwargs)
        elif strategy == "Beam Search":
            outputs = self.text_decoder.generate(input_ids=input_ids,
                                                  max_length=max_length,
                                                  min_length=min_length,
                                                  num_beams=num_beams,
                                                  eos_token_id=self.tokenizer.sep_token_id,
                                                  pad_token_id=self.tokenizer.pad_token_id,     
                                                  repetition_penalty=repetition_penalty,
                                                  **model_kwargs)            
            
        captions = []    
        for output in outputs:
            caption = self.tokenizer.decode(output, skip_special_tokens=True)    
            captions.append(caption[len(self.prompt):])
        return captions
    

def createVit(imageSize, visionWidth, depth, numHeads, dropPathRate):
    visualEncoder = VisionTransformer(img_size = imageSize, patch_size=16, embed_dim=visionWidth, depth=depth, 
                                      num_heads=numHeads, use_grad_checkpointing=False, ckpt_layer=0,
                                      drop_path_rate = dropPathRate
                                      )   

    return visualEncoder, visionWidth


def initTokenizer():
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    tokenizer.add_special_tokens({'bos_token':'[DEC]'})
    tokenizer.add_special_tokens({'additional_special_tokens':['[ENC]']})       
    tokenizer.enc_token_id = tokenizer.additional_special_tokens_ids[0]  
    return tokenizer


def BLIP(url: str, **kwargs):
    model = BLIP_Decoder(**kwargs)
    model,msg = loadCheckPoint(model,url)
    assert(len(msg.missing_keys)==0)

    return model    


def loadCheckPoint(model,url):
    cachedFile = downloadCachedFile(url, checkHash=False, progress=True)
    checkpoint = torch.load(cachedFile) 
        
    stateDict = checkpoint['model']
    
    stateDict['visual_encoder.pos_embed'] = interpolate_pos_embed(stateDict['visual_encoder.pos_embed'],model.visual_encoder) 
    if 'visual_encoder_m.pos_embed' in model.state_dict().keys():
        stateDict['visual_encoder_m.pos_embed'] = interpolate_pos_embed(stateDict['visual_encoder_m.pos_embed'],
                                                                         model.visual_encoder_m)    
    for key in model.state_dict().keys():
        if key in stateDict.keys():
            if stateDict[key].shape!=model.state_dict()[key].shape:
                del stateDict[key]
    
    msg = model.load_state_dict(stateDict,strict=False)
    print(url, "loaded")  
    return model,msg

_logger = logging.getLogger(__name__)

def downloadCachedFile(url, checkHash, progress):
    parts = urlparse(url.replace('*', ''))
    filename = os.path.basename(parts.path)
    cachedFile = os.path.join(getCacheDir(''), filename)
    if not os.path.exists(cachedFile):
        _logger.info('Downloading: "{}" to {}\n'.format(url, cachedFile))
        hashPrefix = None
        if checkHash:
            r = HASH_REGEX.search(filename)  # r is Optional[Match[str]]
            hashPrefix = r.group(1) if r else None
        download_url_to_file(url, cachedFile, hashPrefix, progress=progress)
    return cachedFile

def getCacheDir(childDir):
    # Issue warning to move data if old env is set
    if os.getenv('TORCH_MODEL_ZOO'):
        _logger.warning('TORCH_MODEL_ZOO is deprecated, please use env TORCH_HOME instead')

    hubDir = get_dir().replace("/", '\\')
    childDir = () if not childDir else (childDir,)
    modelDir = os.path.join(hubDir, 'checkpoints', *childDir)
    os.makedirs(modelDir, exist_ok=True)
    return modelDir
