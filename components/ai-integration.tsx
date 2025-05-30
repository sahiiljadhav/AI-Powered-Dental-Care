"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Types matching the Python backend
type Language = "en" | "es" | "fr" | "de" | "zh" | "ja"
type UrgencyLevel = "low" | "medium" | "high" | "emergency"

interface SymptomAnalysisRequest {
  tooth_location?: string
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

export function useAIAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Function to analyze symptoms
  const analyzeSymptoms = async (request: SymptomAnalysisRequest): Promise<SymptomAnalysisResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/dental-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data: SymptomAnalysisResponse = await response.json()

      // Show emergency toast if needed
      if (data.needs_immediate_attention) {
        toast({
          title: "Emergency Detected",
          description: "Please seek immediate dental care!",
          variant: "destructive",
        })
      }

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Analysis Failed",
        description: "Could not analyze symptoms. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Function to process chat messages
  const processChat = async (request: ChatRequest): Promise<ChatResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/dental-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data: ChatResponse = await response.json()

      // Show emergency toast if needed
      if (data.emergency_detected) {
        toast({
          title: "Emergency Detected",
          description: "Please call our emergency line immediately!",
          variant: "destructive",
        })
      }

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      toast({
        title: "Chat Processing Failed",
        description: "Could not process your message. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    analyzeSymptoms,
    processChat,
    isLoading,
    error,
  }
}

// Component to display symptom analysis results
export function SymptomAnalysisResult({ analysis }: { analysis: SymptomAnalysisResponse }) {
  const urgencyColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    emergency: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <Card className="mt-4">
      <CardHeader className={`${urgencyColors[analysis.urgency]} border-b`}>
        <CardTitle className="flex items-center gap-2">
          {analysis.needs_immediate_attention ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          {analysis.needs_immediate_attention ? "Emergency Care Needed" : "Analysis Results"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Possible Conditions:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.possible_conditions.map((condition, i) => (
                <li key={i} className="text-sm">
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-1">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-1">Treatment Options:</h4>
            <div className="grid grid-cols-2 gap-2">
              {analysis.treatment_options.map((treatment, i) => (
                <div key={i} className="text-sm border rounded p-2 flex justify-between">
                  <span>{treatment}</span>
                  <span className="font-medium">${analysis.estimated_costs[treatment]}</span>
                </div>
              ))}
            </div>
          </div>

          {analysis.needs_immediate_attention && (
            <Button variant="destructive" className="w-full">
              Call Emergency Line
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Loading indicator component
export function AIProcessingIndicator() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
      <span className="text-sm font-medium">AI analyzing your data...</span>
    </div>
  )
}
