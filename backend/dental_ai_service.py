"""
Dental AI Service - Advanced Backend for Ultimate Dental Chatbot

This Python service provides the AI capabilities, data processing, and integration
points for the Ultimate Dental Chatbot. It includes symptom analysis, natural language
processing, patient data management, and external service integrations.

Requirements:
- Python 3.9+
- FastAPI
- scikit-learn
- pandas
- numpy
- tensorflow
- transformers
- pymongo
- redis
- pydantic
"""

import os
import json
import logging
import datetime
from typing import Dict, List, Optional, Union, Any
from enum import Enum

# FastAPI for API endpoints
from fastapi import FastAPI, HTTPException, Depends, Header, Body, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, EmailStr

# ML and data processing
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import tensorflow as tf
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification

# Database connections
import motor.motor_asyncio
import redis.asyncio as redis

# Authentication and security
import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

# Initialize logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("dental_ai_service")

# Initialize FastAPI app
app = FastAPI(
    title="Dental AI Service",
    description="Advanced AI backend for the Ultimate Dental Chatbot",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== DATA MODELS ====================

class ToothLocation(str, Enum):
    UPPER_RIGHT_THIRD_MOLAR = "upper_right_third_molar"
    UPPER_RIGHT_SECOND_MOLAR = "upper_right_second_molar"
    UPPER_RIGHT_FIRST_MOLAR = "upper_right_first_molar"
    UPPER_RIGHT_SECOND_PREMOLAR = "upper_right_second_premolar"
    UPPER_RIGHT_FIRST_PREMOLAR = "upper_right_first_premolar"
    UPPER_RIGHT_CANINE = "upper_right_canine"
    UPPER_RIGHT_LATERAL_INCISOR = "upper_right_lateral_incisor"
    UPPER_RIGHT_CENTRAL_INCISOR = "upper_right_central_incisor"
    UPPER_LEFT_CENTRAL_INCISOR = "upper_left_central_incisor"
    UPPER_LEFT_LATERAL_INCISOR = "upper_left_lateral_incisor"
    UPPER_LEFT_CANINE = "upper_left_canine"
    UPPER_LEFT_FIRST_PREMOLAR = "upper_left_first_premolar"
    UPPER_LEFT_SECOND_PREMOLAR = "upper_left_second_premolar"
    UPPER_LEFT_FIRST_MOLAR = "upper_left_first_molar"
    UPPER_LEFT_SECOND_MOLAR = "upper_left_second_molar"
    UPPER_LEFT_THIRD_MOLAR = "upper_left_third_molar"
    LOWER_RIGHT_THIRD_MOLAR = "lower_right_third_molar"
    LOWER_RIGHT_SECOND_MOLAR = "lower_right_second_molar"
    LOWER_RIGHT_FIRST_MOLAR = "lower_right_first_molar"
    LOWER_RIGHT_SECOND_PREMOLAR = "lower_right_second_premolar"
    LOWER_RIGHT_FIRST_PREMOLAR = "lower_right_first_premolar"
    LOWER_RIGHT_CANINE = "lower_right_canine"
    LOWER_RIGHT_LATERAL_INCISOR = "lower_right_lateral_incisor"
    LOWER_RIGHT_CENTRAL_INCISOR = "lower_right_central_incisor"
    LOWER_LEFT_CENTRAL_INCISOR = "lower_left_central_incisor"
    LOWER_LEFT_LATERAL_INCISOR = "lower_left_lateral_incisor"
    LOWER_LEFT_CANINE = "lower_left_canine"
    LOWER_LEFT_FIRST_PREMOLAR = "lower_left_first_premolar"
    LOWER_LEFT_SECOND_PREMOLAR = "lower_left_second_premolar"
    LOWER_LEFT_FIRST_MOLAR = "lower_left_first_molar"
    LOWER_LEFT_SECOND_MOLAR = "lower_left_second_molar"
    LOWER_LEFT_THIRD_MOLAR = "lower_left_third_molar"

class SymptomSeverity(str, Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"

class UrgencyLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    EMERGENCY = "emergency"

class AppointmentType(str, Enum):
    CONSULTATION = "consultation"
    CLEANING = "cleaning"
    CHECKUP = "checkup"
    FILLING = "filling"
    CROWN = "crown"
    ROOT_CANAL = "root_canal"
    EXTRACTION = "extraction"
    WHITENING = "whitening"
    EMERGENCY = "emergency"

class AppointmentStatus(str, Enum):
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    RESCHEDULED = "rescheduled"

class InsuranceProvider(str, Enum):
    DELTA_DENTAL = "delta_dental"
    CIGNA = "cigna"
    AETNA = "aetna"
    METLIFE = "metlife"
    GUARDIAN = "guardian"
    UNITED_HEALTHCARE = "united_healthcare"
    HUMANA = "humana"
    BLUE_CROSS = "blue_cross"
    OTHER = "other"
    NONE = "none"

class Language(str, Enum):
    ENGLISH = "en"
    SPANISH = "es"
    FRENCH = "fr"
    GERMAN = "de"
    CHINESE = "zh"
    JAPANESE = "ja"

# Request and response models
class SymptomAnalysisRequest(BaseModel):
    tooth_location: Optional[ToothLocation] = None
    pain_level: int = Field(..., ge=0, le=10)
    symptoms: List[str]
    duration_days: Optional[int] = None
    patient_id: Optional[str] = None
    language: Language = Language.ENGLISH

class SymptomAnalysisResponse(BaseModel):
    possible_conditions: List[str]
    urgency: UrgencyLevel
    recommendations: List[str]
    needs_immediate_attention: bool
    treatment_options: List[str]
    estimated_costs: Dict[str, float]
    insurance_coverage: Optional[Dict[str, float]] = None

class ChatRequest(BaseModel):
    message: str
    patient_id: Optional[str] = None
    conversation_id: Optional[str] = None
    language: Language = Language.ENGLISH

class ChatResponse(BaseModel):
    response: str
    detected_intent: Optional[str] = None
    suggested_actions: List[str] = []
    emergency_detected: bool = False

class AppointmentRequest(BaseModel):
    patient_id: str
    appointment_type: AppointmentType
    preferred_date: datetime.date
    preferred_time: str
    doctor_preference: Optional[str] = None
    notes: Optional[str] = None
    insurance_provider: Optional[InsuranceProvider] = None

class AppointmentResponse(BaseModel):
    appointment_id: str
    confirmed_date: datetime.date
    confirmed_time: str
    doctor: str
    duration_minutes: int
    estimated_cost: float
    insurance_coverage: Optional[float] = None
    patient_responsibility: Optional[float] = None

class PatientRecord(BaseModel):
    patient_id: str
    name: str
    date_of_birth: datetime.date
    email: EmailStr
    phone: str
    address: Optional[str] = None
    insurance_provider: Optional[InsuranceProvider] = None
    insurance_id: Optional[str] = None
    medical_history: Optional[Dict[str, Any]] = None
    dental_history: Optional[Dict[str, Any]] = None
    allergies: List[str] = []
    medications: List[str] = []
    last_visit: Optional[datetime.date] = None
    next_appointment: Optional[datetime.date] = None
    treatment_plan: Optional[Dict[str, Any]] = None
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    updated_at: datetime.datetime = Field(default_factory=datetime.datetime.now)

# ==================== DATABASE CONNECTIONS ====================

# MongoDB connection
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING", "mongodb://localhost:27017")
mongo_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_CONNECTION_STRING)
db = mongo_client.dental_ai_db

# Redis connection for caching
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)

