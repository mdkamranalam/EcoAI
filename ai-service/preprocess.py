import os
from dotenv import load_dotenv
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain_core.documents import Document
import pandas as pd
from pathlib import Path

load_dotenv()

def preprocess_data():
    data_dir = Path("data")
    docs = []
    
    # Load PDF
    loader = PyPDFLoader(str(data_dir / "ipcc_wg3.pdf"))
    docs.extend(loader.load())
    
    # Load CSV as Document
    df = pd.read_csv(data_dir / "epa_factors.csv")
    csv_doc = Document(page_content=df.to_string(index=False))
    docs.append(csv_doc)
    
    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    split_docs = text_splitter.split_documents(docs)
    
    # Generate embeddings and build FAISS
    embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    vectorstore = FAISS.from_documents(split_docs, embeddings)
    
    # Save index
    vectorstore.save_local("data/climate_docs")

if __name__ == "__main__":
    preprocess_data()