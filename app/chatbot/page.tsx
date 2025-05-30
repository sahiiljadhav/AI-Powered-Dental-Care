"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Import the chatbot component from our previous implementation
import UltimateDentalChatbot from "../page-chatbot"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Dental Assistant</h1>
                <p className="text-gray-600">Advanced AI-powered dental care and diagnosis</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              AI Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Chatbot Interface */}
      <div className="container mx-auto px-4 py-8">
        <UltimateDentalChatbot />
      </div>
    </div>
  )
}