# ==================== AI MODELS ====================

# Load pre-trained models
try:
    # NLP model for intent classification
    tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
    model = AutoModelForSequenceClassification.from_pretrained("./models/intent_classifier")
    
    # Symptom analysis model
    symptom_classifier = RandomForestClassifier()
    with open("./models/symptom_classifier.pkl", "rb") as f:
        import pickle
        symptom_classifier = pickle.load(f)
    
    # Sentiment analysis for emergency detection
    sentiment_analyzer = pipeline("sentiment-analysis")
    
    logger.info("AI models loaded successfully")
except Exception as e:
    logger.error(f"Error loading AI models: {e}")
    # Use fallback models or methods

# ==================== AUTHENTICATION ====================

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-for-jwt")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Header(...)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"_id": user_id})
    if user is None:
        raise credentials_exception
    return user

# ==================== CORE AI FUNCTIONS ====================

async def analyze_symptoms(request: SymptomAnalysisRequest) -> SymptomAnalysisResponse:
    """
    Analyze dental symptoms using machine learning to provide diagnosis and recommendations.
    """
    try:
        # Prepare features for the model
        features = {
            "pain_level": request.pain_level,
            "duration_days": request.duration_days or 1,
        }
        
        # One-hot encode symptoms
        all_possible_symptoms = [
            "sharp_pain", "dull_pain", "throbbing", "sensitivity_hot", 
            "sensitivity_cold", "swelling", "bleeding", "bad_taste",
            "bad_breath", "loose_tooth", "discoloration", "broken_tooth",
            "difficulty_chewing", "jaw_pain", "headache", "fever"
        ]
        
        for symptom in all_possible_symptoms:
            features[symptom] = 1 if symptom in request.symptoms else 0
            
        # Add tooth location if provided
        if request.tooth_location:
            tooth_features = {f"location_{loc.value}": 1 if loc == request.tooth_location else 0 
                             for loc in ToothLocation}
            features.update(tooth_features)
        
        # Convert to numpy array for prediction
        feature_vector = np.array([[v for v in features.values()]])
        
        # Make prediction
        condition_probs = symptom_classifier.predict_proba(feature_vector)[0]
        condition_indices = condition_probs.argsort()[-3:][::-1]  # Top 3 conditions
        
        # Map indices to condition names
        all_conditions = [
            "Cavity", "Gum Disease", "Tooth Fracture", "Abscess", 
            "Pulpitis", "Impacted Tooth", "Tooth Sensitivity", 
            "TMJ Disorder", "Bruxism", "Oral Cancer"
        ]
        
        possible_conditions = [all_conditions[i] for i in condition_indices]
        
        # Determine urgency based on symptoms and pain level
        urgency = UrgencyLevel.LOW
        if request.pain_level >= 8 or "swelling" in request.symptoms or "fever" in request.symptoms:
            urgency = UrgencyLevel.EMERGENCY
        elif request.pain_level >= 6 or "throbbing" in request.symptoms:
            urgency = UrgencyLevel.HIGH
        elif request.pain_level >= 4:
            urgency = UrgencyLevel.MEDIUM
            
        # Generate recommendations
        recommendations = []
        needs_immediate = urgency == UrgencyLevel.EMERGENCY
        
        if needs_immediate:
            recommendations.append("Seek immediate emergency dental care")
            recommendations.append("Take over-the-counter pain medication as directed")
            recommendations.append("Apply cold compress for swelling")
        elif urgency == UrgencyLevel.HIGH:
            recommendations.append("Schedule an appointment within 24-48 hours")
            recommendations.append("Take over-the-counter pain medication as needed")
            recommendations.append("Avoid hot, cold, or sweet foods and beverages")
        else:
            recommendations.append("Schedule a regular dental appointment")
            recommendations.append("Maintain good oral hygiene")
            recommendations.append("Monitor symptoms and seek care if they worsen")
            
        # Treatment options based on conditions
        treatment_mapping = {
            "Cavity": ["Filling", "Crown", "Root Canal"],
            "Gum Disease": ["Deep Cleaning", "Antibiotics", "Gum Surgery"],
            "Tooth Fracture": ["Bonding", "Crown", "Extraction"],
            "Abscess": ["Drainage", "Root Canal", "Antibiotics"],
            "Pulpitis": ["Root Canal", "Medication", "Extraction"],
            "Impacted Tooth": ["Extraction", "Surgery", "Pain Management"],
            "Tooth Sensitivity": ["Desensitizing Toothpaste", "Fluoride Treatment", "Bonding"],
            "TMJ Disorder": ["Mouthguard", "Physical Therapy", "Medication"],
            "Bruxism": ["Night Guard", "Stress Management", "Dental Correction"],
            "Oral Cancer": ["Biopsy", "Surgery", "Radiation Therapy"]
        }
        
        treatment_options = []
        for condition in possible_conditions:
            if condition in treatment_mapping:
                treatment_options.extend(treatment_mapping[condition])
                
        # Remove duplicates while preserving order
        treatment_options = list(dict.fromkeys(treatment_options))
        
        # Estimated costs (simplified)
        cost_mapping = {
            "Filling": 150.00,
            "Crown": 1200.00,
            "Root Canal": 1000.00,
            "Deep Cleaning": 200.00,
            "Antibiotics": 50.00,
            "Gum Surgery": 1500.00,
            "Bonding": 300.00,
            "Extraction": 250.00,
            "Surgery": 2000.00,
            "Pain Management": 100.00,
            "Desensitizing Toothpaste": 20.00,
            "Fluoride Treatment": 35.00,
            "Mouthguard": 400.00,
            "Night Guard": 500.00,
            "Physical Therapy": 150.00,
            "Medication": 75.00,
            "Stress Management": 100.00,
            "Dental Correction": 1500.00,
            "Biopsy": 800.00,
            "Radiation Therapy": 5000.00
        }
        
        estimated_costs = {treatment: cost_mapping.get(treatment, 0.0) for treatment in treatment_options}
        
        # Get insurance coverage if patient_id is provided
        insurance_coverage = None
        if request.patient_id:
            patient = await db.patients.find_one({"patient_id": request.patient_id})
            if patient and patient.get("insurance_provider"):
                # Simplified coverage calculation
                coverage_rates = {
                    InsuranceProvider.DELTA_DENTAL: 0.8,
                    InsuranceProvider.CIGNA: 0.7,
                    InsuranceProvider.AETNA: 0.75,
                    InsuranceProvider.METLIFE: 0.8,
                    InsuranceProvider.GUARDIAN: 0.7,
                    InsuranceProvider.UNITED_HEALTHCARE: 0.75,
                    InsuranceProvider.HUMANA: 0.7,
                    InsuranceProvider.BLUE_CROSS: 0.8,
                    InsuranceProvider.OTHER: 0.6,
                    InsuranceProvider.NONE: 0.0
                }
                
                provider = InsuranceProvider(patient.get("insurance_provider"))
                coverage_rate = coverage_rates.get(provider, 0.0)
                insurance_coverage = {treatment: cost * coverage_rate for treatment, cost in estimated_costs.items()}
        
        # Create and return response
        return SymptomAnalysisResponse(
            possible_conditions=possible_conditions,
            urgency=urgency,
            recommendations=recommendations,
            needs_immediate_attention=needs_immediate,
            treatment_options=treatment_options,
            estimated_costs=estimated_costs,
            insurance_coverage=insurance_coverage
        )
        
    except Exception as e:
        logger.error(f"Error in symptom analysis: {e}")
        # Fallback response
        return SymptomAnalysisResponse(
            possible_conditions=["Unable to determine - please consult a dentist"],
            urgency=UrgencyLevel.MEDIUM,
            recommendations=["Schedule an appointment with a dentist for proper diagnosis"],
            needs_immediate_attention=False,
            treatment_options=["Professional dental examination"],
            estimated_costs={"Consultation": 75.00}
        )

