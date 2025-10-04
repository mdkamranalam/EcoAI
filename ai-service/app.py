import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from utils.rag_chain import setup_rag_chain
from utils.footprint_calc import calculate_footprint
from utils.simulations import run_simulation

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
rag_chain = setup_rag_chain()

class UserData(BaseModel):
    energy_kwh: float = 0.0
    miles_driven: float = 0.0
    meat_consumption: float = 0.0
    scenario: str = "none"

@app.post("/process")
async def process_data(data: UserData):
    try:
        # Calculate footprint
        footprint = calculate_footprint(data.dict())
        
        # Generate plan using RAG
        query = f"Provide a sustainability plan to reduce a carbon footprint of {footprint['total_co2']} tons CO2."
        plan = rag_chain.run(query)
        
        # Run simulation
        simulation = run_simulation(footprint["total_co2"], data.scenario)
        
        return {
            "footprint": footprint,
            "plan": plan,
            "simulation": simulation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))