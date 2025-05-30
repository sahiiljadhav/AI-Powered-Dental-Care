"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Clock,
  MapPin,
  Phone,
  CalendarIcon,
  DollarSign,
  Mic,
  MicOff,
  Maximize,
  Minimize,
  SmileIcon as Tooth,
  Timer,
  Volume2,
  VolumeX,
  Heart,
  Shield,
  Activity,
  Bell,
  Users,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Star,
  Wifi,
  WifiOff,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  typing?: boolean
  type?: "text" | "appointment" | "symptom" | "education" | "emergency"
  metadata?: any
}

interface FAQ {
  keywords: string[]
  response: string
  icon?: any
  category: string
}

interface ToothData {
  id: number
  name: string
  position: [number, number]
  symptoms: string[]
  treatments: string[]
  urgency: "low" | "medium" | "high"
}

interface Appointment {
  id: string
  date: Date
  time: string
  type: string
  doctor: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  notes?: string
}

interface PatientRecord {
  id: string
  name: string
  age: number
  lastVisit: Date
  nextAppointment?: Date
  treatments: string[]
  allergies: string[]
  insurance: string
  emergencyContact: string
}

interface SymptomAnalysis {
  severity: number
  urgency: "low" | "medium" | "high" | "emergency"
  possibleConditions: string[]
  recommendations: string[]
  needsImmediate: boolean
}

// Comprehensive tooth map data
const teethData: ToothData[] = [
  {
    id: 1,
    name: "Upper Right Third Molar (Wisdom Tooth)",
    position: [85, 15],
    symptoms: ["Impaction pain", "Gum swelling", "Difficulty opening mouth"],
    treatments: ["Extraction", "Pain management", "Antibiotics"],
    urgency: "medium",
  },
  {
    id: 2,
    name: "Upper Right Second Molar",
    position: [75, 20],
    symptoms: ["Cavity pain", "Sensitivity", "Food trapping"],
    treatments: ["Filling", "Crown", "Root canal"],
    urgency: "medium",
  },
  {
    id: 3,
    name: "Upper Right First Molar",
    position: [65, 25],
    symptoms: ["Chewing pain", "Hot/cold sensitivity", "Cracked tooth"],
    treatments: ["Filling", "Crown", "Root canal"],
    urgency: "high",
  },
  {
    id: 4,
    name: "Upper Right Second Premolar",
    position: [55, 30],
    symptoms: ["Sharp pain", "Sensitivity", "Visible cavity"],
    treatments: ["Filling", "Inlay", "Crown"],
    urgency: "medium",
  },
  {
    id: 5,
    name: "Upper Right First Premolar",
    position: [45, 35],
    symptoms: ["Biting pain", "Sensitivity", "Gum recession"],
    treatments: ["Filling", "Bonding", "Gum treatment"],
    urgency: "low",
  },
  {
    id: 6,
    name: "Upper Right Canine",
    position: [35, 40],
    symptoms: ["Sharp edges", "Gum irritation", "Wear"],
    treatments: ["Bonding", "Contouring", "Crown"],
    urgency: "low",
  },
  {
    id: 7,
    name: "Upper Right Lateral Incisor",
    position: [25, 45],
    symptoms: ["Chip", "Discoloration", "Gap"],
    treatments: ["Bonding", "Veneer", "Crown"],
    urgency: "low",
  },
  {
    id: 8,
    name: "Upper Right Central Incisor",
    position: [15, 50],
    symptoms: ["Fracture", "Discoloration", "Sensitivity"],
    treatments: ["Bonding", "Veneer", "Crown"],
    urgency: "medium",
  },
  // Mirror for left side
  {
    id: 9,
    name: "Upper Left Central Incisor",
    position: [85, 50],
    symptoms: ["Fracture", "Discoloration", "Sensitivity"],
    treatments: ["Bonding", "Veneer", "Crown"],
    urgency: "medium",
  },
  // Add lower teeth
  {
    id: 17,
    name: "Lower Right Third Molar",
    position: [85, 85],
    symptoms: ["Impaction", "Pain", "Swelling"],
    treatments: ["Extraction", "Surgery"],
    urgency: "high",
  },
  // Add more teeth data...
]