async def process_chat_message(request: ChatRequest) -> ChatResponse:
    """
    Process a chat message using NLP to detect intent and generate appropriate responses.
    """
    try:
        # Check for emergency keywords first
        emergency_keywords = [
            "emergency", "severe pain", "unbearable", "bleeding", "swelling",
            "accident", "broken", "knocked out", "can't sleep", "extreme"
        ]
        
        message_lower = request.message.lower()
        emergency_detected = any(keyword in message_lower for keyword in emergency_keywords)
        
        # Detect intent using the model
        inputs = tokenizer(request.message, return_tensors="pt", truncation=True, padding=True)
        outputs = model(**inputs)
        
        # Get predicted intent
        intent_id = outputs.logits.argmax(-1).item()
        
        # Map intent ID to intent name
        intent_mapping = {
            0: "greeting",
            1: "appointment_booking",
            2: "symptom_inquiry",
            3: "service_inquiry",
            4: "cost_inquiry",
            5: "insurance_inquiry",
            6: "location_inquiry",
            7: "hours_inquiry",
            8: "general_question",
            9: "farewell"
        }
        
        detected_intent = intent_mapping.get(intent_id, "general_question")
        
        # Generate response based on intent
        response_templates = {
            "greeting": [
                "Hello! Welcome to Bright Smile Dental Clinic. How can I assist you today?",
                "Hi there! I'm your dental assistant. What can I help you with?",
                "Welcome! How may I help with your dental needs today?"
            ],
            "appointment_booking": [
                "I'd be happy to help you book an appointment. What day works best for you?",
                "Let's get you scheduled. Do you prefer a morning or afternoon appointment?",
                "I can help you schedule a visit. What type of appointment do you need?"
            ],
            "symptom_inquiry": [
                "I'm sorry to hear you're experiencing dental issues. Can you describe your symptoms in detail?",
                "Let me help assess your dental concern. On a scale of 1-10, how severe is your pain?",
                "To better understand your situation, could you tell me which tooth is bothering you?"
            ],
            "service_inquiry": [
                "We offer a comprehensive range of dental services including cleanings, fillings, crowns, root canals, and cosmetic procedures. What specific service are you interested in?",
                "Our clinic provides general dentistry, cosmetic procedures, orthodontics, and emergency care. Would you like details about any specific service?",
                "From routine cleanings to advanced procedures, we offer complete dental care. What would you like to know more about?"
            ],
            "cost_inquiry": [
                "Our pricing varies by procedure. For example, cleanings start at $120, fillings at $150, and crowns at $800. Would you like a specific cost estimate?",
                "I can provide general pricing information or a personalized estimate based on your insurance. What procedure are you inquiring about?",
                "We offer transparent pricing and work with most insurance plans. Which treatment are you interested in?"
            ],
            "insurance_inquiry": [
                "We accept most major insurance plans including Delta Dental, Cigna, Aetna, and more. Would you like us to verify your specific coverage?",
                "Our office works with a wide range of insurance providers. We'd be happy to check your benefits before your appointment.",
                "Insurance coverage varies by plan. If you provide your insurance details, we can verify your coverage for specific procedures."
            ],
            "location_inquiry": [
                "We're located at 123 Smile Street in Downtown Healthy City. Would you like directions?",
                "Our clinic is at 123 Smile Street, with convenient parking and public transit access. Can I help you with directions?",
                "You can find us at 123 Smile Street, Downtown. We're near Central Park with ample parking available."
            ],
            "hours_inquiry": [
                "Our hours are Monday-Friday 8AM-6PM, Saturday 9AM-3PM, and we're closed on Sundays. We also have 24/7 emergency services.",
                "We're open weekdays from 8AM to 6PM and Saturdays from 9AM to 3PM. How can we help you?",
                "Our clinic operates Monday through Friday from 8AM to 6PM and Saturdays from 9AM to 3PM. We have on-call emergency services available 24/7."
            ],
            "general_question": [
                "That's a great question. I'll do my best to help you with that.",
                "I'd be happy to assist with your inquiry. Could you provide a bit more detail?",
                "I'm here to help with any dental questions you might have."
            ],
            "farewell": [
                "Thank you for chatting with us today! If you need anything else, don't hesitate to reach out.",
                "Have a great day! Remember to brush and floss regularly.",
                "Goodbye! We look forward to seeing your smile soon!"
            ]
        }
        
        import random
        response_text = random.choice(response_templates.get(detected_intent, response_templates["general_question"]))
        
        # Handle emergency cases
        if emergency_detected:
            response_text = "🚨 DENTAL EMERGENCY DETECTED: Please call our emergency line immediately at (555) 911-TOOTH. For severe pain or swelling, take over-the-counter pain medication and apply a cold compress while waiting."
        
        # Generate suggested actions based on intent
        suggested_actions = []
        if detected_intent == "appointment_booking":
            suggested_actions = ["Book appointment", "View available times", "See doctor profiles"]
        elif detected_intent == "symptom_inquiry":
            suggested_actions = ["Use tooth map", "Rate pain level", "View possible conditions"]
        elif detected_intent == "service_inquiry":
            suggested_actions = ["View service details", "See before/after gallery", "Check pricing"]
        elif detected_intent == "cost_inquiry":
            suggested_actions = ["Verify insurance", "View payment options", "Get detailed estimate"]
        
        # Translate response if needed
        if request.language != Language.ENGLISH:
            # In a real implementation, this would call a translation service
            # For now, we'll just note that translation would happen
            response_text = f"[Translated to {request.language.value}] {response_text}"
        
        # Store conversation in database if conversation_id provided
        if request.conversation_id:
            await db.conversations.update_one(
                {"conversation_id": request.conversation_id},
                {"$push": {"messages": {
                    "timestamp": datetime.datetime.now(),
                    "user_message": request.message,
                    "bot_response": response_text,
                    "intent": detected_intent,
                    "emergency_detected": emergency_detected
                }}},
                upsert=True
            )
        
        return ChatResponse(
            response=response_text,
            detected_intent=detected_intent,
            suggested_actions=suggested_actions,
            emergency_detected=emergency_detected
        )
        
    except Exception as e:
        logger.error(f"Error processing chat message: {e}")
        return ChatResponse(
            response="I apologize, but I'm having trouble processing your request right now. Please try again or contact our office directly at (555) 123-SMILE.",
            emergency_detected=False
        )

