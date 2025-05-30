"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Phone,
  Calendar,
  MessageCircle,
  Smile,
  Bot,
  Stethoscope,
  Users,
  Award,
  MapPin,
  Clock,
  Star,
} from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      title: "General Dentistry",
      description: "Comprehensive oral health care",
      icon: Stethoscope,
      href: "/services/general",
    },
    {
      title: "Cosmetic Dentistry",
      description: "Transform your smile",
      icon: Smile,
      href: "/services/cosmetic",
    },
    {
      title: "Emergency Care",
      description: "24/7 urgent dental care",
      icon: Phone,
      href: "/services/emergency",
    },
    {
      title: "AI Diagnosis",
      description: "Advanced symptom analysis",
      icon: Bot,
      href: "/services/ai-diagnosis",
    },
  ]

  const about = [
    {
      title: "Our Team",
      description: "Meet our expert dentists",
      icon: Users,
      href: "/about/team",
    },
    {
      title: "Technology",
      description: "Cutting-edge dental tech",
      icon: Award,
      href: "/about/technology",
    },
    {
      title: "Location",
      description: "Find our clinic",
      icon: MapPin,
      href: "/about/location",
    },
    {
      title: "Reviews",
      description: "Patient testimonials",
      icon: Star,
      href: "/about/reviews",
    },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Smile className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Bright Smile</div>
              <div className="text-xs text-gray-600 hidden sm:block">AI-Powered Dental Care</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <service.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{service.title}</div>
                            <div className="text-xs text-muted-foreground">{service.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] lg:w-[600px] lg:grid-cols-2">
                    {about.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Emergency Badge */}
            <Badge variant="destructive" className="hidden sm:flex items-center gap-1 animate-pulse">
              <Phone className="w-3 h-3" />
              Emergency: (555) 911-TOOTH
            </Badge>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/chatbot">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Assistant
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/appointments">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Smile className="w-6 h-6 text-blue-600" />
                    Bright Smile Clinic
                  </SheetTitle>
                  <SheetDescription>AI-Powered Dental Care</SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-6">
                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Button asChild className="w-full justify-start" size="lg">
                      <Link href="/chatbot" onClick={() => setIsMobileMenuOpen(false)}>
                        <MessageCircle className="w-5 h-5 mr-3" />
                        Try AI Assistant
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start" size="lg">
                      <Link href="/appointments" onClick={() => setIsMobileMenuOpen(false)}>
                        <Calendar className="w-5 h-5 mr-3" />
                        Book Appointment
                      </Link>
                    </Button>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                      <div className="space-y-2">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <service.icon className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{service.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                      <div className="space-y-2">
                        {about.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-6 border-t">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span>(555) 123-SMILE</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>123 Smile Street, Downtown</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Mon-Fri: 8AM-6PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
