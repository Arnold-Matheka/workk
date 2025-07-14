"use client"

import type React from "react"
import { useState } from "react"
import { X, Calendar, User, Phone, Mail, ArrowLeft, Download, Car } from "lucide-react"

export interface PrivateMotorFormData {
  fullName: string
  phoneNumber: string
  emailAddress: string
  vehicleMake: string
  vehicleModel: string
  yearOfManufacture: string
  vehicleValue: string
}

export interface PrivateMotorSelectedPlans {
  coverType: string
  addOns: { [key: string]: boolean }
}

export interface PrivateMotorProductInfo {
  name: string
  description: string
  benefits: string[]
  icon?: React.ReactNode
}

export interface PrivateMotorFormProps {
  productInfo: PrivateMotorProductInfo
  onClose?: () => void
  onSubmit?: (formData: PrivateMotorFormData, selectedPlans: PrivateMotorSelectedPlans) => void
  className?: string
  quotationNumber?: string
  coverName?: string
}

const addOnOptions = [
  { name: "Courtesy Car (after 3 days)", limit: "Up to KES 30,000", price: 3000 },
  { name: "ATM Withdrawal after Carjacking", limit: "Up to KES 40,000", price: 4000 },
  { name: "Theft of Accessories", limit: "Up to KES 15,000", price: 1500 },
  { name: "Loss of Key", limit: "Up to KES 20,000", price: 2000 },
  { name: "Theft/Loss of Spare Wheel", limit: "Up to KES 30,000", price: 3000 },
  { name: "Out-of-Station Accommodation", limit: "Up to KES 20,000", price: 2000 },
  { name: "Personal Effects", limit: "Up to KES 20,000", price: 2000 },
  { name: "Additional Windscreen Cover", limit: "Add KES 10,000", price: 1000 },
  { name: "Additional Entertainment Cover", limit: "Add KES 10,000", price: 1000 },
  { name: "Additional Towing Cover", limit: "Add KES 10,000", price: 1000 },
]

const standardBenefits = [
  "Excess Protector (own damage)",
  "Political Violence & Terrorism cover",
  "Windscreen – up to KES 50,000",
  "Car Entertainment System – up to KES 50,000",
  "Towing / Recovery – up to KES 50,000",
  "Emergency Medical Expenses – up to KES 50,000",
]

