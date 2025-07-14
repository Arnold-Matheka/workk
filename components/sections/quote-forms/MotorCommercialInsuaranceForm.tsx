"use client"

import type React from "react"
import { useState } from "react"
import { X, Calendar, ChevronDown, User, Phone, Mail, ArrowLeft, Download, Car, Truck } from "lucide-react"

export interface MotorFormData {
  fullName: string
  phoneNumber: string
  emailAddress: string
  vehicleMake: string
  vehicleModel: string
  yearOfManufacture: string
  vehicleValue: string
  vehicleBodyType: string
  vehicleTonnage: string
}

export interface MotorSelectedPlans {
  coverType: string
  plan: string
  passengerLegalLiability: boolean
}

export interface MotorProductInfo {
  name: string
  description: string
  benefits: string[]
  icon?: React.ReactNode
}

export interface MotorCommercialFormProps {
  productInfo: MotorProductInfo
  onClose?: () => void
  onSubmit?: (formData: MotorFormData, selectedPlans: MotorSelectedPlans) => void
  className?: string
  quotationNumber?: string
  coverName?: string
}

const motorPlanOptions = {
  thirdParty: [
    {
      name: "Easy Bima Motor Commercial",
      price: "KES 15,000",
      benefits: [],
    },
    {
      name: "Motor Commercial",
      price: "KES 18,000",
      benefits: [],
    },
  ],
  comprehensive: [
    {
      name: "Easy Bima Motor Commercial",
      price: "KES 45,000",
      benefits: [
        "Towing and recovery",
        "Third party injury/death",
        "Emergency medical expenses (vehicle occupants)",
        "Political violence & terrorism",
        "Third party property damage",
        "Excess protector - own damage",
        "Vehicle entertainment system",
        "Windscreen",
      ],
    },
    {
      name: "Motor Commercial",
      price: "KES 52,000",
      benefits: [
        "Towing and recovery",
        "Third party injury/death",
        "Emergency medical expenses (vehicle occupants)",
        "Political violence & terrorism",
        "Third party property damage",
        "Excess protector - own damage",
        "Vehicle entertainment system",
        "Windscreen",
      ],
    },
    {
      name: "Motor Commercial",
      price: "KES 65,000",
      isPreferred: true,
      benefits: [
        "Towing and recovery",
        "Third party injury/death",
        "Emergency medical expenses (vehicle occupants)",
        "Political violence & terrorism",
        "Third party property damage",
        "Excess protector - own damage",
        "Vehicle entertainment system",
        "Windscreen",
      ],
    },
  ],
}

