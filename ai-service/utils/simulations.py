import os
import numpy as np
from dotenv import load_dotenv
from langchain_cerebras import ChatCerebras
from langchain_core.prompts import PromptTemplate

load_dotenv()

def run_simulation(current_co2, scenario):
    if scenario == "ev_adoption":
        # Basic Monte Carlo with numpy (for simple sims)
        samples = 1000
        reduction = np.random.normal(0.3, 0.05, samples)  # 30% reduction ±5%
        new_co2 = current_co2 * (1 - np.mean(reduction))
        
        # Accelerate with Cerebras: Use LLM for reasoned insights (fast inference)
        llm = ChatCerebras(
            model="llama3.1-8b",
            api_key=os.getenv("CEREBRAS_API_KEY"),
            max_tokens=256,
        )
        prompt = PromptTemplate.from_template(
            "Based on a {scenario} scenario reducing CO2 by about {reduction_pct}%, provide a brief explanation and confidence level for a new CO2 of {new_co2} tons."
        )
        chain = prompt | llm
        insights = chain.invoke({
            "scenario": scenario,
            "reduction_pct": 30,
            "new_co2": round(new_co2, 2)
        }).content
        
        return {"new_co2": new_co2, "confidence": 0.95, "insights": insights}
    
    return {"new_co2": current_co2, "confidence": 0, "insights": "No simulation run"}