const PrivateMotorForm: React.FC<PrivateMotorFormProps> = ({
  productInfo = { name: "Private Motor Insurance", description: "", benefits: [] },
  onClose,
  onSubmit,
  className = "",
  quotationNumber = "CICKE/02/07/2/QUT-500247",
  coverName = "CIC Private Motor",
}) => {
  const [formData, setFormData] = useState<PrivateMotorFormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    vehicleMake: "",
    vehicleModel: "",
    yearOfManufacture: "",
    vehicleValue: "",
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showQuotes, setShowQuotes] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState<PrivateMotorSelectedPlans>({
    coverType: "",
    addOns: {},
  })

  const handleInputChange = (field: keyof PrivateMotorFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCoverTypeSelection = (coverType: string) => {
    setSelectedPlans((prev) => ({
      ...prev,
      coverType,
    }))
  }

  const handleAddOnToggle = (addOnName: string) => {
    setSelectedPlans((prev) => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [addOnName]: !prev.addOns[addOnName],
      },
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

    const currentYear = new Date().getFullYear()
    const vehicleAge = currentYear - Number.parseInt(formData.yearOfManufacture)
    const vehicleValue = Number.parseInt(formData.vehicleValue.replace(/[^\d]/g, ""))

    if (vehicleAge > 15) {
      alert("Vehicle must be under 15 years old for comprehensive coverage.")
      return
    }

    if (vehicleValue < 500000) {
      alert("Minimum insured value is KES 500,000 for comprehensive coverage.")
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
    })

    setSelectedPlans({
      coverType: "",
      addOns: {},
    })

    setShowQuotes(false)
    setFocusedField(null)
    onClose?.()
  }

  const handleFinalSubmit = () => {
    onSubmit?.(formData, selectedPlans)
  }

  const calculatePremium = () => {
    const vehicleValue = Number.parseInt(formData.vehicleValue.replace(/[^\d]/g, ""))
    let basePremium = 0

    if (selectedPlans.coverType === "Comprehensive") {
      if (vehicleValue <= 1500000) {
        basePremium = Math.max(vehicleValue * 0.06, 37500)
      } else if (vehicleValue <= 2500000) {
        basePremium = Math.max(vehicleValue * 0.04, 37500)
      } else {
        basePremium = Math.max(vehicleValue * 0.03, 37500)
      }
    } else if (selectedPlans.coverType === "Third Party Only") {
      basePremium = 7500
    } else if (selectedPlans.coverType === "Third Party Fire & Theft") {
      basePremium = 15000 // Estimated between TPO and Comprehensive
    }

    // Add selected add-ons
    const addOnCost = Object.keys(selectedPlans.addOns)
      .filter((key) => selectedPlans.addOns[key])
      .reduce((total, addOnName) => {
        const addOn = addOnOptions.find((option) => option.name === addOnName)
        return total + (addOn?.price || 0)
      }, 0)

    return basePremium + addOnCost
  }

  const getMonthlyPayment = () => {
    const totalPremium = calculatePremium()
    const upfront = totalPremium * 0.2
    const remaining = totalPremium - upfront
    return remaining / 12
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
                <p className="text-sm text-gray-500 mt-1">Select the perfect coverage for your private vehicle</p>
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
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Vehicle</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.vehicleMake} {formData.vehicleModel}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Value</p>
                  <p className="text-sm font-medium text-gray-900">
                    KES {Number.parseInt(formData.vehicleValue.replace(/[^\d]/g, "")).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="px-8 pb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extralight text-gray-900 mb-3 tracking-tight">Choose Your Coverage</h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Select from our comprehensive private motor insurance plans
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
              {/* Plans Section */}
              <div className="flex-1 space-y-12">
                {/* Cover Type Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Coverage Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <button
                      onClick={() => handleCoverTypeSelection("Comprehensive")}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedPlans.coverType === "Comprehensive"
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Comprehensive</h4>
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
                      <p className="text-gray-600 text-sm mb-3">
                        Full coverage including own damage, theft, fire, and third party
                      </p>
                      <p className="text-lg font-bold text-blue-600">
                        {formData.vehicleValue ? `KES ${calculatePremium().toLocaleString()}` : "Enter vehicle value"}
                      </p>
                    </button>

                    <button
                      onClick={() => handleCoverTypeSelection("Third Party Fire & Theft")}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedPlans.coverType === "Third Party Fire & Theft"
                          ? "border-green-500 bg-green-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">TPFT</h4>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedPlans.coverType === "Third Party Fire & Theft"
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPlans.coverType === "Third Party Fire & Theft" && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-1"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">Third party liability plus fire and theft coverage</p>
                      <p className="text-lg font-bold text-green-600">KES 15,000</p>
                    </button>

                    <button
                      onClick={() => handleCoverTypeSelection("Third Party Only")}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedPlans.coverType === "Third Party Only"
                          ? "border-orange-500 bg-orange-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">TPO</h4>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedPlans.coverType === "Third Party Only"
                              ? "border-orange-500 bg-orange-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedPlans.coverType === "Third Party Only" && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-1"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">Basic third party liability coverage only</p>
                      <p className="text-lg font-bold text-orange-600">KES 7,500</p>
                    </button>
                  </div>
                </div>

                {/* Standard Benefits */}
                {selectedPlans.coverType && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Standard Benefits Included (No Extra Cost)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {standardBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Add-Ons */}
                {selectedPlans.coverType && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Optional Add-On Covers</h4>
                    <p className="text-sm text-gray-600 mb-6">Enhance your plan with these additional benefits:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addOnOptions.map((addOn, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 text-sm">{addOn.name}</h5>
                            <p className="text-xs text-gray-600">{addOn.limit}</p>
                            <p className="text-sm font-medium text-blue-600">+KES {addOn.price.toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => handleAddOnToggle(addOn.name)}
                            className={`w-10 h-6 rounded-full transition-all duration-300 ${
                              selectedPlans.addOns[addOn.name] ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                                selectedPlans.addOns[addOn.name] ? "translate-x-5" : "translate-x-0.5"
                              }`}
                            ></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Premium Summary Sidebar */}
              <div className="xl:w-80 xl:sticky xl:top-8 xl:self-start">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Premium Summary</h3>
                  {selectedPlans.coverType ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">{selectedPlans.coverType}</span>
                        <span className="font-medium text-gray-900 text-sm">
                          KES{" "}
                          {(
                            calculatePremium() -
                            Object.keys(selectedPlans.addOns)
                              .filter((key) => selectedPlans.addOns[key])
                              .reduce((total, addOnName) => {
                                const addOn = addOnOptions.find((option) => option.name === addOnName)
                                return total + (addOn?.price || 0)
                              }, 0)
                          ).toLocaleString()}
                        </span>
                      </div>

                      {Object.keys(selectedPlans.addOns)
                        .filter((key) => selectedPlans.addOns[key])
                        .map((addOnName) => {
                          const addOn = addOnOptions.find((option) => option.name === addOnName)
                          return (
                            <div
                              key={addOnName}
                              className="flex justify-between items-center py-2 border-b border-gray-100"
                            >
                              <span className="text-sm text-gray-600">{addOnName}</span>
                              <span className="font-medium text-gray-900 text-sm">
                                KES {addOn?.price.toLocaleString()}
                              </span>
                            </div>
                          )
                        })}

                      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Premium</span>
                        <span className="font-bold text-lg text-blue-600">
                          KES {calculatePremium().toLocaleString()}
                        </span>
                      </div>

                      {selectedPlans.coverType === "Comprehensive" && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 text-sm mb-2">Payment Options</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Upfront (20%):</span>
                              <span className="font-medium">KES {(calculatePremium() * 0.2).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Monthly (12 months):</span>
                              <span className="font-medium">KES {getMonthlyPayment().toLocaleString()}/month</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 leading-relaxed">
                        Premium includes all statutory charges and taxes. Payment can be made annually or in
                        installments for comprehensive cover.
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
                      <p className="text-sm text-gray-600">Select a coverage type to view your premium summary</p>
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
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Get Your Private Motor Quote</h1>
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
                        placeholder="e.g., Toyota, Nissan, BMW"
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
                        placeholder="e.g., Camry, X-Trail, 3 Series"
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
                        min="2009"
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
                        min="500000"
                        value={formData.vehicleValue}
                        onChange={(e) => handleInputChange("vehicleValue", e.target.value)}
                        onFocus={() => setFocusedField("vehicleValue")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-full transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                          focusedField === "vehicleValue"
                            ? "border-blue-500 bg-white shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        placeholder="e.g., 1500000"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 text-sm mb-2">Eligibility Requirements</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Vehicle must be under 15 years old for comprehensive coverage</li>
                    <li>• Minimum insured value of KES 500,000</li>
                    <li>• Vehicle must be roadworthy and privately owned</li>
                    <li>• Good claims history required</li>
                  </ul>
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

export default PrivateMotorForm