const MotorCommercialForm: React.FC<MotorCommercialFormProps> = ({
  productInfo = { name: "Motor Commercial Insurance", description: "", benefits: [] },
  onClose,
  onSubmit,
  className = "",
  quotationNumber = "CICKE/02/07/2/QUT-500245",
  coverName = "CIC Motor Commercial",
}) => {
  const [formData, setFormData] = useState<MotorFormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    vehicleMake: "",
    vehicleModel: "",
    yearOfManufacture: "",
    vehicleValue: "",
    vehicleBodyType: "",
    vehicleTonnage: "",
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showQuotes, setShowQuotes] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState<MotorSelectedPlans>({
    coverType: "",
    plan: "",
    passengerLegalLiability: false,
  })

  const handleInputChange = (field: keyof MotorFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCoverTypeSelection = (coverType: string) => {
    setSelectedPlans((prev) => ({
      ...prev,
      coverType,
      plan: "", // Reset plan when cover type changes
    }))
  }

  const handlePlanSelection = (plan: string) => {
    setSelectedPlans((prev) => ({
      ...prev,
      plan,
    }))
  }

  const handlePassengerLiabilityToggle = () => {
    setSelectedPlans((prev) => ({
      ...prev,
      passengerLegalLiability: !prev.passengerLegalLiability,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.fullName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.emailAddress.trim() ||
      !formData.vehicleMake.trim() ||
      !formData.vehicleModel.trim() ||
      !formData.yearOfManufacture.trim() ||
      !formData.vehicleValue.trim()
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
      vehicleMake: "",
      vehicleModel: "",
      yearOfManufacture: "",
      vehicleValue: "",
      vehicleBodyType: "",
      vehicleTonnage: "",
    })

    setSelectedPlans({
      coverType: "",
      plan: "",
      passengerLegalLiability: false,
    })

    setShowQuotes(false)
    setFocusedField(null)
    onClose?.()
  }

  const handleFinalSubmit = () => {
    onSubmit?.(formData, selectedPlans)
  }

  const getCurrentPlans = () => {
    if (selectedPlans.coverType === "Third Party Only") {
      return motorPlanOptions.thirdParty
    } else if (selectedPlans.coverType === "Comprehensive") {
      return motorPlanOptions.comprehensive
    }
    return []
  }

  const getSelectedPlanPrice = () => {
    const plans = getCurrentPlans()
    const selectedPlan = plans.find((plan) => selectedPlans.plan === `${plan.name} - ${plan.price}`)
    return selectedPlan ? Number.parseInt(selectedPlan.price.replace(/[^\d]/g, "")) : 0
  }

  const getTotalPrice = () => {
    let total = getSelectedPlanPrice()
    if (selectedPlans.passengerLegalLiability) {
      total += 5000 // Additional cost for passenger legal liability
    }
    return total
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
                <p className="text-sm text-gray-500 mt-1">Select the perfect coverage for your commercial vehicle</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <X size={20} className="text-gray-600" />
            </button>
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
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Vehicle</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.vehicleMake} {formData.vehicleModel}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Year</p>
                  <p className="text-sm font-medium text-gray-900">{formData.yearOfManufacture}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="px-8 pb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extralight text-gray-900 mb-3 tracking-tight">
                Which Cover Would You Like To Buy?
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Choose between Third Party Only or Comprehensive coverage
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
              {/* Plans Section */}
              <div className="flex-1 space-y-12">
                {/* Cover Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <button
                    onClick={() => handleCoverTypeSelection("Third Party Only")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedPlans.coverType === "Third Party Only"
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Third Party Only</h3>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedPlans.coverType === "Third Party Only"
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPlans.coverType === "Third Party Only" && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Basic coverage for third party liability only</p>
                  </button>

                  <button
                    onClick={() => handleCoverTypeSelection("Comprehensive")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                      selectedPlans.coverType === "Comprehensive"
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Comprehensive</h3>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedPlans.coverType === "Comprehensive"
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPlans.coverType === "Comprehensive" && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Full coverage including own damage and additional benefits</p>
                  </button>
                </div>

                {/* Plan Options */}
                {selectedPlans.coverType && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Car size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedPlans.coverType} Plans</h3>
                        <p className="text-sm text-gray-500">Choose your preferred plan option</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {getCurrentPlans().map((plan, index) => {
                        const isSelected = selectedPlans.plan === `${plan.name} - ${plan.price}`
                        const isPreferred = (plan as any).isPreferred

                        return (
                          <div key={index} className="relative">
                            {isPreferred && (
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                                  Preferred Option
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => handlePlanSelection(`${plan.name} - ${plan.price}`)}
                              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                isSelected
                                  ? "border-blue-500 bg-blue-50 shadow-lg"
                                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold text-gray-900 text-sm">{plan.name}</h4>
                                <div
                                  className={`w-4 h-4 rounded-full border-2 ${
                                    isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                  }`}
                                >
                                  {isSelected && <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1"></div>}
                                </div>
                              </div>

                              <div className="mb-3">
                                <div className="text-lg font-bold text-gray-900">{plan.price}</div>
                                <div className="text-xs text-gray-500">per year</div>
                              </div>

                              {plan.benefits.length > 0 && (
                                <div className="space-y-1">
                                  {plan.benefits.slice(0, 2).map((benefit, idx) => (
                                    <div key={idx} className="flex items-center text-xs text-gray-600">
                                      <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                                      {benefit}
                                    </div>
                                  ))}
                                  {plan.benefits.length > 2 && (
                                    <div className="text-xs text-gray-500 mt-2">
                                      +{plan.benefits.length - 2} more benefits
                                    </div>
                                  )}
                                </div>
                              )}
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    {/* Benefits Section */}
                    {selectedPlans.coverType === "Comprehensive" && selectedPlans.plan && (
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Benefits Included in the Cover</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {getCurrentPlans()[0].benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-700">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Extra Benefits */}
                    {selectedPlans.plan && (
                      <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Extra Benefits</h4>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <h5 className="font-medium text-gray-900">Passenger Legal Liability</h5>
                            <p className="text-sm text-gray-600">Additional coverage for passenger liability</p>
                            <p className="text-sm font-medium text-blue-600">+KES 5,000</p>
                          </div>
                          <button
                            onClick={handlePassengerLiabilityToggle}
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              selectedPlans.passengerLegalLiability ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                                selectedPlans.passengerLegalLiability ? "translate-x-6" : "translate-x-0.5"
                              }`}
                            ></div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Premium Summary Sidebar */}
              <div className="xl:w-80 xl:sticky xl:top-8 xl:self-start">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Premium Summary</h3>
                  {selectedPlans.plan ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">{selectedPlans.coverType}</span>
                        <span className="font-medium text-gray-900 text-sm">{selectedPlans.plan.split(" - ")[1]}</span>
                      </div>

                      {selectedPlans.passengerLegalLiability && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-600">Passenger Legal Liability</span>
                          <span className="font-medium text-gray-900 text-sm">KES 5,000</span>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Premium</span>
                        <span className="font-bold text-lg text-blue-600">KES {getTotalPrice().toLocaleString()}</span>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        Premium includes all statutory charges and taxes. Payment can be made annually or in
                        installments.
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
                        <Car size={20} className="text-gray-400" />
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
      <div className="w-full h-full bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Get Your Motor Quote</h1>
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
                <h2 className="text-xl font-medium text-gray-900 mb-6">Personal & Vehicle Information</h2>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Vehicle Make <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Car size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.vehicleMake}
                        onChange={(e) => handleInputChange("vehicleMake", e.target.value)}
                        onFocus={() => setFocusedField("vehicleMake")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "vehicleMake"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="e.g., Toyota, Nissan"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Vehicle Model <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Car size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.vehicleModel}
                        onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                        onFocus={() => setFocusedField("vehicleModel")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "vehicleModel"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="e.g., Hilux, Navara"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Year of Manufacture <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="number"
                        min="1990"
                        max="2024"
                        value={formData.yearOfManufacture}
                        onChange={(e) => handleInputChange("yearOfManufacture", e.target.value)}
                        onFocus={() => setFocusedField("yearOfManufacture")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "yearOfManufacture"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="e.g., 2020"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Vehicle Value (KES) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={formData.vehicleValue}
                        onChange={(e) => handleInputChange("vehicleValue", e.target.value)}
                        onFocus={() => setFocusedField("vehicleValue")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "vehicleValue"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="e.g., 2500000"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Vehicle Body Type</label>
                    <div className="relative">
                      <Car size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={formData.vehicleBodyType}
                        onChange={(e) => handleInputChange("vehicleBodyType", e.target.value)}
                        onFocus={() => setFocusedField("vehicleBodyType")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-12 bg-gray-50 border-2 rounded-full transition-all duration-200 text-gray-900 appearance-none ${
                          focusedField === "vehicleBodyType"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <option value="">Select body type</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Van">Van</option>
                        <option value="Truck">Truck</option>
                        <option value="Bus">Bus</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">Vehicle Tonnage</label>
                    <div className="relative">
                      <Truck size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.vehicleTonnage}
                        onChange={(e) => handleInputChange("vehicleTonnage", e.target.value)}
                        onFocus={() => setFocusedField("vehicleTonnage")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "vehicleTonnage"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="e.g., 3.5 tons"
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
                  {productInfo.icon || <Car size={32} className="text-white" />}
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

export default MotorCommercialForm