async def schedule_appointment(request: AppointmentRequest) -> AppointmentResponse:
    """
    Schedule a dental appointment based on patient preferences and availability.
    """
    try:
        # Check if patient exists
        patient = await db.patients.find_one({"patient_id": request.patient_id})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Check doctor availability
        available_doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Jones"]
        assigned_doctor = request.doctor_preference if request.doctor_preference in available_doctors else available_doctors[0]
        
        # Check time slot availability (simplified)
        # In a real system, this would query a calendar database
        available_times = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
        confirmed_time = request.preferred_time if request.preferred_time in available_times else available_times[0]
        
        # Determine appointment duration based on type
        duration_mapping = {
            AppointmentType.CONSULTATION: 60,
            AppointmentType.CLEANING: 45,
            AppointmentType.CHECKUP: 30,
            AppointmentType.FILLING: 60,
            AppointmentType.CROWN: 90,
            AppointmentType.ROOT_CANAL: 120,
            AppointmentType.EXTRACTION: 45,
            AppointmentType.WHITENING: 90,
            AppointmentType.EMERGENCY: 30
        }
        duration = duration_mapping.get(request.appointment_type, 60)
        
        # Determine cost based on appointment type
        cost_mapping = {
            AppointmentType.CONSULTATION: 75.0,
            AppointmentType.CLEANING: 120.0,
            AppointmentType.CHECKUP: 85.0,
            AppointmentType.FILLING: 200.0,
            AppointmentType.CROWN: 800.0,
            AppointmentType.ROOT_CANAL: 900.0,
            AppointmentType.EXTRACTION: 250.0,
            AppointmentType.WHITENING: 400.0,
            AppointmentType.EMERGENCY: 150.0
        }
        estimated_cost = cost_mapping.get(request.appointment_type, 100.0)
        
        # Calculate insurance coverage if provided
        insurance_coverage = None
        patient_responsibility = None
        
        if request.insurance_provider:
            coverage_rates = {
                InsuranceProvider.DELTA_DENTAL: 0.8,
                InsuranceProvider.CIGNA: 0.7,
                InsuranceProvider.AETNA: 0.75,
                InsuranceProvider.METLIFE: 0.8,
                InsuranceProvider.GUARDIAN: 0.7,
                InsuranceProvider.UNITED_HEALTHCARE: 0.75,
                InsuranceProvider.HUMANA: 0.7,
                InsuranceProvider.BLUE_CROSS: 0.8,
                InsuranceProvider.OTHER: 0.6,
                InsuranceProvider.NONE: 0.0
            }
            
            coverage_rate = coverage_rates.get(request.insurance_provider, 0.0)
            insurance_coverage = estimated_cost * coverage_rate
            patient_responsibility = estimated_cost - insurance_coverage
        
        # Generate appointment ID
        import uuid
        appointment_id = f"APT-{uuid.uuid4().hex[:8].upper()}"
        
        # Store appointment in database
        appointment_data = {
            "appointment_id": appointment_id,
            "patient_id": request.patient_id,
            "appointment_type": request.appointment_type,
            "date": request.preferred_date,
            "time": confirmed_time,
            "doctor": assigned_doctor,
            "duration_minutes": duration,
            "estimated_cost": estimated_cost,
            "insurance_provider": request.insurance_provider,
            "insurance_coverage": insurance_coverage,
            "patient_responsibility": patient_responsibility,
            "notes": request.notes,
            "status": AppointmentStatus.SCHEDULED,
            "created_at": datetime.datetime.now()
        }
        
        await db.appointments.insert_one(appointment_data)
        
        # Update patient record with next appointment
        await db.patients.update_one(
            {"patient_id": request.patient_id},
            {"$set": {"next_appointment": request.preferred_date}}
        )
        
        # Send confirmation (would integrate with SMS/email service)
        logger.info(f"Appointment confirmation would be sent for appointment {appointment_id}")
        
        return AppointmentResponse(
            appointment_id=appointment_id,
            confirmed_date=request.preferred_date,
            confirmed_time=confirmed_time,
            doctor=assigned_doctor,
            duration_minutes=duration,
            estimated_cost=estimated_cost,
            insurance_coverage=insurance_coverage,
            patient_responsibility=patient_responsibility
        )
        
    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        logger.error(f"Error scheduling appointment: {e}")
        raise HTTPException(status_code=500, detail="Failed to schedule appointment")

