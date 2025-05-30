import { type NextRequest, NextResponse } from "next/server"

// Define types to match Python backend
type ToothLocation =
  | "upper_right_third_molar"
  | "upper_right_second_molar"
  | "upper_right_first_molar"
  | "upper_right_second_premolar"
  | "upper_right_first_premolar"
  | "upper_right_canine"
  | "upper_right_lateral_incisor"
  | "upper_right_central_incisor"
  | "upper_left_central_incisor"
  | "upper_left_lateral_incisor"
  | "upper_left_canine"
  | "upper_left_first_premolar"
  | "upper_left_second_premolar"
  | "upper_left_first_molar"
  | "upper_left_second_molar"
  | "upper_left_third_molar"
  | "lower_right_third_molar"
  | "lower_right_second_molar"
  | "lower_right_first_molar"
  | "lower_right_second_premolar"
  | "lower_right_first_premolar"
  | "lower_right_canine"
  | "lower_right_lateral_incisor"
  | "lower_right_central_incisor"
  | "lower_left_central_incisor"
  | "lower_left_lateral_incisor"
  | "lower_left_canine"
  | "lower_left_first_premolar"
  | "lower_left_second_premolar"
  | "lower_left_first_molar"
  | "lower_left_second_molar"
  | "lower_left_third_molar"

type UrgencyLevel = "low" | "medium" | "high" | "emergency"
type Language = "en" | "es" | "fr" | "de" | "zh" | "ja"

interface SymptomAnalysisRequest {
  tooth_location?: ToothLocation
  pain_level: number
  symptoms: string[]
  duration_days?: number
  patient_id?: string
  language: Language
}

interface SymptomAnalysisResponse {
  possible_conditions: string[]
  urgency: UrgencyLevel
  recommendations: string[]
  needs_immediate_attention: boolean
  treatment_options: string[]
  estimated_costs: Record<string, number>
  insurance_coverage?: Record<string, number>
}

interface ChatRequest {
  message: string
  patient_id?: string
  conversation_id?: string
  language: Language
}

interface ChatResponse {
  response: string
  detected_intent?: string
  suggested_actions: string[]
  emergency_detected: boolean
}

