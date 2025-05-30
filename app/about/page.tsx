"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Award,
  Users,
  Heart,
  Shield,
  Star,
  Calendar,
  Bot,
  Zap,
  Globe,
  CheckCircle,
  Mail,
  Linkedin,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience", value: "15+", icon: Calendar },
    { label: "Happy Patients", value: "10,000+", icon: Users },
    { label: "Success Rate", value: "98%", icon: CheckCircle },
    { label: "5-Star Reviews", value: "1,200+", icon: Star },
  ]

  const team = [
    {
      name: "Dr. Sarah Smith",
      role: "Chief Dental Officer",
      specialty: "General & Cosmetic Dentistry",
      experience: "15 years",
      education: "DDS, Harvard School of Dental Medicine",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Smith is passionate about combining traditional dental expertise with cutting-edge AI technology to provide the best possible patient care.",
      achievements: ["Board Certified", "AI Dental Innovation Award", "Top Dentist 2023"],
    },
    {
      name: "Dr. Michael Johnson",
      role: "Senior Dentist",
      specialty: "Oral Surgery & Implants",
      experience: "12 years",
      education: "DDS, UCLA School of Dentistry",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Johnson specializes in complex oral surgeries and is a pioneer in AI-assisted surgical planning and precision dentistry.",
      achievements: ["Oral Surgery Specialist", "Research Publications", "Innovation Leader"],
    },
    {
      name: "Dr. Emily Williams",
      role: "Orthodontist",
      specialty: "Orthodontics & Alignment",
      experience: "10 years",
      education: "DDS, NYU College of Dentistry",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Williams combines traditional orthodontic techniques with AI-powered treatment planning for optimal results.",
      achievements: ["Orthodontic Specialist", "Invisalign Expert", "Patient Choice Award"],
    },
    {
      name: "Dr. James Brown",
      role: "Pediatric Dentist",
      specialty: "Children's Dentistry",
      experience: "8 years",
      education: "DDS, University of Pennsylvania",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Dr. Brown makes dental visits fun for children while using AI tools to ensure gentle and effective treatment.",
      achievements: ["Pediatric Specialist", "Child-Friendly Care", "Community Service Award"],
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, understanding, and genuine care for their well-being.",
    },
    {
      icon: Bot,
      title: "Innovation First",
      description: "We leverage cutting-edge AI technology to provide more accurate diagnoses and better outcomes.",
    },
    {
      icon: Shield,
      title: "Safety & Privacy",
      description: "Your health information is protected with the highest security standards and HIPAA compliance.",
    },
    {
      icon: Star,
      title: "Excellence",
      description:
        "We strive for perfection in every procedure and interaction, maintaining the highest quality standards.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description:
        "Our multi-language AI assistant ensures everyone can access quality dental care regardless of language barriers.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We're committed to improving oral health in our community through education and outreach programs.",
    },
  ]

  const technologies = [
    {
      name: "AI Symptom Analysis",
      description: "Advanced machine learning algorithms for precise diagnosis",
      progress: 95,
    },
    {
      name: "3D Imaging & Modeling",
      description: "High-resolution 3D scans for accurate treatment planning",
      progress: 90,
    },
    {
      name: "Voice Recognition",
      description: "Multi-language voice interface for hands-free interaction",
      progress: 88,
    },
    {
      name: "Predictive Analytics",
      description: "AI-powered predictions for preventive care recommendations",
      progress: 85,
    },
    {
      name: "Digital Treatment Planning",
      description: "Computer-assisted design for optimal treatment outcomes",
      progress: 92,
    },
  ]

  const certifications = [
    { name: "American Dental Association", badge: "ADA Certified" },
    { name: "HIPAA Compliance", badge: "Privacy Protected" },
    { name: "ISO 9001:2015", badge: "Quality Management" },
    { name: "AI Ethics Board", badge: "Ethical AI Use" },
    { name: "Joint Commission", badge: "Safety Standards" },
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
              <h1 className="text-2xl font-bold text-gray-900">About Bright Smile</h1>
              <p className="text-gray-600">Leading the future of dental care with AI-powered innovation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Established 2009</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing Dental Care with AI Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Bright Smile Dental Clinic, we combine 15 years of dental expertise with cutting-edge artificial
            intelligence to provide personalized, precise, and compassionate dental care. Our mission is to make quality
            dental care accessible to everyone through innovation and technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge className="mb-4">Our Story</Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">From Traditional Practice to AI Innovation</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2009 by Dr. Sarah Smith, Bright Smile Dental Clinic started as a traditional family dental
                practice with a vision to make dental care more accessible and effective for everyone in our community.
              </p>
              <p>
                In 2020, we became pioneers in integrating artificial intelligence into dental care, developing our
                proprietary AI assistant that can analyze symptoms, provide instant recommendations, and support
                patients in multiple languages.
              </p>
              <p>
                Today, we're proud to be at the forefront of dental innovation, combining the warmth of traditional
                patient care with the precision and efficiency of modern AI technology. Our approach has helped over
                10,000 patients achieve better oral health outcomes.
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <Button asChild>
                <Link href="/services">Our Services</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/chatbot">Try AI Assistant</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Modern dental clinic"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="font-semibold">AI Innovation Award</div>
                  <div className="text-sm text-gray-600">2023 Dental Technology</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Values</Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">What Drives Us Every Day</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from patient interactions to technology development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Expert Dental Professionals</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team combines decades of dental expertise with a passion for innovation and patient care.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-48 h-64 md:h-auto relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-gray-900">{member.name}</h4>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.specialty}</p>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{member.education}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{member.experience} experience</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900">Achievements:</div>
                      <div className="flex flex-wrap gap-1">
                        {member.achievements.map((achievement, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline">
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Technology</Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Cutting-Edge Dental Technology</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We invest in the latest technology to provide more accurate diagnoses, better treatment outcomes, and
              improved patient experiences.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {technologies.map((tech, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                        <p className="text-gray-600 text-sm">{tech.description}</p>
                      </div>
                      <Badge variant="outline">{tech.progress}%</Badge>
                    </div>
                    <Progress value={tech.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Advanced dental technology"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-sm">AI-Powered Diagnostics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4">Certifications</Badge>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Trusted & Certified</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards of care through rigorous certifications and continuous education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {cert.badge}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Experience the Future of Dental Care?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who trust us with their dental health and experience the difference AI-powered
            care can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/appointments">Book Your Visit</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/chatbot">Try AI Assistant</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
