"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Mail,
  MessageCircle,
  Calendar,
  Bot,
  Star,
  CheckCircle,
  AlertTriangle,
  Heart,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    urgency: "",
  })

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 1 hour during business hours.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      urgency: "",
    })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      primary: "(555) 123-SMILE",
      secondary: "Emergency: (555) 911-TOOTH",
      action: "Call Now",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "AI Assistant",
      description: "Get instant help 24/7",
      primary: "Available Now",
      secondary: "Multi-language support",
      action: "Chat Now",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a detailed message",
      primary: "info@brightsmile.com",
      secondary: "Response within 2 hours",
      action: "Send Email",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Calendar,
      title: "Book Online",
      description: "Schedule your appointment",
      primary: "Available 24/7",
      secondary: "Instant confirmation",
      action: "Book Now",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
    { day: "Sunday", hours: "Closed" },
    { day: "Emergency", hours: "24/7 Available" },
  ]

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Support",
      description: "Get instant answers to your dental questions with our advanced AI assistant.",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your privacy and medical information are protected with the highest security standards.",
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Our team is dedicated to providing gentle, understanding, and personalized dental care.",
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Consistently rated 5 stars by our patients for exceptional service and care quality.",
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
              <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
              <p className="text-gray-600">Get in touch with our dental care team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Emergency Alert */}
        <div className="mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800">Dental Emergency?</h3>
                  <p className="text-red-700 text-sm">
                    For urgent dental care, call our emergency line immediately at{" "}
                    <span className="font-bold">(555) 911-TOOTH</span>
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Call Emergency
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <div className="space-y-1 mb-4">
                  <div className="font-medium text-gray-900">{method.primary}</div>
                  <div className="text-sm text-gray-600">{method.secondary}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-blue-50 group-hover:border-blue-300"
                  asChild
                >
                  <Link
                    href={
                      method.title === "AI Assistant"
                        ? "/chatbot"
                        : method.title === "Book Online"
                          ? "/appointments"
                          : "#"
                    }
                  >
                    {method.action}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      type="email"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment">Appointment Inquiry</SelectItem>
                          <SelectItem value="insurance">Insurance Questions</SelectItem>
                          <SelectItem value="services">Services Information</SelectItem>
                          <SelectItem value="billing">Billing Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General inquiry</SelectItem>
                          <SelectItem value="medium">Medium - Need response soon</SelectItem>
                          <SelectItem value="high">High - Urgent matter</SelectItem>
                          <SelectItem value="emergency">Emergency - Immediate attention</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe how we can help you..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1" size="lg">
                      Send Message
                    </Button>
                    <Button type="button" variant="outline" size="lg" asChild>
                      <Link href="/chatbot">
                        <Bot className="w-4 h-4 mr-2" />
                        Try AI Assistant
                      </Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900">Bright Smile Dental Clinic</div>
                  <div className="text-gray-600">
                    123 Smile Street, Downtown
                    <br />
                    Healthy City, HC 12345
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>(555) 123-SMILE</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>info@brightsmile.com</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{schedule.day}</span>
                      <span
                        className={`font-medium ${schedule.day === "Emergency" ? "text-red-600" : "text-gray-900"}`}
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">10,000+ Happy Patients</div>
                      <div className="text-sm text-gray-600">Trusted by the community</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">4.9/5 Star Rating</div>
                      <div className="text-sm text-gray-600">Excellent patient reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">AI-Powered Care</div>
                      <div className="text-sm text-gray-600">Advanced technology</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Patients Choose Bright Smile</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with compassionate care to provide the best possible dental experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <p className="text-gray-600">Located in the heart of downtown with easy access and free parking.</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive map would be embedded here</p>
                  <p className="text-sm">123 Smile Street, Downtown, Healthy City, HC 12345</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
