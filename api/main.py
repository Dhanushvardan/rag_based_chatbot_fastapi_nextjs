from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber   

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_headers = ["*"],
    allow_methods = ["*"],
    allow_origins = ["*"],
    allow_credentials = True,
)


text = ""

@app.post("/rgchat")
def rgchat(file : UploadFile = File(...)):
    global text

    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            text += page.extract_text()


    print(text)
    return "received doc"