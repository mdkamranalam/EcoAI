def calculate_footprint(data):
    # Placeholder formulas based on EPA factors
    energy_co2 = data.get("energy_kwh", 0) * 0.0005  # tons CO2 per kWh
    travel_co2 = data.get("miles_driven", 0) * 0.0004  # tons CO2 per mile
    diet_co2 = data.get("meat_consumption", 0) * 0.006  # tons CO2 per kg
    total = energy_co2 + travel_co2 + diet_co2
    return {"total_co2": total, "breakdown": {"energy": energy_co2, "travel": travel_co2, "diet": diet_co2}}