"use client"

import type React from "react"
import { useState } from "react"
import { X, Calendar, ChevronDown, User, Phone, Mail, Shield, ArrowLeft, Download } from "lucide-react"

export interface FormData {
  fullName: string
  phoneNumber: string
  emailAddress: string
  dateOfBirth: string
  insureSpouse: string
}

export interface SelectedPlans {
  inpatient: string
  outpatient: string
  dental: string
  optical: string
}

export interface ProductInfo {
  name: string
  description: string
  benefits: string[]
  icon?: React.ReactNode
}

export interface QuoteFormProps {
  productInfo: ProductInfo
  onClose?: () => void
  onSubmit?: (formData: FormData, selectedPlans: SelectedPlans) => void
  className?: string
  quotationNumber?: string
  coverName?: string
  familySize?: number
  planOptions?: {
    inpatient: Array<{ name: string; price: string }>
    outpatient: Array<{ name: string; price: string }>
    dental: Array<{ name: string; price: string }>
    optical: Array<{ name: string; price: string }>
  }
}

const defaultPlanOptions = {
  inpatient: [
    {
      name: "Option 1",
      price: "Kes 3,347.00",
      benefits: [],
    },
    {
      name: "Option 2",
      price: "Kes 4,553.00",
      benefits: [],
    },
    {
      name: "Option 3",
      price: "Kes 6,085.00",
      benefits: [],
    },
    {
      name: "Option 4",
      price: "Kes 8,495.00",
      benefits: [],
    },
    {
      name: "Option 5",
      price: "Kes 12,722.00",
      benefits: ["Sporting Equipment upto Kes 750,000.00", "Personal effects upto Kes 500,000.00"],
    },
    {
      name: "Option 6",
      price: "Kes 15,924.00",
      benefits: [],
    },
  ],
  outpatient: [
    { name: "Basic Plan", price: "KES 8,000" },
    { name: "Standard Plan", price: "KES 12,000" },
    { name: "Premium Plan", price: "KES 18,000" },
  ],
  dental: [
    { name: "Basic Plan", price: "KES 5,000" },
    { name: "Premium Plan", price: "KES 10,000" },
  ],
  optical: [
    { name: "Basic Plan", price: "KES 3,000" },
    { name: "Premium Plan", price: "KES 6,000" },
  ],
}

