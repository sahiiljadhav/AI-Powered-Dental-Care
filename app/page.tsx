"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  Phone,
  MapPin,
  Clock,
  Shield,
  Calendar,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Play,
  Quote,
  Zap,
  Globe,
  Bot,
  Camera,
  Headphones,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Hero Section Component
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Your Smile, Our AI-Powered Care",
      subtitle: "Experience the future of dental care with our advanced AI assistant and world-class treatments",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Try AI Assistant",
      link: "/chatbot",
    },
    {
      title: "Advanced 3D Diagnosis",
      subtitle: "Interactive tooth mapping and real-time symptom analysis for precise treatment planning",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Book Consultation",
      link: "/appointments",
    },
    {
      title: "Emergency Care 24/7",
      subtitle: "Immediate AI triage and emergency response system for urgent dental needs",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Emergency Care",
      link: "/emergency",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Zap className="w-4 h-4 mr-1" />
                AI-Powered Dental Care
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{slides[currentSlide].subtitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                <Link href={slides[currentSlide].link}>
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt="Dental Care"
                fill
                className="object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <Card className="absolute -top-4 -left-4 w-48 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">AI Assistant</div>
                    <div className="text-xs text-gray-600">Online Now</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute -bottom-4 -right-4 w-48 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Next Available</div>
                    <div className="text-xs text-gray-600">Today 2:30 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-blue-600 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Diagnosis",
      description: "Advanced machine learning algorithms analyze your symptoms and provide instant recommendations.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Camera,
      title: "3D Tooth Mapping",
      description: "Interactive 3D visualization helps you pinpoint exactly where you're experiencing problems.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Headphones,
      title: "Voice Recognition",
      description: "Hands-free interaction with multi-language support for accessibility and convenience.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-optimized appointment booking that considers your preferences and our availability.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Shield,
      title: "Emergency Detection",
      description: "Automatic identification of urgent dental issues with immediate care recommendations.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Available in 6 languages with cultural adaptation for global accessibility.",
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Revolutionary Technology</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">The Future of Dental Care is Here</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience cutting-edge dental technology that combines artificial intelligence, 3D visualization, and
            personalized care to revolutionize your dental health journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const services = [
    {
      title: "General Dentistry",
      description: "Comprehensive oral health care including cleanings, fillings, and preventive treatments.",
      image: "/placeholder.svg?height=300&width=400",
      price: "From $85",
      features: ["Regular Checkups", "Teeth Cleaning", "Cavity Fillings", "Preventive Care"],
    },
    {
      title: "Cosmetic Dentistry",
      description: "Transform your smile with our advanced cosmetic procedures and treatments.",
      image: "/placeholder.svg?height=300&width=400",
      price: "From $400",
      features: ["Teeth Whitening", "Veneers", "Bonding", "Smile Makeover"],
    },
    {
      title: "Emergency Care",
      description: "24/7 emergency dental services with AI-powered triage and immediate care.",
      image: "/placeholder.svg?height=300&width=400",
      price: "From $150",
      features: ["24/7 Availability", "Pain Relief", "Emergency Surgery", "Urgent Care"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Our Services</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Comprehensive Dental Care</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From routine cleanings to complex procedures, we offer a full range of dental services backed by the latest
            technology and AI-powered diagnostics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white text-gray-900">{service.price}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The AI assistant helped me understand my dental issues before I even got to the clinic. The 3D tooth map was incredibly helpful in explaining exactly what was wrong.",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "I was amazed by the voice recognition feature. Being able to describe my symptoms hands-free while the AI analyzed everything in real-time was revolutionary.",
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The emergency detection system literally saved my tooth. The AI immediately recognized the severity of my situation and got me urgent care within 30 minutes.",
    },
  ]

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Patient Stories</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Our Patients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from patients who have benefited from our AI-powered dental care system.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Experience AI-Powered Dental Care?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of patients who have transformed their dental health with our revolutionary AI assistant and
          world-class care.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Link href="/chatbot">
              <MessageCircle className="mr-2 w-5 h-5" />
              Try AI Assistant
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6"
          >
            <Link href="/appointments">
              <Calendar className="mr-2 w-5 h-5" />
              Book Appointment
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <Badge className="mb-4">Get in Touch</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Our Clinic</h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions? Our team is here to help. Reach out to us through any of these channels or use our
              AI-powered chat assistant for instant support.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Phone</div>
                  <div className="text-gray-600">(555) 123-SMILE</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Address</div>
                  <div className="text-gray-600">
                    123 Smile Street, Downtown
                    <br />
                    Healthy City, HC 12345
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Hours</div>
                  <div className="text-gray-600">
                    Mon-Fri: 8AM-6PM
                    <br />
                    Sat: 9AM-3PM
                    <br />
                    Emergency: 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone"
                      type="tel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Main Home Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
    </div>
  )
}
