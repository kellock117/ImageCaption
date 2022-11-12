from models.blip_vqa import VQA
from PIL import Image
from io import BytesIO

import torch
from torchvision import transforms
from torchvision.transforms.functional import InterpolationMode

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

transform_vq = transforms.Compose([
    transforms.Resize((480, 480),interpolation=InterpolationMode.BICUBIC),
    transforms.ToTensor(),
    transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))
    ]) 

pretrainedModel = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model*_vqa.pth'
    
model_vq = VQA(pretrainedModel)
model_vq.eval()
model_vq = model_vq.to(device)


def apiVQA(rawImage, question:str):
    convertedImage = Image.open(BytesIO(rawImage))

    image_vq = transform_vq(convertedImage).unsqueeze(0).to(device)  
    with torch.no_grad():
        answer = model_vq(image_vq, question, train=False, inference='generate') 

    return answer[0]
    