const MediplanQuoteForm: React.FC<QuoteFormProps> = ({
  productInfo = { name: "", description: "", benefits: [] },
  onClose,
  onSubmit,
  className = "",
  quotationNumber = "CICKE/02/07/2/QUT-500243",
  coverName = "CIC Seniors Medisure",
  familySize = 1,
  planOptions = defaultPlanOptions,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    insureSpouse: "No",
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showQuotes, setShowQuotes] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState<SelectedPlans>({
    inpatient: "",
    outpatient: "",
    dental: "",
    optical: "",
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePlanSelection = (category: keyof SelectedPlans, plan: string) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [category]: plan,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (
      !formData.fullName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.emailAddress.trim() ||
      !formData.dateOfBirth
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
    // Reset form data
    setFormData({
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      dateOfBirth: "",
      insureSpouse: "No",
    })

    // Reset selected plans
    setSelectedPlans({
      inpatient: "",
      outpatient: "",
      dental: "",
      optical: "",
    })

    // Reset to form view
    setShowQuotes(false)
    setFocusedField(null)

    // Call external close handler if provided
    onClose?.()
  }

  const handleFinalSubmit = () => {
    onSubmit?.(formData, selectedPlans)
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
                <p className="text-sm text-gray-500 mt-1">Select the perfect plan for your needs</p>
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
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Duration</p>
                  <p className="text-sm font-medium text-gray-900">12 Months</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Family Size</p>
                  <p className="text-sm font-medium text-gray-900">{familySize}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="px-8 pb-16">
            {/* Section title */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extralight text-gray-900 mb-3 tracking-tight">Choose Your Coverage</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Select the inpatient plan that best fits your healthcare needs and budget
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
              {/* Plans Section */}
              <div className="flex-1">
                {/* Plan grid with enhanced design */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {planOptions.inpatient.map((plan, index) => {
                    const inpatientPlan = plan as typeof plan & { coverLimit?: string }
                    const isSelected =
                      selectedPlans.inpatient ===
                      (inpatientPlan.coverLimit
                        ? `${inpatientPlan.name} - ${inpatientPlan.coverLimit}`
                        : `${inpatientPlan.name} - ${inpatientPlan.price}`)
                    const isPopular = index === 2 // Make Plan III popular

                    return (
                      <div key={index} className={`relative group ${isPopular ? "lg:scale-105 lg:-mt-4" : ""}`}>
                        {/* Popular badge */}
                        {isPopular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                              Most Popular
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() =>
                            handlePlanSelection(
                              "inpatient",
                              inpatientPlan.coverLimit
                                ? `${inpatientPlan.name} - ${inpatientPlan.coverLimit}`
                                : `${inpatientPlan.name} - ${inpatientPlan.price}`,
                            )
                          }
                          className={`w-full relative p-6 rounded-3xl border-2 transition-all duration-500 text-left group-hover:shadow-2xl ${
                            isSelected
                              ? "border-blue-500 bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-2xl transform scale-105"
                              : isPopular
                                ? "border-purple-200 bg-gradient-to-br from-purple-50 via-white to-purple-50 hover:border-purple-300 shadow-lg"
                                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
                          }`}
                        >
                          {/* Selection indicator */}
                          <div
                            className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                              isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300 group-hover:border-gray-400"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            )}
                          </div>

                          <div className="space-y-4">
                            {/* Plan header */}
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{inpatientPlan.name}</h3>
                              {inpatientPlan.coverLimit && (
                                <p className="text-xs text-gray-500">
                                  Cover Limit:{" "}
                                  <span className="font-medium text-gray-700">{inpatientPlan.coverLimit}</span>
                                </p>
                              )}
                            </div>

                            {/* Price display */}
                            <div className="space-y-1">
                              <div className="flex items-baseline space-x-1">
                                <span className="text-2xl font-bold text-gray-900">
                                  {plan.price.replace("KES ", "").replace(".00", "")}
                                </span>
                                <span className="text-xs text-gray-500">KES</span>
                              </div>
                              <p className="text-xs text-gray-500">per year</p>
                            </div>

                            {/* Plan features */}
                            <div className="space-y-1.5">
                              <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">Family coverage</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">24/7 emergency support</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">Network hospitals</span>
                              </div>
                            </div>

                            {/* Action button */}
                            <div className="pt-2">
                              <div
                                className={`w-full py-2 px-3 rounded-xl text-center text-xs font-medium transition-all duration-300 ${
                                  isSelected
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : isPopular
                                      ? "bg-purple-100 text-purple-700 group-hover:bg-purple-200"
                                      : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                                }`}
                              >
                                {isSelected ? "Selected" : "Select Plan"}
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>

                {/* Additional coverage options */}
                {selectedPlans.inpatient && (
                  <div className="mt-16">
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-light text-gray-900 mb-2">Enhance Your Coverage</h3>
                      <p className="text-sm text-gray-500">
                        Add optional benefits to complete your healthcare protection
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Outpatient */}
                      <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">Outpatient Care</h4>
                        <p className="text-xs text-gray-600 mb-3">Doctor visits, consultations, and routine checkups</p>
                        <div className="space-y-1.5">
                          {planOptions.outpatient.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePlanSelection("outpatient", `${option.name} - ${option.price}`)}
                              className={`w-full p-2 rounded-lg text-left text-xs transition-all duration-200 ${
                                selectedPlans.outpatient === `${option.name} - ${option.price}`
                                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{option.name}</span>
                                <span className="font-medium">{option.price}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Dental */}
                      <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">Dental Care</h4>
                        <p className="text-xs text-gray-600 mb-3">Dental treatments, cleanings, and procedures</p>
                        <div className="space-y-1.5">
                          {planOptions.dental.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePlanSelection("dental", `${option.name} - ${option.price}`)}
                              className={`w-full p-2 rounded-lg text-left text-xs transition-all duration-200 ${
                                selectedPlans.dental === `${option.name} - ${option.price}`
                                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{option.name}</span>
                                <span className="font-medium">{option.price}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Optical */}
                      <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">Optical Care</h4>
                        <p className="text-xs text-gray-600 mb-3">Eye exams, glasses, and vision correction</p>
                        <div className="space-y-1.5">
                          {planOptions.optical.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePlanSelection("optical", `${option.name} - ${option.price}`)}
                              className={`w-full p-2 rounded-lg text-left text-xs transition-all duration-200 ${
                                selectedPlans.optical === `${option.name} - ${option.price}`
                                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{option.name}</span>
                                <span className="font-medium">{option.price}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Premium Summary Sidebar */}
              <div className="xl:w-80 xl:sticky xl:top-8 xl:self-start">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Premium Summary</h3>
                  {selectedPlans.inpatient ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Inpatient Coverage</span>
                        <span className="font-medium text-gray-900 text-sm">
                          {planOptions.inpatient
                            .find(
                              (plan) =>
                                selectedPlans.inpatient ===
                                ((plan as typeof plan & { coverLimit?: string }).coverLimit
                                  ? `${plan.name} - ${(plan as typeof plan & { coverLimit?: string }).coverLimit}`
                                  : `${plan.name} - ${plan.price}`),
                            )
                            ?.price.replace("KES ", "KES ") || "KES 0"}
                        </span>
                      </div>
                      {(selectedPlans.outpatient || selectedPlans.dental || selectedPlans.optical) && (
                        <div className="space-y-2">
                          {selectedPlans.outpatient && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Outpatient</span>
                              <span className="font-medium text-gray-900">
                                {selectedPlans.outpatient.split(" - ")[1]}
                              </span>
                            </div>
                          )}
                          {selectedPlans.dental && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Dental</span>
                              <span className="font-medium text-gray-900">{selectedPlans.dental.split(" - ")[1]}</span>
                            </div>
                          )}
                          {selectedPlans.optical && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Optical</span>
                              <span className="font-medium text-gray-900">{selectedPlans.optical.split(" - ")[1]}</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Premium</span>
                        <span className="font-bold text-lg text-blue-600">
                          {planOptions.inpatient
                            .find(
                              (plan) =>
                                selectedPlans.inpatient ===
                                ((plan as typeof plan & { coverLimit?: string }).coverLimit
                                  ? `${plan.name} - ${(plan as typeof plan & { coverLimit?: string }).coverLimit}`
                                  : `${plan.name} - ${plan.price}`),
                            )
                            ?.price.replace("KES ", "KES ") || "KES 0"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Premium includes all statutory charges and taxes. Payment can be made annually or in
                        installments.
                      </p>

                      {/* Action buttons */}
                      <div className="pt-4 space-y-3">
                        <button
                          onClick={handleFinalSubmit}
                          disabled={!selectedPlans.inpatient}
                          className={`w-full py-3 font-medium rounded-xl transition-all duration-300 text-sm ${
                            selectedPlans.inpatient
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
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
                        <Shield size={20} className="text-gray-400" />
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
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${className}`}>
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Get Your Quote</h1>
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
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
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

                  {/* Phone Number */}
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

                {/* Email Address */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        onFocus={() => setFocusedField("dateOfBirth")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 text-gray-900 ${
                          focusedField === "dateOfBirth"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Spouse Insurance */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Do you have and want to insure your spouse? <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Shield size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={formData.insureSpouse}
                        onChange={(e) => handleInputChange("insureSpouse", e.target.value)}
                        onFocus={() => setFocusedField("insureSpouse")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-12 bg-gray-50 border-2 rounded-full transition-all duration-200 text-gray-900 appearance-none ${
                          focusedField === "insureSpouse"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
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
                  {productInfo.icon || <Shield size={32} className="text-white" />}
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

export default MediplanQuoteForm