// API endpoint for symptom analysis
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Determine which API endpoint to call based on the request data
    if ("message" in data) {
      // This is a chat request
      const chatRequest: ChatRequest = {
        message: data.message,
        patient_id: data.patient_id,
        conversation_id: data.conversation_id,
        language: data.language || "en",
      }

      // In production, this would call the actual Python backend
      // For now, we'll simulate a response
      const response: ChatResponse = await simulateChatResponse(chatRequest)
      return NextResponse.json(response)
    } else if ("pain_level" in data) {
      // This is a symptom analysis request
      const symptomRequest: SymptomAnalysisRequest = {
        tooth_location: data.tooth_location,
        pain_level: data.pain_level,
        symptoms: data.symptoms,
        duration_days: data.duration_days,
        patient_id: data.patient_id,
        language: data.language || "en",
      }

      // In production, this would call the actual Python backend
      // For now, we'll simulate a response
      const response: SymptomAnalysisResponse = await simulateSymptomAnalysis(symptomRequest)
      return NextResponse.json(response)
    } else {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Simulate responses for development/demo purposes
async function simulateChatResponse(request: ChatRequest): Promise<ChatResponse> {
  // Check for emergency keywords
  const emergencyKeywords = [
    "emergency",
    "severe pain",
    "unbearable",
    "bleeding",
    "swelling",
    "accident",
    "broken",
    "knocked out",
    "can't sleep",
    "extreme",
  ]

  const message = request.message.toLowerCase()
  const emergencyDetected = emergencyKeywords.some((keyword) => message.includes(keyword))

  // Simple intent detection
  let intent = "general_question"
  if (message.includes("appointment") || message.includes("book") || message.includes("schedule")) {
    intent = "appointment_booking"
  } else if (message.includes("pain") || message.includes("hurt") || message.includes("ache")) {
    intent = "symptom_inquiry"
  } else if (message.includes("cost") || message.includes("price") || message.includes("fee")) {
    intent = "cost_inquiry"
  } else if (message.includes("insurance") || message.includes("coverage")) {
    intent = "insurance_inquiry"
  } else if (message.includes("hello") || message.includes("hi ") || message.includes("hey")) {
    intent = "greeting"
  } else if (message.includes("bye") || message.includes("goodbye") || message.includes("thank")) {
    intent = "farewell"
  }

  // Generate response based on intent
  let response = ""
  let suggestedActions: string[] = []

  if (emergencyDetected) {
    response =
      "🚨 DENTAL EMERGENCY DETECTED: Please call our emergency line immediately at (555) 911-TOOTH. For severe pain or swelling, take over-the-counter pain medication and apply a cold compress while waiting."
    suggestedActions = ["Call emergency line", "View emergency care instructions", "Find nearest emergency clinic"]
  } else {
    switch (intent) {
      case "greeting":
        response = "Hello! Welcome to Bright Smile Dental Clinic. How can I assist you today?"
        suggestedActions = ["Book appointment", "Dental services", "Find location", "Emergency care"]
        break
      case "appointment_booking":
        response = "I'd be happy to help you book an appointment. What day works best for you?"
        suggestedActions = ["View calendar", "Morning appointment", "Afternoon appointment", "Emergency slot"]
        break
      case "symptom_inquiry":
        response = "I'm sorry to hear you're experiencing dental issues. Can you describe your symptoms in detail?"
        suggestedActions = ["Use tooth map", "Rate pain level", "List symptoms", "Emergency care"]
        break
      case "cost_inquiry":
        response =
          "Our pricing varies by procedure. For example, cleanings start at $120, fillings at $150, and crowns at $800. Would you like a specific cost estimate?"
        suggestedActions = ["Insurance verification", "Payment plans", "Service pricing", "Free consultation"]
        break
      case "insurance_inquiry":
        response =
          "We accept most major insurance plans including Delta Dental, Cigna, Aetna, and more. Would you like us to verify your specific coverage?"
        suggestedActions = ["Verify benefits", "Submit insurance info", "Self-pay options", "Payment plans"]
        break
      case "farewell":
        response = "Thank you for chatting with us today! If you need anything else, don't hesitate to reach out."
        suggestedActions = ["Book appointment", "Contact us", "Leave feedback", "Visit website"]
        break
      default:
        response =
          "That's a great question. I'll do my best to help you with that. Is there anything specific you'd like to know about our dental services?"
        suggestedActions = ["Services offered", "Meet our doctors", "Patient testimonials", "Contact us"]
    }
  }

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    response,
    detected_intent: intent,
    suggested_actions: suggestedActions,
    emergency_detected: emergencyDetected,
  }
}

