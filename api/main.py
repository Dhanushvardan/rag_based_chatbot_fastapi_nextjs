from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from langgraph.graph import StateGraph
from langchain_core.documents import Document    
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from typing import TypedDict


load_dotenv()

class qst(BaseModel):
    qst :str

class state(TypedDict):
    txt : str
    ct :str
    qn :str
    ot :str

embeddings = HuggingFaceEmbeddings(model_name = "sentence-transformers/paraphrase-MiniLM-L3-v2")



llm = ChatOpenAI(
    model = "llama-3.3-70b-versatile",
    base_url = "https://api.groq.com/openai/v1",
    

)
    


def ragNode(state:state):

    doc = state["txt"]
    qs = state["qs"]

    dmt = [Document(page_content=doc,metadata={"id":1})]
    vectorstore = FAISS.from_documents(dmt,embeddings)
    retriever = vectorstore.as_retriever()
    dd = retriever.get_relevant_documents(qs)
    ct = "\n".join([d.page_content for d in dd])

    return {"qs":text,"txt":state["txt"],"ct":ct}


def llmNode(state:state):
    ct = state["ct"]
    qs = state["qs"]

    res = llm.invoke(ct + "this is the context" + "answer me" + qs)

    return {"ot":res.content}



graph = StateGraph(state)
graph.add_node("ragNode", ragNode)
graph.add_node("llmNode",llmNode)
graph.set_entry_point("ragNode")
graph.add_edge("ragNode","llmNode")


app_graph = graph.compile()












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

@app.post("/askragai")
def askragAi(req:qst):
    res = app_graph.invoke({"qs":req.qs})
    print(res)
    return res["ot"]

@app.post("askai")
def askAi(req:qst):
    res = llm.invoke("answer me for" + req.qs)
    return res