# ==================== API ENDPOINTS ====================

@app.get("/")
async def root():
    return {"message": "Dental AI Service API", "version": "1.0.0", "status": "operational"}

@app.post("/api/symptom-analysis", response_model=SymptomAnalysisResponse)
async def symptom_analysis_endpoint(request: SymptomAnalysisRequest):
    """
    Analyze dental symptoms and provide diagnosis and recommendations.
    """
    return await analyze_symptoms(request)

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Process a chat message and generate an appropriate response.
    """
    return await process_chat_message(request)

@app.post("/api/appointments", response_model=AppointmentResponse)
async def appointment_endpoint(request: AppointmentRequest):
    """
    Schedule a dental appointment.
    """
    return await schedule_appointment(request)

@app.get("/api/patients/{patient_id}", response_model=PatientRecord)
async def get_patient(patient_id: str, current_user: dict = Depends(get_current_user)):
    """
    Get patient record by ID.
    """
    patient = await db.patients.find_one({"patient_id": patient_id})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return PatientRecord(**patient)

@app.post("/api/patients", response_model=PatientRecord)
async def create_patient(patient: PatientRecord, current_user: dict = Depends(get_current_user)):
    """
    Create a new patient record.
    """
    existing = await db.patients.find_one({"patient_id": patient.patient_id})
    if existing:
        raise HTTPException(status_code=400, detail="Patient ID already exists")
    
    patient_dict = patient.dict()
    await db.patients.insert_one(patient_dict)
    return patient

@app.put("/api/patients/{patient_id}", response_model=PatientRecord)
async def update_patient(patient_id: str, patient_update: PatientRecord, current_user: dict = Depends(get_current_user)):
    """
    Update an existing patient record.
    """
    existing = await db.patients.find_one({"patient_id": patient_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    patient_dict = patient_update.dict(exclude_unset=True)
    patient_dict["updated_at"] = datetime.datetime.now()
    
    await db.patients.update_one({"patient_id": patient_id}, {"$set": patient_dict})
    updated_patient = await db.patients.find_one({"patient_id": patient_id})
    return PatientRecord(**updated_patient)

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint for monitoring.
    """
    # Check database connection
    try:
        await db.command("ping")
        db_status = "connected"
    except Exception:
        db_status = "disconnected"
    
    # Check Redis connection
    try:
        await redis_client.ping()
        redis_status = "connected"
    except Exception:
        redis_status = "disconnected"
    
    # Check AI models
    models_status = "loaded" if "model" in globals() and model is not None else "not loaded"
    
    return {
        "status": "healthy" if db_status == "connected" and redis_status == "connected" else "degraded",
        "timestamp": datetime.datetime.now().isoformat(),
        "version": "1.0.0",
        "components": {
            "database": db_status,
            "cache": redis_status,
            "ai_models": models_status
        }
    }

# ==================== MAIN ENTRY POINT ====================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("dental_ai_service:app", host="0.0.0.0", port=8000, reload=True)
