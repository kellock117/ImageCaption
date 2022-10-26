from PIL import Image
from io import BytesIO
import torch
from torchvision import transforms
from torchvision.transforms.functional import InterpolationMode
from models.blip import blip_decoder

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

image_size = 384
transform = transforms.Compose([
    transforms.Resize((image_size,image_size),interpolation=InterpolationMode.BICUBIC),
    transforms.ToTensor(),
    transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))
    ]) 

modelUrl = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_large_caption.pth'
    
model = blip_decoder(pretrained=modelUrl, image_size=384, vit='large')
model.eval()
model = model.to(device)

def apiCaption(rawImage, strategy: str):
    convertedImage = Image.open(BytesIO(rawImage))
    image = transform(convertedImage).unsqueeze(0).to(device)   

    with torch.no_grad():
        if strategy == "BeamSearch":
            caption = model.generate(image, sample=False, num_beams=3, max_length=20, min_length=5)
        elif strategy == "NucleusSampling":
            caption = model.generate(image, sample=True, top_p=0.9, max_length=20, min_length=5)
        
        return caption[0]