async function simulateSymptomAnalysis(request: SymptomAnalysisRequest): Promise<SymptomAnalysisResponse> {
  // Determine urgency based on pain level and symptoms
  let urgency: UrgencyLevel = "low"
  let needsImmediate = false

  if (request.pain_level >= 8) {
    urgency = "emergency"
    needsImmediate = true
  } else if (request.pain_level >= 6) {
    urgency = "high"
  } else if (request.pain_level >= 4) {
    urgency = "medium"
  }

  // Check symptoms for additional urgency indicators
  const severeSymptoms = ["swelling", "bleeding", "fever", "infection", "abscess"]
  if (request.symptoms.some((s) => severeSymptoms.some((severe) => s.toLowerCase().includes(severe)))) {
    if (urgency !== "emergency") urgency = "high"
  }

  // Generate possible conditions based on symptoms and location
  const possibleConditions: string[] = []

  if (request.symptoms.some((s) => s.toLowerCase().includes("pain") || s.toLowerCase().includes("sensitive"))) {
    possibleConditions.push("Cavity")
  }

  if (request.symptoms.some((s) => s.toLowerCase().includes("swelling") || s.toLowerCase().includes("bleeding"))) {
    possibleConditions.push("Gum Disease")
    possibleConditions.push("Abscess")
  }

  if (request.symptoms.some((s) => s.toLowerCase().includes("crack") || s.toLowerCase().includes("broken"))) {
    possibleConditions.push("Tooth Fracture")
  }

  if (request.symptoms.some((s) => s.toLowerCase().includes("hot") || s.toLowerCase().includes("cold"))) {
    possibleConditions.push("Tooth Sensitivity")
    possibleConditions.push("Pulpitis")
  }

  // If no specific conditions matched, add generic ones based on pain level
  if (possibleConditions.length === 0) {
    if (request.pain_level >= 7) {
      possibleConditions.push("Severe Dental Issue")
      possibleConditions.push("Possible Infection")
    } else if (request.pain_level >= 4) {
      possibleConditions.push("Moderate Dental Issue")
      possibleConditions.push("Possible Cavity")
    } else {
      possibleConditions.push("Minor Dental Issue")
      possibleConditions.push("Early Stage Cavity")
    }
  }

  // Generate recommendations
  const recommendations: string[] = []

  if (needsImmediate) {
    recommendations.push("Seek immediate emergency dental care")
    recommendations.push("Take over-the-counter pain medication as directed")
    recommendations.push("Apply cold compress for swelling")
  } else if (urgency === "high") {
    recommendations.push("Schedule an appointment within 24-48 hours")
    recommendations.push("Take over-the-counter pain medication as needed")
    recommendations.push("Avoid hot, cold, or sweet foods and beverages")
  } else {
    recommendations.push("Schedule a regular dental appointment")
    recommendations.push("Maintain good oral hygiene")
    recommendations.push("Monitor symptoms and seek care if they worsen")
  }

  // Generate treatment options based on conditions
  const treatmentOptions: string[] = []

  possibleConditions.forEach((condition) => {
    switch (condition) {
      case "Cavity":
        treatmentOptions.push("Filling")
        if (request.pain_level >= 6) treatmentOptions.push("Root Canal")
        break
      case "Gum Disease":
        treatmentOptions.push("Deep Cleaning")
        treatmentOptions.push("Antibiotics")
        break
      case "Tooth Fracture":
        treatmentOptions.push("Bonding")
        treatmentOptions.push("Crown")
        if (request.pain_level >= 8) treatmentOptions.push("Extraction")
        break
      case "Abscess":
        treatmentOptions.push("Drainage")
        treatmentOptions.push("Root Canal")
        treatmentOptions.push("Antibiotics")
        break
      case "Tooth Sensitivity":
        treatmentOptions.push("Desensitizing Toothpaste")
        treatmentOptions.push("Fluoride Treatment")
        break
      case "Pulpitis":
        treatmentOptions.push("Root Canal")
        treatmentOptions.push("Medication")
        break
      default:
        treatmentOptions.push("Professional Examination")
        treatmentOptions.push("X-Ray Diagnosis")
    }
  })

  // Remove duplicates
  const uniqueTreatments = Array.from(new Set(treatmentOptions))

  // Generate estimated costs
  const costMapping: Record<string, number> = {
    Filling: 150,
    "Root Canal": 1000,
    "Deep Cleaning": 200,
    Antibiotics: 50,
    Bonding: 300,
    Crown: 1200,
    Extraction: 250,
    Drainage: 400,
    "Desensitizing Toothpaste": 20,
    "Fluoride Treatment": 35,
    Medication: 75,
    "Professional Examination": 85,
    "X-Ray Diagnosis": 120,
  }

  const estimatedCosts: Record<string, number> = {}
  uniqueTreatments.forEach((treatment) => {
    estimatedCosts[treatment] = costMapping[treatment] || 100
  })

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    possible_conditions: possibleConditions,
    urgency,
    recommendations,
    needs_immediate_attention: needsImmediate,
    treatment_options: uniqueTreatments,
    estimated_costs: estimatedCosts,
  }
}
