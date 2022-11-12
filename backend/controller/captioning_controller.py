from PIL import Image
from io import BytesIO
import torch
from torchvision import transforms
from torchvision.transforms.functional import InterpolationMode
from models.blip import BLIP

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

transform = transforms.Compose([
    transforms.Resize((384, 384),interpolation=InterpolationMode.BICUBIC),
    transforms.ToTensor(),
    transforms.Normalize((0.48145466, 0.4578275, 0.40821073), (0.26862954, 0.26130258, 0.27577711))
    ]) 

pretrainedModel = 'https://storage.googleapis.com/sfr-vision-language-research/BLIP/models/model_large_caption.pth'
    
model = BLIP(pretrainedModel)
model.eval()
model = model.to(device)

def apiCaption(rawImage, strategy: str):
    convertedImage = Image.open(BytesIO(rawImage))
    image = transform(convertedImage).unsqueeze(0).to(device)   

    with torch.no_grad():
        caption = model.generate(image, strategy = strategy)
        
        return caption[0]
