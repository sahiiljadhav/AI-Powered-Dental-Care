"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Stethoscope,
  Smile,
  AlertTriangle,
  Bot,
  Star,
  Clock,
  DollarSign,
  Shield,
  CheckCircle,
  Calendar,
  Phone,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      id: "general",
      title: "General Dentistry",
      description: "Comprehensive oral health care including cleanings, fillings, and preventive treatments.",
      icon: Stethoscope,
      image: "/placeholder.svg?height=300&width=400",
      price: "From $85",
      duration: "30-60 min",
      features: [
        "Regular Checkups",
        "Teeth Cleaning",
        "Cavity Fillings",
        "Preventive Care",
        "Oral Health Education",
        "X-Ray Diagnostics",
      ],
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "cosmetic",
      title: "Cosmetic Dentistry",
      description: "Transform your smile with our advanced cosmetic procedures and treatments.",
      icon: Smile,
      image: "/placeholder.svg?height=300&width=400",
      price: "From $400",
      duration: "60-120 min",
      features: [
        "Teeth Whitening",
        "Porcelain Veneers",
        "Dental Bonding",
        "Smile Makeover",
        "Gum Contouring",
        "Invisalign",
      ],
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "emergency",
      title: "Emergency Care",
      description: "24/7 emergency dental services with AI-powered triage and immediate care.",
      icon: AlertTriangle,
      image: "/placeholder.svg?height=300&width=400",
      price: "From $150",
      duration: "30-90 min",
      features: [
        "24/7 Availability",
        "Pain Relief",
        "Emergency Surgery",
        "Urgent Care",
        "Trauma Treatment",
        "Same-Day Service",
      ],
      color: "bg-red-100 text-red-600",
    },
    {
      id: "ai-diagnosis",
      title: "AI-Powered Diagnosis",
      description: "Advanced artificial intelligence for precise symptom analysis and treatment planning.",
      icon: Bot,
      image: "/placeholder.svg?height=300&width=400",
      price: "Included",
      duration: "Real-time",
      features: [
        "Instant Symptom Analysis",
        "3D Tooth Mapping",
        "Treatment Recommendations",
        "Emergency Detection",
        "Multi-language Support",
        "Voice Recognition",
      ],
      color: "bg-green-100 text-green-600",
    },
    {
      id: "orthodontics",
      title: "Orthodontics",
      description: "Straighten your teeth with traditional braces or modern clear aligners.",
      icon: Smile,
      image: "/placeholder.svg?height=300&width=400",
      price: "From $3,000",
      duration: "12-24 months",
      features: [
        "Traditional Braces",
        "Clear Aligners",
        "Invisalign",
        "Retainers",
        "Progress Monitoring",
        "Digital Planning",
      ],
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "oral-surgery",
      title: "Oral Surgery",
      description: "Advanced surgical procedures including extractions and implant placement.",
      icon: Stethoscope,
      image: "/placeholder.svg?height=300&width=400",
      price: "From $500",
      duration: "60-180 min",
      features: [
        "Tooth Extractions",
        "Dental Implants",
        "Wisdom Teeth Removal",
        "Bone Grafting",
        "Sedation Options",
        "Post-Op Care",
      ],
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Our Services</h1>
              <p className="text-gray-600">Comprehensive dental care with cutting-edge technology</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4">World-Class Dental Care</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Complete Dental Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From routine cleanings to complex procedures, we offer a full range of dental services backed by the latest
            technology and AI-powered diagnostics.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-gray-900">{service.price}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {service.price}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                  {service.features.length > 4 && (
                    <div className="text-sm text-gray-500">+{service.features.length - 4} more features</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link href="/appointments">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h3>
            <p className="text-gray-600">
              We combine traditional dental expertise with cutting-edge technology for the best possible care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Care</h4>
              <p className="text-gray-600 text-sm">
                Advanced artificial intelligence assists in diagnosis and treatment planning for more precise care.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Safety First</h4>
              <p className="text-gray-600 text-sm">
                State-of-the-art sterilization and safety protocols ensure your health and peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">5-Star Experience</h4>
              <p className="text-gray-600 text-sm">
                Consistently rated 5 stars by our patients for quality care and exceptional service.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Smile?</h3>
          <p className="text-gray-600 mb-6">
            Schedule a consultation today and discover how our advanced dental care can help you achieve the perfect
            smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/appointments">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/chatbot">
                <Bot className="w-5 h-5 mr-2" />
                Try AI Assistant
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
