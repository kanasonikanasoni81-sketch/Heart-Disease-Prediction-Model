from fastapi import FastAPI, HTTPException
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field 
import pandas as pd 
import joblib
load_dotenv()

# Load the Trained Model

model  =  joblib.load('KNN_heart.pkl')
scaler =  joblib.load('scaler.pkl')
expected_columns = joblib.load('columns.pkl')


# Create FastAPI app

app  =  FastAPI(

    title = "Heart Disease Prediction API",
    description = "API for AI_based heart disease risk prediction",
    version = "1.0.0"
)

# Allow React frontend to connect

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input data

class HeartData(BaseModel):
    age: int = Field(..., ge=18, le=100)
    sex: str
    chest_pain: str
    resting_bp: int = Field(..., ge=80, le=200)
    cholesterol: int = Field(..., ge=100, le=600)
    fasting_bs: int = Field(..., ge=0, le=1)
    resting_ecg: str
    max_hr: int = Field(..., ge=60, le=220)
    exercise_angina: str
    oldpeak: float = Field(..., ge=0, le=6)
    st_slope: str


# Home Route

@app.get("/")
def home():
    return {
        "message": "Welcome to the Heart Disease Prediction API."
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "KNN Heart Disease Model"
    }

# Prediction Route

@app.post("/predict")
def predict(data: HeartData):

    try:
        raw_input = {
            "Age": data.age,
            "RestingBP": data.resting_bp,
            "Cholesterol": data.cholesterol,
            "FastingBS": data.fasting_bs,
            "MaxHR": data.max_hr,
            "Oldpeak": data.oldpeak,
            "Sex_" + data.sex: 1,
            "ChestPainType_" + data.chest_pain: 1,
            "RestingECG_" + data.resting_ecg: 1,
            "ExerciseAngina_" + data.exercise_angina: 1,
            "ST_Slope_" + data.st_slope: 1,
        }

        input_df = pd.DataFrame([raw_input])

        for col in expected_columns:
            if col not in input_df.columns:
                input_df[col] = 0

        input_df = input_df[expected_columns]

        scaled_input = scaler.transform(input_df)

        prediction = int(model.predict(scaled_input)[0])

        probability = None

        if hasattr(model, "predict_proba"):
            probability = float(
                model.predict_proba(scaled_input)[0][1]
            )

        if prediction == 1:
            risk = "High Risk"
        else:
            risk = "Low Risk"

        return {
            "prediction": prediction,
            "risk": risk,
            "probability": probability,
        }

    except Exception as error:
        print("Prediction error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to process the prediction."
        )