export default function UltimateDentalChatbot() {
  // Core state
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [activeTab, setActiveTab] = useState("chat")

  // UI state
  const [isListening, setIsListening] = useState(false)
  const [isChatMinimized, setIsChatMinimized] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState("en")

  // Feature state
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [painLevel, setPainLevel] = useState(0)
  const [isBrushing, setIsBrushing] = useState(false)
  const [brushingProgress, setBrushingProgress] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")

  // Patient data
  const [patientRecord, setPatientRecord] = useState<PatientRecord | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [symptomAnalysis, setSymptomAnalysis] = useState<SymptomAnalysis | null>(null)

  // Advanced features
  const [insuranceVerified, setInsuranceVerified] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [educationMode, setEducationMode] = useState(false)
  const [reminderSettings, setReminderSettings] = useState({
    brushing: true,
    appointments: true,
    checkups: true,
  })

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const brushingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Comprehensive FAQ database
  const faqs: FAQ[] = [
    {
      keywords: ["hours", "open", "time", "schedule", "when", "operating"],
      response:
        "🕒 **Clinic Hours:**\n• Monday-Friday: 8:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 3:00 PM\n• Sunday: Closed\n• Emergency: 24/7 on-call\n\n📞 Emergency line: (555) 911-TOOTH",
      icon: Clock,
      category: "general",
    },
    {
      keywords: ["location", "address", "where", "directions", "find", "parking"],
      response:
        "📍 **Our Location:**\n123 Smile Street, Downtown\nHealthy City, HC 12345\n\n🚗 **Parking:** Free parking available\n🚌 **Public Transit:** Bus routes 12, 34, 56\n🚇 **Metro:** Central Station (5 min walk)",
      icon: MapPin,
      category: "general",
    },
    {
      keywords: ["contact", "phone", "call", "number", "reach", "email"],
      response:
        "📞 **Contact Information:**\n• Main: (555) 123-SMILE\n• Emergency: (555) 911-TOOTH\n• Text: (555) 123-TEXT\n• Email: info@brightsmile.com\n• WhatsApp: (555) 123-WHATS\n\n💬 We respond within 1 hour during business hours!",
      icon: Phone,
      category: "general",
    },
    {
      keywords: ["appointment", "booking", "schedule", "visit", "book", "availability"],
      response:
        "📅 **Book Your Appointment:**\n• Online booking: Available 24/7\n• Phone: (555) 123-SMILE\n• Walk-ins: Limited availability\n• Same-day: Often available\n• Emergency: Immediate care\n\nUse our appointment tab for instant booking!",
      icon: CalendarIcon,
      category: "appointments",
    },
    {
      keywords: ["price", "cost", "insurance", "payment", "fee", "expensive", "billing"],
      response:
        "💰 **Pricing & Insurance:**\n• Consultation: $75\n• Cleaning: $120-180\n• Fillings: $150-300\n• Crowns: $800-1500\n• Root Canal: $800-1200\n\n🏥 **Insurance:** We accept most plans\n💳 **Payment:** Cash, card, financing available",
      icon: DollarSign,
      category: "financial",
    },
    {
      keywords: ["services", "treatment", "what", "offer", "do", "procedures"],
      response:
        "🦷 **Our Services:**\n• General Dentistry\n• Preventive Care\n• Cosmetic Dentistry\n• Orthodontics\n• Oral Surgery\n• Periodontics\n• Endodontics\n• Pediatric Dentistry\n• Emergency Care\n• Implants & Prosthetics",
      icon: MessageCircle,
      category: "services",
    },
    {
      keywords: ["emergency", "urgent", "pain", "hurt", "help", "swelling", "bleeding"],
      response:
        "🚨 **DENTAL EMERGENCY:**\n• Call NOW: (555) 911-TOOTH\n• Severe pain: Take ibuprofen\n• Knocked out tooth: Keep moist, come immediately\n• Bleeding: Apply pressure with gauze\n• Swelling: Ice pack, 20 min on/off\n\n⚡ We see emergencies within 30 minutes!",
      icon: AlertTriangle,
      category: "emergency",
    },
    {
      keywords: ["tooth", "teeth", "molar", "cavity", "filling", "crown"],
      response:
        "🦷 **Tooth Problems?**\nUse our interactive tooth map to show us exactly where it hurts! Click the 'Tooth Map' tab and point to the problem area. Our AI will analyze your symptoms and provide personalized advice.",
      icon: Tooth,
      category: "diagnosis",
    },
    {
      keywords: ["brush", "brushing", "clean", "timer", "toothbrush", "hygiene"],
      response:
        "🪥 **Oral Hygiene:**\n• Brush 2x daily for 2 minutes\n• Use fluoride toothpaste\n• Floss daily\n• Mouthwash recommended\n• Replace toothbrush every 3 months\n\nTry our smart brushing timer in the Tools tab!",
      icon: Timer,
      category: "education",
    },
    {
      keywords: ["insurance", "coverage", "claim", "benefits", "copay"],
      response:
        "🏥 **Insurance Information:**\n• We accept 95% of insurance plans\n• Direct billing available\n• Pre-authorization assistance\n• Flexible payment plans\n• HSA/FSA accepted\n\nLet us verify your benefits - it's free!",
      icon: Shield,
      category: "financial",
    },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ]

  const appointmentTypes = [
    { value: "consultation", label: "Initial Consultation", duration: "60 min", price: "$75" },
    { value: "cleaning", label: "Teeth Cleaning", duration: "45 min", price: "$120" },
    { value: "checkup", label: "Regular Checkup", duration: "30 min", price: "$85" },
    { value: "filling", label: "Dental Filling", duration: "60 min", price: "$200" },
    { value: "crown", label: "Crown Procedure", duration: "90 min", price: "$800" },
    { value: "root-canal", label: "Root Canal", duration: "120 min", price: "$900" },
    { value: "extraction", label: "Tooth Extraction", duration: "45 min", price: "$250" },
    { value: "whitening", label: "Teeth Whitening", duration: "90 min", price: "$400" },
    { value: "emergency", label: "Emergency Visit", duration: "30 min", price: "$150" },
  ]

  const timeSlots = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ]

  // Utility functions
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const translateText = useCallback((text: string, targetLang: string) => {
    // Simplified translation - in production, use Google Translate API
    const translations: Record<string, Record<string, string>> = {
      es: {
        "Hello! Welcome to Bright Smile Dental Clinic!": "¡Hola! ¡Bienvenido a la Clínica Dental Bright Smile!",
        "How can I help you today?": "¿Cómo puedo ayudarte hoy?",
      },
      fr: {
        "Hello! Welcome to Bright Smile Dental Clinic!": "Bonjour! Bienvenue à la Clinique Dentaire Bright Smile!",
        "How can I help you today?": "Comment puis-je vous aider aujourd'hui?",
      },
    }

    return translations[targetLang]?.[text] || text
  }, [])

  const analyzeSymptoms = useCallback((symptoms: string[], painLevel: number, toothId?: number): SymptomAnalysis => {
    // AI-powered symptom analysis simulation
    const severity = painLevel
    let urgency: "low" | "medium" | "high" | "emergency" = "low"
    const possibleConditions: string[] = []
    const recommendations: string[] = []
    let needsImmediate = false

    // Analyze pain level
    if (painLevel >= 8) {
      urgency = "emergency"
      needsImmediate = true
      recommendations.push("Seek immediate emergency care")
    } else if (painLevel >= 6) {
      urgency = "high"
      recommendations.push("Schedule appointment within 24 hours")
    } else if (painLevel >= 4) {
      urgency = "medium"
      recommendations.push("Schedule appointment within a week")
    }

    // Analyze symptoms
    symptoms.forEach((symptom) => {
      const lowerSymptom = symptom.toLowerCase()
      if (lowerSymptom.includes("swelling")) {
        possibleConditions.push("Infection", "Abscess")
        urgency = urgency === "low" ? "high" : urgency
      }
      if (lowerSymptom.includes("bleeding")) {
        possibleConditions.push("Gum disease", "Gingivitis")
        recommendations.push("Improve oral hygiene")
      }
      if (lowerSymptom.includes("sensitivity")) {
        possibleConditions.push("Cavity", "Enamel erosion", "Exposed root")
        recommendations.push("Use sensitive teeth toothpaste")
      }
      if (lowerSymptom.includes("sharp pain")) {
        possibleConditions.push("Cavity", "Cracked tooth", "Nerve exposure")
        urgency = urgency === "low" ? "medium" : urgency
      }
    })

    // Default recommendations
    if (recommendations.length === 0) {
      recommendations.push("Schedule a routine checkup", "Maintain good oral hygiene")
    }

    return {
      severity,
      urgency,
      possibleConditions: [...new Set(possibleConditions)],
      recommendations: [...new Set(recommendations)],
      needsImmediate,
    }
  }, [])

  const generateTreatmentPlan = useCallback((analysis: SymptomAnalysis, toothId?: number) => {
    const tooth = toothId ? teethData.find((t) => t.id === toothId) : null
    let plan = "**Recommended Treatment Plan:**\n\n"

    if (analysis.needsImmediate) {
      plan += "🚨 **IMMEDIATE ACTION REQUIRED**\n"
      plan += "• Call emergency line: (555) 911-TOOTH\n"
      plan += "• Take pain medication as directed\n"
      plan += "• Apply cold compress if swelling\n\n"
    }

    plan += "**Phase 1 - Immediate Care:**\n"
    analysis.recommendations.forEach((rec, index) => {
      plan += `${index + 1}. ${rec}\n`
    })

    if (tooth) {
      plan += "\n**Phase 2 - Treatment Options:**\n"
      tooth.treatments.forEach((treatment, index) => {
        plan += `${index + 1}. ${treatment}\n`
      })
    }

    plan += "\n**Phase 3 - Prevention:**\n"
    plan += "• Regular checkups every 6 months\n"
    plan += "• Professional cleaning\n"
    plan += "• Improved oral hygiene routine\n"
    plan += "• Dietary recommendations\n"

    return plan
  }, [])

  // Initialize app
  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initialize speech recognition
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = currentLanguage === "en" ? "en-US" : currentLanguage

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setTimeout(() => handleSend(transcript), 500)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
          toast({
            title: "Voice recognition error",
            description: "Please try again or type your question.",
            variant: "destructive",
          })
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    // Load patient data (simulate)
    const mockPatient: PatientRecord = {
      id: "P001",
      name: "John Doe",
      age: 35,
      lastVisit: new Date(2024, 10, 15),
      nextAppointment: new Date(2024, 11, 20),
      treatments: ["Cleaning", "Filling", "Crown"],
      allergies: ["Penicillin"],
      insurance: "Delta Dental",
      emergencyContact: "(555) 123-4567",
    }
    setPatientRecord(mockPatient)

    // Initial greeting
    const greeting: Message = {
      id: "1",
      text: `👋 Hello! Welcome to **Bright Smile Dental Clinic**!\n\nI'm your AI-powered dental assistant with advanced features:\n\n🦷 **Interactive 3D Tooth Map**\n🎤 **Voice Recognition**\n📅 **Smart Appointment Booking**\n🧠 **AI Symptom Analysis**\n📚 **Dental Education**\n⏰ **Smart Reminders**\n🌍 **Multi-language Support**\n\nHow can I help you today?`,
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    }
    setMessages([greeting])

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (brushingTimerRef.current) {
        clearInterval(brushingTimerRef.current)
      }
    }
  }, [])

  // Auto-scroll messages
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Handle tooth selection
  useEffect(() => {
    if (selectedTooth !== null && painLevel > 0) {
      const tooth = teethData.find((t) => t.id === selectedTooth)
      if (tooth) {
        const analysis = analyzeSymptoms(tooth.symptoms, painLevel, selectedTooth)
        setSymptomAnalysis(analysis)

        const treatmentPlan = generateTreatmentPlan(analysis, selectedTooth)

        const botMessage: Message = {
          id: Date.now().toString(),
          text: `🦷 **Analysis for ${tooth.name}**\n\n**Pain Level:** ${painLevel}/10\n**Urgency:** ${analysis.urgency.toUpperCase()}\n\n**Possible Conditions:**\n${analysis.possibleConditions.map((c) => `• ${c}`).join("\n")}\n\n${treatmentPlan}`,
          sender: "bot",
          timestamp: new Date(),
          type: "symptom",
          metadata: { analysis, tooth },
        }
        setMessages((prev) => [...prev, botMessage])

        if (analysis.needsImmediate) {
          setEmergencyMode(true)
          toast({
            title: "Emergency Detected",
            description: "Please call our emergency line immediately!",
            variant: "destructive",
          })
        }
      }
    }
  }, [selectedTooth, painLevel, analyzeSymptoms, generateTreatmentPlan])

  // Brushing timer logic
  useEffect(() => {
    if (isBrushing) {
      brushingTimerRef.current = setInterval(() => {
        setBrushingProgress((prev) => {
          if (prev >= 100) {
            setIsBrushing(false)
            handleBrushingComplete()
            return 100
          }
          return prev + 100 / 120 // 2 minutes = 120 seconds
        })
      }, 1000)
    } else {
      if (brushingTimerRef.current) {
        clearInterval(brushingTimerRef.current)
      }
    }

    return () => {
      if (brushingTimerRef.current) {
        clearInterval(brushingTimerRef.current)
      }
    }
  }, [isBrushing])

  // Core functions
  const findBestResponse = useCallback(
    (userInput: string): string => {
      const input = userInput.toLowerCase()

      // Emergency detection
      if (input.match(/\b(emergency|urgent|severe pain|can't sleep|swelling|bleeding heavily)\b/)) {
        setEmergencyMode(true)
        return "🚨 **DENTAL EMERGENCY DETECTED**\n\n**CALL NOW: (555) 911-TOOTH**\n\nFor immediate relief:\n• Take ibuprofen (follow package directions)\n• Apply cold compress for swelling\n• Rinse with warm salt water\n• Do NOT apply heat\n\n⚡ We'll see you within 30 minutes!"
      }

      // Greetings
      if (input.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
        return translateText(
          "👋 Hello there! Great to see you! I'm here to help with any questions about Bright Smile Dental Clinic. What would you like to know?",
          currentLanguage,
        )
      }

      // Thanks
      if (input.match(/\b(thank|thanks|appreciate)\b/)) {
        return "😊 You're very welcome! I'm always happy to help. Is there anything else you'd like to know?"
      }

      // Goodbye
      if (input.match(/\b(bye|goodbye|see you|farewell)\b/)) {
        return "👋 Goodbye! Thank you for visiting Bright Smile Dental Clinic. We look forward to seeing you soon! Have a wonderful day! 😊"
      }

      // Appointment booking
      if (input.match(/\b(book|schedule|appointment|visit)\b/)) {
        setActiveTab("appointments")
        return "📅 I've opened our smart appointment booking system! You can:\n\n• Select your preferred date and time\n• Choose appointment type\n• Get instant confirmation\n• Receive automated reminders\n\nLet's get you scheduled!"
      }

      // Tooth pain/problems
      if (input.match(/\b(tooth|pain|ache|hurt|cavity|sensitive)\b/)) {
        setActiveTab("diagnosis")
        return "🦷 I understand you're having tooth problems. Our AI-powered diagnosis system can help!\n\n**Please use the Diagnosis tab to:**\n• Click on the affected tooth\n• Rate your pain level\n• Describe symptoms\n• Get instant analysis\n\nThis helps us provide the most accurate advice!"
      }

      // Brushing/hygiene
      if (input.match(/\b(brush|brushing|clean|hygiene|timer)\b/)) {
        setActiveTab("tools")
        return "🪥 Great question about oral hygiene! I've opened our dental tools section where you can:\n\n• Use our smart 2-minute brushing timer\n• Get personalized hygiene tips\n• Track your oral health\n• Set up reminders\n\nProper brushing is key to dental health!"
      }

      // Insurance
      if (input.match(/\b(insurance|coverage|benefits|claim)\b/)) {
        return "🏥 **Insurance & Benefits:**\n\n• We accept 95% of insurance plans\n• Free benefits verification\n• Direct billing available\n• Pre-authorization assistance\n• Flexible payment plans\n• HSA/FSA accepted\n\n💡 Would you like me to verify your specific plan?"
      }

      // Find matching FAQ
      for (const faq of faqs) {
        for (const keyword of faq.keywords) {
          if (input.includes(keyword)) {
            return faq.response
          }
        }
      }

      // AI-powered fallback
      return "🤔 I understand you're asking about something specific. Let me help you find the right information!\n\n**I can assist with:**\n• 🦷 Dental problems & diagnosis\n• 📅 Appointment scheduling\n• 💰 Pricing & insurance\n• 🚨 Emergency care\n• 📚 Dental education\n• 🛠️ Oral care tools\n\n**Try saying:** 'I have tooth pain' or 'Book appointment' or ask about our services!"
    },
    [currentLanguage, translateText],
  )

  const simulateTyping = useCallback(
    async (response: string, type = "text") => {
      setIsTyping(true)

      const typingMessage: Message = {
        id: Date.now().toString(),
        text: "",
        sender: "bot",
        timestamp: new Date(),
        typing: true,
      }
      setMessages((prev) => [...prev, typingMessage])

      // Realistic typing delay
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500))

      setMessages((prev) => prev.filter((msg) => !msg.typing))

      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
        type: type as any,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      // Text-to-speech
      if (!isMuted && typeof window !== "undefined" && "speechSynthesis" in window) {
        const cleanText = response.replace(/[*#🦷📅💰🚨😊👋🪥🏥🤔]/gu, "").substring(0, 100)
        const utterance = new SpeechSynthesisUtterance(cleanText)
        utterance.rate = 1.0
        utterance.pitch = 1.0
        window.speechSynthesis.speak(utterance)
      }
    },
    [isMuted],
  )

  const handleSend = useCallback(
    async (overrideInput?: string) => {
      const textToSend = overrideInput || input

      if (!textToSend.trim() || isTyping) return

      const userMessage: Message = {
        id: Date.now().toString(),
        text: textToSend,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, userMessage])
      setShowSuggestions(false)

      const response = findBestResponse(textToSend)
      setInput("")

      await simulateTyping(response)
    },
    [input, isTyping, findBestResponse, simulateTyping],
  )

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInput(suggestion)
      setShowSuggestions(false)
      handleSend(suggestion)
    },
    [handleSend],
  )

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  const toggleListening = useCallback(() => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
          setIsListening(true)
          toast({
            title: "Listening...",
            description: "Speak clearly into your microphone.",
          })
        } catch (error) {
          toast({
            title: "Voice recognition not available",
            description: "Your browser may not support this feature.",
            variant: "destructive",
          })
        }
      }
    }
  }, [isListening, toast])

  const handleBrushingComplete = useCallback(() => {
    setBrushingProgress(0)
    setActiveTab("chat")

    const botMessage: Message = {
      id: Date.now().toString(),
      text: "🎉 **Excellent job!** You've completed your 2-minute brushing session!\n\n**Your teeth thank you!** 🦷✨\n\n**Next steps:**\n• Floss between teeth\n• Use mouthwash\n• Don't eat for 30 minutes\n\n**Reminder:** Brush again before bed for optimal oral health!",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    }
    setMessages((prev) => [...prev, botMessage])

    toast({
      title: "Brushing Complete!",
      description: "Great job maintaining your oral health!",
    })
  }, [])

  const bookAppointment = useCallback(() => {
    if (!selectedDate || !selectedTime || !appointmentType) {
      toast({
        title: "Missing Information",
        description: "Please select date, time, and appointment type.",
        variant: "destructive",
      })
      return
    }

    const newAppointment: Appointment = {
      id: `APT-${Date.now()}`,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      doctor: "Dr. Smith",
      status: "scheduled",
      notes: "",
    }

    setAppointments((prev) => [...prev, newAppointment])

    const appointmentDetails = appointmentTypes.find((apt) => apt.value === appointmentType)

    const confirmationMessage: Message = {
      id: Date.now().toString(),
      text: `✅ **Appointment Confirmed!**\n\n**Details:**\n• Date: ${selectedDate.toLocaleDateString()}\n• Time: ${selectedTime}\n• Type: ${appointmentDetails?.label}\n• Duration: ${appointmentDetails?.duration}\n• Estimated Cost: ${appointmentDetails?.price}\n• Doctor: Dr. Smith\n\n📱 **Confirmation sent to your phone**\n📧 **Email confirmation sent**\n\n**Reminders:**\n• 24 hours before\n• 2 hours before\n• Arrive 15 minutes early`,
      sender: "bot",
      timestamp: new Date(),
      type: "appointment",
      metadata: newAppointment,
    }

    setMessages((prev) => [...prev, confirmationMessage])
    setActiveTab("chat")

    toast({
      title: "Appointment Booked!",
      description: `${appointmentDetails?.label} on ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    })
  }, [selectedDate, selectedTime, appointmentType, appointmentTypes])

  // Suggestions based on context
  const contextualSuggestions = [
    "What are your working hours?",
    "I have tooth pain",
    "Book an appointment",
    "What services do you offer?",
    "Emergency dental care",
    "Insurance coverage",
    "Start brushing timer",
    "Teeth whitening options",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Status Bar */}
        <div className="mb-4 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isOnline ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
              <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
            </div>

            {emergencyMode && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-700 font-medium">Emergency Mode Active</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Chat Interface */}
        <Card
          className={`transition-all duration-300 shadow-2xl border-0 bg-white/90 backdrop-blur-sm ${
            isChatMinimized ? "h-16" : "h-[85vh]"
          } flex flex-col`}
        >
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-lg p-4">
            <CardTitle className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-white/20 text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="font-bold text-lg">Bright Smile AI Assistant</div>
                <div className="text-sm opacity-90 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online • Advanced AI • Multi-language
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500 text-white">
                  {patientRecord ? "Verified Patient" : "Guest"}
                </Badge>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsChatMinimized(!isChatMinimized)}
                >
                  {isChatMinimized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>

          {!isChatMinimized && (
            <>
              {/* Tab Navigation */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid grid-cols-6 mx-4 mt-2">
                  <TabsTrigger value="chat" className="flex items-center gap-1 text-xs">
                    <MessageCircle className="w-3 h-3" />
                    <span className="hidden sm:inline">Chat</span>
                  </TabsTrigger>
                  <TabsTrigger value="diagnosis" className="flex items-center gap-1 text-xs">
                    <Tooth className="w-3 h-3" />
                    <span className="hidden sm:inline">Diagnosis</span>
                  </TabsTrigger>
                  <TabsTrigger value="appointments" className="flex items-center gap-1 text-xs">
                    <CalendarIcon className="w-3 h-3" />
                    <span className="hidden sm:inline">Book</span>
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex items-center gap-1 text-xs">
                    <Timer className="w-3 h-3" />
                    <span className="hidden sm:inline">Tools</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="flex items-center gap-1 text-xs">
                    <BookOpen className="w-3 h-3" />
                    <span className="hidden sm:inline">Learn</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center gap-1 text-xs">
                    <User className="w-3 h-3" />
                    <span className="hidden sm:inline">Profile</span>
                  </TabsTrigger>
                </TabsList>

                {/* Chat Tab */}
                <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 ${
                            message.sender === "user" ? "flex-row-reverse" : "flex-row"
                          } animate-in slide-in-from-bottom-2 duration-300`}
                        >
                          <Avatar className="w-8 h-8">
                            {message.sender === "user" ? (
                              <AvatarFallback className="bg-blue-500 text-white">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            ) : (
                              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                <Bot className="w-4 h-4" />
                              </AvatarFallback>
                            )}
                          </Avatar>

                          <div className={`max-w-[75%] ${message.sender === "user" ? "text-right" : "text-left"}`}>
                            <div
                              className={`p-3 rounded-2xl ${
                                message.sender === "user"
                                  ? "bg-blue-500 text-white rounded-tr-sm"
                                  : "bg-gray-100 text-gray-800 rounded-tl-sm"
                              } shadow-sm`}
                            >
                              {message.typing ? (
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              ) : (
                                <div className="whitespace-pre-line text-sm">{message.text}</div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <div className="text-xs text-gray-500">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                              {message.type === "emergency" && <AlertTriangle className="w-3 h-3 text-red-500" />}
                              {message.type === "appointment" && <CheckCircle className="w-3 h-3 text-green-500" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div ref={messagesEndRef} />
                  </ScrollArea>

                  {/* Suggestions */}
                  {showSuggestions && (
                    <div className="p-4 border-t bg-gray-50">
                      <div className="text-sm text-gray-600 mb-3 font-medium">💡 Quick Actions:</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {contextualSuggestions.slice(0, 8).map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors justify-start"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Diagnosis Tab */}
                <TabsContent value="diagnosis" className="flex-1 p-4 m-0">
                  <div className="h-full flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">🦷 AI-Powered Dental Diagnosis</h3>
                      <p className="text-gray-600 text-sm">
                        Click on the tooth that's bothering you and describe your symptoms for instant AI analysis.
                      </p>
                    </div>

                    {/* Interactive Tooth Map */}
                    <div className="flex-1 bg-gradient-to-b from-blue-50 to-white rounded-lg p-4 border">
                      <div className="relative w-full h-64 mx-auto">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {/* Upper teeth */}
                          {teethData.slice(0, 8).map((tooth, index) => (
                            <circle
                              key={tooth.id}
                              cx={10 + index * 10}
                              cy={20}
                              r="4"
                              fill={selectedTooth === tooth.id ? "#ef4444" : "#ffffff"}
                              stroke={selectedTooth === tooth.id ? "#dc2626" : "#6b7280"}
                              strokeWidth="1"
                              className="cursor-pointer hover:fill-blue-200 transition-colors"
                              onClick={() => setSelectedTooth(tooth.id)}
                            />
                          ))}

                          {/* Lower teeth */}
                          {teethData.slice(8, 16).map((tooth, index) => (
                            <circle
                              key={tooth.id}
                              cx={10 + index * 10}
                              cy={80}
                              r="4"
                              fill={selectedTooth === tooth.id ? "#ef4444" : "#ffffff"}
                              stroke={selectedTooth === tooth.id ? "#dc2626" : "#6b7280"}
                              strokeWidth="1"
                              className="cursor-pointer hover:fill-blue-200 transition-colors"
                              onClick={() => setSelectedTooth(tooth.id)}
                            />
                          ))}

                          {/* Gum line */}
                          <path d="M 5 20 Q 50 15 95 20" fill="none" stroke="#fca5a5" strokeWidth="2" opacity="0.5" />
                          <path d="M 5 80 Q 50 85 95 80" fill="none" stroke="#fca5a5" strokeWidth="2" opacity="0.5" />
                        </svg>
                      </div>

                      {selectedTooth && (
                        <div className="mt-6 space-y-4">
                          <div className="bg-white rounded-lg p-4 border">
                            <h4 className="font-semibold mb-2">
                              Selected: {teethData.find((t) => t.id === selectedTooth)?.name}
                            </h4>

                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium mb-2 block">Pain Level (0-10):</label>
                                <div className="flex items-center gap-4">
                                  <span className="text-sm">No Pain</span>
                                  <Slider
                                    value={[painLevel]}
                                    min={0}
                                    max={10}
                                    step={1}
                                    onValueChange={(value) => setPainLevel(value[0])}
                                    className="flex-1"
                                  />
                                  <span className="text-sm">Severe</span>
                                </div>
                                <div className="text-center mt-2">
                                  <span className="text-2xl font-bold text-blue-600">{painLevel}/10</span>
                                </div>
                              </div>

                              <Button
                                onClick={() => {
                                  if (painLevel > 0) {
                                    setActiveTab("chat")
                                  }
                                }}
                                className="w-full"
                                disabled={painLevel === 0}
                              >
                                Get AI Analysis
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* Appointments Tab */}
                <TabsContent value="appointments" className="flex-1 p-4 m-0">
                  <div className="h-full flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">📅 Smart Appointment Booking</h3>
                      <p className="text-gray-600 text-sm">
                        Book your appointment instantly with our AI-powered system.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 flex-1">
                      {/* Booking Form */}
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Select Date:</label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date() || date.getDay() === 0}
                            className="rounded-md border"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Appointment Type:</label>
                          <Select value={appointmentType} onValueChange={setAppointmentType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose appointment type" />
                            </SelectTrigger>
                            <SelectContent>
                              {appointmentTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex justify-between items-center w-full">
                                    <span>{type.label}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                      {type.duration} • {type.price}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Available Times:</label>
                          <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTime(time)}
                                className="text-xs"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <Button onClick={bookAppointment} className="w-full" size="lg">
                          Book Appointment
                        </Button>
                      </div>

                      {/* Upcoming Appointments */}
                      <div>
                        <h4 className="font-semibold mb-3">Your Upcoming Appointments</h4>
                        <div className="space-y-3">
                          {appointments.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <p>No appointments scheduled</p>
                            </div>
                          ) : (
                            appointments.map((apt) => (
                              <div key={apt.id} className="bg-white rounded-lg p-3 border shadow-sm">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <div className="font-medium">
                                      {appointmentTypes.find((t) => t.value === apt.type)?.label}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {apt.date.toLocaleDateString()} at {apt.time}
                                    </div>
                                  </div>
                                  <Badge
                                    variant={
                                      apt.status === "confirmed"
                                        ? "default"
                                        : apt.status === "completed"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {apt.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">Dr. {apt.doctor}</div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Tools Tab */}
                <TabsContent value="tools" className="flex-1 p-4 m-0">
                  <div className="h-full">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">🛠️ Dental Care Tools</h3>
                      <p className="text-gray-600 text-sm">Smart tools to help you maintain excellent oral health.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Brushing Timer */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Timer className="w-5 h-5" />
                            Smart Brushing Timer
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isBrushing ? (
                            <div className="space-y-4">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">
                                  {Math.ceil((120 * (100 - brushingProgress)) / 100)}s
                                </div>
                                <div className="text-sm text-gray-600">
                                  {brushingProgress < 50 ? "Focus on upper teeth" : "Now brush lower teeth"}
                                </div>
                              </div>
                              <Progress value={brushingProgress} className="h-3" />
                              <Button variant="outline" onClick={() => setIsBrushing(false)} className="w-full">
                                Stop Timer
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-sm text-gray-600">
                                Dentists recommend brushing for 2 minutes. Our smart timer guides you through the
                                process!
                              </p>
                              <Button onClick={() => setIsBrushing(true)} className="w-full">
                                Start 2-Minute Timer
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Reminder Settings */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Smart Reminders
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Brushing Reminders</label>
                            <Switch
                              checked={reminderSettings.brushing}
                              onCheckedChange={(checked) =>
                                setReminderSettings((prev) => ({ ...prev, brushing: checked }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Appointment Reminders</label>
                            <Switch
                              checked={reminderSettings.appointments}
                              onCheckedChange={(checked) =>
                                setReminderSettings((prev) => ({ ...prev, appointments: checked }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Checkup Reminders</label>
                            <Switch
                              checked={reminderSettings.checkups}
                              onCheckedChange={(checked) =>
                                setReminderSettings((prev) => ({ ...prev, checkups: checked }))
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Insurance Verification */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Insurance Verification
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {insuranceVerified ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Insurance Verified</span>
                              </div>
                              <p className="text-sm text-gray-600">Delta Dental - Premium Plan</p>
                              <p className="text-sm text-gray-600">Coverage: 80% for major procedures</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-sm text-gray-600">
                                Verify your insurance benefits instantly and get accurate cost estimates.
                              </p>
                              <Button onClick={() => setInsuranceVerified(true)} variant="outline" className="w-full">
                                Verify Insurance
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Treatment Cost Calculator */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5" />
                            Cost Calculator
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select treatment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cleaning">Cleaning - $120</SelectItem>
                                <SelectItem value="filling">Filling - $200</SelectItem>
                                <SelectItem value="crown">Crown - $800</SelectItem>
                                <SelectItem value="root-canal">Root Canal - $900</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="bg-blue-50 rounded-lg p-3">
                              <div className="text-sm font-medium">Estimated Cost</div>
                              <div className="text-2xl font-bold text-blue-600">$120</div>
                              <div className="text-xs text-gray-600">With insurance: $24</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education" className="flex-1 p-4 m-0">
                  <div className="h-full">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">📚 Dental Education Center</h3>
                      <p className="text-gray-600 text-sm">
                        Learn about dental health with our interactive educational content.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Educational Cards */}
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Tooth className="w-5 h-5 text-blue-500" />
                            Proper Brushing
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">
                            Learn the correct technique for effective tooth brushing.
                          </p>
                          <Button variant="outline" size="sm" className="w-full">
                            Watch Video
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Heart className="w-5 h-5 text-red-500" />
                            Gum Health
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">Understanding and preventing gum disease.</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Read Article
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Star className="w-5 h-5 text-yellow-500" />
                            Teeth Whitening
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">Safe and effective whitening options.</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Learn More
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Activity className="w-5 h-5 text-green-500" />
                            Nutrition & Teeth
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">Foods that promote dental health.</p>
                          <Button variant="outline" size="sm" className="w-full">
                            View Guide
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Users className="w-5 h-5 text-purple-500" />
                            Kids' Dental Care
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">Special care for children's teeth.</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Family Guide
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                            Emergency Care
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">What to do in dental emergencies.</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Emergency Guide
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Profile Tab */}
                <TabsContent value="profile" className="flex-1 p-4 m-0">
                  <div className="h-full">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">👤 Patient Profile</h3>
                      <p className="text-gray-600 text-sm">Manage your dental health records and preferences.</p>
                    </div>

                    {patientRecord ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Patient Information */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-600">Name</label>
                              <div className="font-medium">{patientRecord.name}</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Age</label>
                              <div className="font-medium">{patientRecord.age} years old</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Insurance</label>
                              <div className="font-medium">{patientRecord.insurance}</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                              <div className="font-medium">{patientRecord.emergencyContact}</div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Medical History */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Medical History</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-600">Last Visit</label>
                              <div className="font-medium">{patientRecord.lastVisit.toLocaleDateString()}</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Previous Treatments</label>
                              <div className="space-y-1">
                                {patientRecord.treatments.map((treatment, index) => (
                                  <Badge key={index} variant="secondary" className="mr-1">
                                    {treatment}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Allergies</label>
                              <div className="space-y-1">
                                {patientRecord.allergies.map((allergy, index) => (
                                  <Badge key={index} variant="destructive" className="mr-1">
                                    {allergy}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Health Tracking */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Health Tracking</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">Oral Hygiene Score</span>
                                  <span className="text-sm font-bold text-green-600">85/100</span>
                                </div>
                                <Progress value={85} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">Brushing Streak</span>
                                  <span className="text-sm font-bold text-blue-600">12 days</span>
                                </div>
                                <Progress value={60} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">Next Checkup</span>
                                  <span className="text-sm font-bold text-orange-600">2 weeks</span>
                                </div>
                                <Progress value={75} className="h-2" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Settings */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Email Notifications</label>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">SMS Reminders</label>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Voice Responses</label>
                              <Switch checked={!isMuted} onCheckedChange={(checked) => setIsMuted(!checked)} />
                            </div>
                            <Separator />
                            <Button variant="outline" className="w-full">
                              Download Health Report
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h4 className="text-lg font-medium mb-2">No Patient Profile</h4>
                        <p className="text-gray-600 mb-4">Create a profile to access personalized features</p>
                        <Button>Create Profile</Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Input Area */}
              <CardFooter className="p-4 border-t bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex w-full space-x-2"
                >
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        isListening
                          ? "Listening..."
                          : emergencyMode
                            ? "Emergency mode - describe your situation"
                            : "Type your message or ask about dental care..."
                      }
                      className={`pr-12 ${isListening ? "border-red-300 bg-red-50" : ""} ${
                        emergencyMode ? "border-red-500 bg-red-50" : ""
                      }`}
                      disabled={isTyping}
                    />
                    {isListening && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={toggleListening}
                    className={`${isListening ? "bg-red-100 text-red-500 border-red-200" : ""} hover:bg-gray-100`}
                    disabled={isTyping}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>

                  <Button type="submit" disabled={isTyping || (!input.trim() && !isListening)} className="px-6">
                    <Send className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                </form>

                {emergencyMode && (
                  <div className="absolute bottom-full left-4 right-4 mb-2">
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-700">
                        Emergency mode active. Call (555) 911-TOOTH for immediate assistance.
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEmergencyMode(false)}
                          className="ml-2 text-red-700 hover:text-red-800"
                        >
                          Dismiss
                        </Button>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
