"use client"

import type React from "react"
import { useState } from "react"
import {
  X,
  Calendar,
  ChevronDown,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Download,
  GraduationCap,
  MapPin,
  FileText,
  Clock,
} from "lucide-react"

export interface StudentFormData {
  fullName: string
  phoneNumber: string
  emailAddress: string
  occupation: string
  placeOfAttachment: string
  natureOfAttachment: string
  attachmentStartDate: string
  durationOfAttachment: string
}

export interface StudentSelectedPlans {
  plan: string
}

export interface StudentProductInfo {
  name: string
  description: string
  benefits: string[]
  icon?: React.ReactNode
}

export interface StudentAccidentFormProps {
  productInfo: StudentProductInfo
  onClose?: () => void
  onSubmit?: (formData: StudentFormData, selectedPlans: StudentSelectedPlans) => void
  className?: string
  quotationNumber?: string
  coverName?: string
}

const studentPlanOptions = [
  {
    name: "Basic Student Cover",
    price: "KES 2,500",
    coverLimit: "Up to KES 500K",
    benefits: [
      "Accidental death coverage",
      "Permanent disability benefits",
      "Medical expenses reimbursement",
      "Emergency evacuation",
      "24/7 helpline support",
    ],
  },
  {
    name: "Premium Student Cover",
    price: "KES 4,500",
    coverLimit: "Up to KES 1M",
    benefits: [
      "Enhanced accidental death coverage",
      "Comprehensive disability benefits",
      "Extended medical expenses",
      "International emergency evacuation",
      "Personal liability coverage",
      "Study interruption benefits",
    ],
  },
]

