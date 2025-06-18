"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Globe, Phone, MapPin, Send, CheckCircle } from "lucide-react"

const ContactCard = ({ icon: Icon, title, children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.3 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transform transition-all duration-700 cursor-pointer group ${
        isVisible ? "translate-y-0 opacity-100 rotate-0" : "translate-y-12 opacity-0 -rotate-3"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transformOrigin: "center bottom",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Animated Icon Container */}
        <div
          className={`relative transition-all duration-500 ${isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"}`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isHovered ? "bg-coral-500 shadow-lg shadow-coral-500/30" : "bg-coral-100"
            }`}
          >
            <Icon
              className={`w-6 h-6 transition-all duration-500 ${isHovered ? "text-white scale-110" : "text-coral-500"}`}
            />
          </div>

          {/* Floating particles effect */}
          {isHovered && (
            <>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-coral-400 rounded-full animate-ping"></div>
              <div
                className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-1/2 -right-2 w-1 h-1 bg-coral-300 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h3
            className={`text-lg font-semibold transition-all duration-300 ${
              isHovered ? "text-coral-600 translate-x-1" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <div className={`space-y-1 transition-all duration-300 ${isHovered ? "translate-x-2" : "translate-x-0"}`}>
            {children}
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
          isHovered ? "bg-gradient-to-br from-coral-500/5 via-purple-500/5 to-coral-500/5" : "bg-transparent"
        }`}
      ></div>
    </div>
  )
}

const FormField = ({ label, type = "text", placeholder, value, onChange, delay = 0, isTextarea = false }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.3 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const InputComponent = isTextarea ? "textarea" : "input"

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative group">
        <InputComponent
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={isTextarea ? 4 : undefined}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl transition-all duration-300 focus:outline-none resize-none ${
            isFocused
              ? "border-coral-500 shadow-lg shadow-coral-500/20 scale-105"
              : "border-gray-200 hover:border-gray-300"
          } ${isTextarea ? "min-h-[120px]" : ""}`}
        />

        {/* Animated border effect */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
            isFocused ? "bg-gradient-to-r from-coral-500/10 via-purple-500/10 to-coral-500/10" : "bg-transparent"
          }`}
        ></div>

        {/* Floating label effect */}
        {isFocused && (
          <div className="absolute -top-2 left-3 px-2 bg-white text-xs text-coral-500 font-medium animate-bounce-gentle">
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

const Contact = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const titleRef = useRef(null)

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after success animation
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      })
    }, 3000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (titleRef.current) {
      observer.observe(titleRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-coral-200/20 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-200/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-coral-300/20 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-20 h-20 bg-purple-300/20 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>


      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header with typewriter effect */}
        <div ref={titleRef} className="text-center mb-16 px-4">
          <h1
            className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-8 transform transition-all duration-1000 ${
              titleVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-95"
            }`}
          >
            Get in{" "}
            <span className="text-coral-500 inline-block hover:scale-110 transition-transform duration-300 cursor-pointer relative">
              Touch
              {titleVisible && (
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-coral-500 to-purple-500 rounded-full animate-pulse"></div>
              )}
            </span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-6">
            <ContactCard icon={Mail} title="Mail & Website" delay={200}>
              <div className="flex items-center gap-2 text-gray-600 hover:text-coral-500 transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">arorasushant4444@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors duration-300">
                <Globe className="w-4 h-4" />
                <span className="text-sm">sushant-4444.github.io</span>
              </div>
            </ContactCard>

            <ContactCard icon={Phone} title="Contact" delay={400}>
              <div className="flex items-center gap-2 text-gray-600 hover:text-coral-500 transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(+91)-9518615117</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 hover:text-coral-500 transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(+91)-9518615117</span>
              </div>
            </ContactCard>

            <ContactCard icon={MapPin} title="Address" delay={600}>
              <div className="flex items-start gap-2 text-gray-600 hover:text-coral-500 transition-colors duration-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">
                  IIIT Delhi, -Okhala Phase 3 , 110020, Delhi, India.
                </span>
              </div>
            </ContactCard>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 relative overflow-hidden">
            {/* Success overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-green-50 flex items-center justify-center z-20 animate-fadeIn">
                <div className="text-center animate-scaleIn">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-green-600">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Full Name"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange("fullName")}
                delay={300}
              />

              <FormField
                label="Email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                delay={450}
              />

              <FormField
                label="Phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                delay={600}
              />

              <FormField
                label="Message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange("message")}
                delay={750}
                isTextarea={true}
              />

              {/* Submit Button */}
              <div className="transform transition-all duration-700 delay-900 translate-y-0 opacity-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative overflow-hidden bg-gradient-to-r from-coral-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-coral-500/30 disabled:opacity-70 disabled:cursor-not-allowed ${
                    isSubmitting ? "animate-pulse" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 relative z-10">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Submit</span>
                      </>
                    )}
                  </div>

                  {/* Button hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-coral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
