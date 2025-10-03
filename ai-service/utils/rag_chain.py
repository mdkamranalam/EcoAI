import os
from dotenv import load_dotenv
from langchain_cerebras import ChatCerebras
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

def setup_rag_chain():
    # Load embeddings
    embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    
    # Load FAISS vector store
    vectorstore = FAISS.load_local("data/climate_docs", embeddings=embeddings, allow_dangerous_deserialization=True)
    
    # Setup LLM with Cerebras (fast inference)
    llm = ChatCerebras(
        model="llama3.1-8b",
        api_key=os.getenv("CEREBRAS_API_KEY"),
        max_tokens=512,
        temperature=0.7,
    )
    
    # Setup RAG chain
    rag_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    )
    return rag_chain