const StudentAccidentForm: React.FC<StudentAccidentFormProps> = ({
  productInfo = { name: "Students/Personal Accident Cover", description: "", benefits: [] },
  onClose,
  onSubmit,
  className = "",
  quotationNumber = "CICKE/02/07/2/QUT-500246",
  coverName = "CIC Student Accident Cover",
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    occupation: "",
    placeOfAttachment: "",
    natureOfAttachment: "",
    attachmentStartDate: "",
    durationOfAttachment: "",
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showQuotes, setShowQuotes] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState<StudentSelectedPlans>({
    plan: "",
  })

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePlanSelection = (plan: string) => {
    setSelectedPlans({
      plan,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.fullName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.emailAddress.trim() ||
      !formData.occupation.trim() ||
      !formData.placeOfAttachment.trim() ||
      !formData.natureOfAttachment.trim() ||
      !formData.attachmentStartDate ||
      !formData.durationOfAttachment.trim()
    ) {
      alert("Please fill in all required fields before proceeding.")
      return
    }

    setShowQuotes(true)
  }

  const handleBackToForm = () => {
    setShowQuotes(false)
  }

  const handleClose = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      occupation: "",
      placeOfAttachment: "",
      natureOfAttachment: "",
      attachmentStartDate: "",
      durationOfAttachment: "",
    })

    setSelectedPlans({
      plan: "",
    })

    setShowQuotes(false)
    setFocusedField(null)
    onClose?.()
  }

  const handleFinalSubmit = () => {
    onSubmit?.(formData, selectedPlans)
  }

  const getSelectedPlanPrice = () => {
    const selectedPlan = studentPlanOptions.find((plan) => selectedPlans.plan === `${plan.name} - ${plan.price}`)
    return selectedPlan ? Number.parseInt(selectedPlan.price.replace(/[^\d]/g, "")) : 0
  }

  if (showQuotes) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="px-8 py-12 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button
                onClick={handleBackToForm}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-light text-gray-900 tracking-tight">Your Quote Options</h1>
                <p className="text-sm text-gray-500 mt-1">Select the perfect coverage for your student needs</p>
              </div>
            </div>
          </div>

          {/* Quote metadata card */}
          <div className="px-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Quotation</p>
                  <p className="text-sm font-medium text-gray-900">{quotationNumber.split("/").pop()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Cover</p>
                  <p className="text-sm font-medium text-gray-900">{coverName}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Occupation</p>
                  <p className="text-sm font-medium text-gray-900">{formData.occupation}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Duration</p>
                  <p className="text-sm font-medium text-gray-900">{formData.durationOfAttachment}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="px-8 pb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extralight text-gray-900 mb-3 tracking-tight">Choose Your Coverage</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Select from our comprehensive student accident insurance plans
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
              {/* Plans Section */}
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Student Accident Coverage</h3>
                    <p className="text-sm text-gray-500">
                      Comprehensive protection during your studies and attachments
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {studentPlanOptions.map((plan, index) => {
                    const isSelected = selectedPlans.plan === `${plan.name} - ${plan.price}`

                    return (
                      <div key={index} className="relative">
                        <button
                          onClick={() => handlePlanSelection(`${plan.name} - ${plan.price}`)}
                          className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold text-gray-900 text-lg">{plan.name}</h4>
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-1"></div>}
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                            <div className="text-sm text-gray-500">{plan.coverLimit}</div>
                          </div>

                          <div className="space-y-2">
                            {plan.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Attachment Details */}
                <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Attachment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Place of Attachment</p>
                      <p className="font-medium text-gray-900">{formData.placeOfAttachment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nature of Attachment</p>
                      <p className="font-medium text-gray-900">{formData.natureOfAttachment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Start Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(formData.attachmentStartDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Duration</p>
                      <p className="font-medium text-gray-900">{formData.durationOfAttachment}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Summary Sidebar */}
              <div className="xl:w-80 xl:sticky xl:top-8 xl:self-start">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Premium Summary</h3>
                  {selectedPlans.plan ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Selected Plan</span>
                        <span className="font-medium text-gray-900 text-sm">{selectedPlans.plan.split(" - ")[0]}</span>
                      </div>

                      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Premium</span>
                        <span className="font-bold text-lg text-blue-600">
                          KES {getSelectedPlanPrice().toLocaleString()}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        Premium includes all statutory charges and taxes. Coverage is valid for the duration of your
                        attachment period.
                      </p>

                      <div className="pt-4 space-y-3">
                        <button
                          onClick={handleFinalSubmit}
                          className="w-full py-3 font-medium rounded-xl transition-all duration-300 text-sm bg-[#AC1F2D] text-white hover:bg-[#8B1A24] shadow-md hover:shadow-lg"
                        >
                          Buy Policy
                        </button>
                        <button className="w-full py-3 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-blue-200 text-sm">
                          <Download size={16} />
                          <span>Download Quote</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <GraduationCap size={20} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Select a plan to view your premium summary</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="w-full bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Get Your Student Quote</h1>
          <button
            onClick={handleClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="flex-1 p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Personal & Attachment Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Full Name</label>
                    <div className="relative">
                      <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        onFocus={() => setFocusedField("fullName")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "fullName"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Phone Number</label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        onFocus={() => setFocusedField("phoneNumber")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "phoneNumber"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                      onFocus={() => setFocusedField("emailAddress")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                        focusedField === "emailAddress"
                          ? "border-blue-500 bg-white shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Occupation <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap
                      size={20}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      onFocus={() => setFocusedField("occupation")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                        focusedField === "occupation"
                          ? "border-blue-500 bg-white shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="e.g., Student, Intern, Trainee"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Place of Attachment <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.placeOfAttachment}
                        onChange={(e) => handleInputChange("placeOfAttachment", e.target.value)}
                        onFocus={() => setFocusedField("placeOfAttachment")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "placeOfAttachment"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="Enter company/organization name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Nature of Attachment <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FileText
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        value={formData.natureOfAttachment}
                        onChange={(e) => handleInputChange("natureOfAttachment", e.target.value)}
                        onFocus={() => setFocusedField("natureOfAttachment")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "natureOfAttachment"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="e.g., Industrial Attachment, Internship"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Attachment Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="date"
                        value={formData.attachmentStartDate}
                        onChange={(e) => handleInputChange("attachmentStartDate", e.target.value)}
                        onFocus={() => setFocusedField("attachmentStartDate")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 text-gray-900 ${
                          focusedField === "attachmentStartDate"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Duration of Attachment <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={formData.durationOfAttachment}
                        onChange={(e) => handleInputChange("durationOfAttachment", e.target.value)}
                        onFocus={() => setFocusedField("durationOfAttachment")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-12 bg-gray-50 border-2 rounded-full transition-all duration-200 text-gray-900 appearance-none ${
                          focusedField === "durationOfAttachment"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <option value="">Select duration</option>
                        <option value="1 Month">1 Month</option>
                        <option value="2 Months">2 Months</option>
                        <option value="3 Months">3 Months</option>
                        <option value="4 Months">4 Months</option>
                        <option value="5 Months">5 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="1 Year">1 Year</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-lg hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Display Quotes
                </button>
              </div>
            </form>
          </div>

          {/* Product Card Section */}
          <div className="lg:w-96 bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 border-l border-gray-200">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Quoting For</p>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  {productInfo.icon || <GraduationCap size={32} className="text-white" />}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{productInfo.name}</h3>
                <p className="text-sm font-medium text-gray-600 mb-4">Product Description</p>
                <p className="text-gray-700 leading-relaxed">{productInfo.description}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  {productInfo.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAccidentForm
