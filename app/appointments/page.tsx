"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CalendarIcon, Phone, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [step, setStep] = useState(1)
  const { toast } = useToast()

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

  const doctors = [
    {
      id: "dr-smith",
      name: "Dr. Sarah Smith",
      specialty: "General Dentistry",
      rating: 4.9,
      reviews: 245,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "dr-johnson",
      name: "Dr. Michael Johnson",
      specialty: "Cosmetic Dentistry",
      rating: 4.8,
      reviews: 189,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "dr-williams",
      name: "Dr. Emily Williams",
      specialty: "Orthodontics",
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !appointmentType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Appointment Booked!",
      description: "Your appointment has been successfully scheduled.",
    })

    setStep(4) // Go to confirmation step
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
              <p className="text-gray-600">Schedule your visit with our expert dental team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[
                { step: 1, title: "Service & Date" },
                { step: 2, title: "Doctor & Time" },
                { step: 3, title: "Your Information" },
                { step: 4, title: "Confirmation" },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= item.step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > item.step ? <CheckCircle className="w-5 h-5" /> : item.step}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{item.title}</span>
                  {index < 3 && <div className={`w-16 h-1 mx-4 ${step > item.step ? "bg-blue-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Service & Date */}
          {step === 1 && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Select Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={appointmentType} onValueChange={setAppointmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex justify-between items-center w-full">
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.duration}</div>
                            </div>
                            <span className="font-semibold text-blue-600">{type.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {appointmentType && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">
                          {appointmentTypes.find((t) => t.value === appointmentType)?.label}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Duration: {appointmentTypes.find((t) => t.value === appointmentType)?.duration} • Cost:{" "}
                        {appointmentTypes.find((t) => t.value === appointmentType)?.price}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                  {selectedDate && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Doctor & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Doctor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedDoctor === doctor.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedDoctor(doctor.id)}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                            <img
                              src={doctor.image || "/placeholder.svg"}
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{doctor.rating}</span>
                            <span className="text-sm text-gray-500">({doctor.reviews})</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Patient Information */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input type="tel" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delta">Delta Dental</SelectItem>
                      <SelectItem value="cigna">Cigna</SelectItem>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="metlife">MetLife</SelectItem>
                      <SelectItem value="none">No Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Notes</label>
                  <Textarea placeholder="Any special requests or medical conditions we should know about?" rows={3} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">Appointment Confirmed!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Appointment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">
                        {appointmentTypes.find((t) => t.value === appointmentType)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{doctors.find((d) => d.id === selectedDoctor)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {appointmentTypes.find((t) => t.value === appointmentType)?.duration}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Cost:</span>
                      <span className="text-blue-600">
                        {appointmentTypes.find((t) => t.value === appointmentType)?.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">What's Next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Confirmation email sent to your inbox</li>
                    <li>• SMS reminder 24 hours before appointment</li>
                    <li>• Please arrive 15 minutes early</li>
                    <li>• Bring your insurance card and ID</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Clinic
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (step === 3) {
                    handleBookAppointment()
                  } else {
                    setStep(Math.min(4, step + 1))
                  }
                }}
                disabled={
                  (step === 1 && (!appointmentType || !selectedDate)) ||
                  (step === 2 && (!selectedDoctor || !selectedTime))
                }
              >
                {step === 3 ? "Book Appointment" : "Next"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
