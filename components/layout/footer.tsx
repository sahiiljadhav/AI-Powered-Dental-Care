import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Smile,
  Phone,
  MapPin,
  Clock,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Calendar,
  Shield,
  Award,
  Heart,
  Star,
} from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: "General Dentistry", href: "/services/general" },
    { name: "Cosmetic Dentistry", href: "/services/cosmetic" },
    { name: "Emergency Care", href: "/services/emergency" },
    { name: "AI Diagnosis", href: "/services/ai-diagnosis" },
    { name: "Teeth Whitening", href: "/services/whitening" },
    { name: "Orthodontics", href: "/services/orthodontics" },
  ]

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about/team" },
    { name: "Technology", href: "/about/technology" },
    { name: "Reviews", href: "/about/reviews" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ]

  const support = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Insurance", href: "/insurance" },
    { name: "Payment Plans", href: "/payment-plans" },
    { name: "Patient Portal", href: "/portal" },
    { name: "Privacy Policy", href: "/privacy" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Smile className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-2xl">Bright Smile</div>
                <div className="text-sm text-gray-400">AI-Powered Dental Care</div>
              </div>
            </Link>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience the future of dental care with our revolutionary AI assistant, advanced 3D diagnostics, and
              world-class treatments. Your smile is our mission.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium">(555) 123-SMILE</div>
                  <div className="text-sm text-gray-400">Main Line</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-400" />
                <div>
                  <div className="font-medium">(555) 911-TOOTH</div>
                  <div className="text-sm text-gray-400">Emergency 24/7</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium">123 Smile Street, Downtown</div>
                  <div className="text-sm text-gray-400">Healthy City, HC 12345</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium">Mon-Fri: 8AM-6PM</div>
                  <div className="text-sm text-gray-400">Sat: 9AM-3PM, Sun: Closed</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mt-6">
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/chatbot">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Assistant
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link href="/appointments">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Link>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-medium mb-3">Stay Updated</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Get dental health tips and clinic updates</p>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-gray-700" />

        {/* Awards and Certifications */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="font-medium text-sm">ADA Certified</div>
              <div className="text-xs text-gray-400">American Dental Association</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div>
              <div className="font-medium text-sm">HIPAA Compliant</div>
              <div className="text-xs text-gray-400">Patient Privacy Protected</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-blue-400" />
            <div>
              <div className="font-medium text-sm">5-Star Rated</div>
              <div className="text-xs text-gray-400">1000+ Patient Reviews</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-400" />
            <div>
              <div className="font-medium text-sm">Community Care</div>
              <div className="text-xs text-gray-400">Local Health Partner</div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">© {currentYear} Bright Smile Dental Clinic. All rights reserved.</div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
