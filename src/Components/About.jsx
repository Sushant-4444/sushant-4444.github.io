"use client"

import { useState, useEffect, useRef } from "react"

const CircularProgress = ({ percentage, color = "coral", skill, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const elementRef = useRef(null)

  const radius = 45
  const strokeWidth = 8
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference

  const colorClasses = {
    coral: "stroke-coral-500",
    purple: "stroke-purple-500",
  }

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

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        let current = 0
        const increment = percentage / 60 // 60 frames for smooth animation
        const animate = () => {
          current += increment
          if (current <= percentage) {
            setAnimatedPercentage(Math.round(current))
            requestAnimationFrame(animate)
          } else {
            setAnimatedPercentage(percentage)
          }
        }
        animate()
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage])

  return (
    <div
      ref={elementRef}
      className={`bg-gray-100 rounded-2xl p-6 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-lg hover:bg-gray-50 cursor-pointer group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-300">
          <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="currentColor"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className={`${colorClasses[color]} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-xl font-bold transition-all duration-300 group-hover:scale-110 ${color === "coral" ? "text-coral-500" : "text-purple-500"}`}
            >
              {animatedPercentage}%
            </span>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
        {skill}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-500 transition-colors duration-300">
        {description}
      </p>
    </div>
  )
}

const PersonalInfoItem = ({ label, value, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
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
      { threshold: 0.5 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`flex items-start transform transition-all duration-600 hover:translate-x-2 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg cursor-pointer ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-24 flex-shrink-0">
        <span className="text-gray-900 font-medium">{label}</span>
      </div>
      <div className="flex-shrink-0 mx-4">
        <span className="text-gray-600">:</span>
      </div>
      <div className="flex-1">
        <span className="text-gray-700">{value}</span>
      </div>
    </div>
  )
}

const AboutMe = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const titleRef = useRef(null)
  const textRef = useRef(null)

  const skills = [
    {
      skill: "MERN Stack",
      percentage: 87,
      color: "coral",
      description: "Full-stack web development using MongoDB, Express.js, React.js, and Node.js",
    },
    {
      skill: "Java",
      percentage: 80,
      color: "coral",
      description: "Strong foundation in backend logic and object-oriented programming.",
    },
    {
      skill: "Python",
      percentage: 95,
      color: "purple",
      description: "Scripting, automation, and quick tool development",
    },
    {
      skill: "Automation Scripts",
      percentage: 70,
      color: "coral",
      description: "Using Python and Node to simplify repetitive tasks and workflows",
    },
  ]

  const personalInfo = [
    { label: "Full Name", value: "Sushant Arora" },
    { label: "Age", value: "19 Years" },
    { label: "Language", value: "English, Hindi, Punjabi" },
    { label: "Phone No", value: "+91 9518615117" },
    { label: "Email", value: "arorasushant4444@gmail.com" },
    { label: "Address", value: "IIIT Delhi, -Okhala Phase 3 , 110020, Delhi, India." },
  ]

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    const textObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setTextVisible(true)
          }, 300)
        }
      },
      { threshold: 0.3 },
    )

    if (titleRef.current) titleObserver.observe(titleRef.current)
    if (textRef.current) textObserver.observe(textRef.current)

    return () => {
      titleObserver.disconnect()
      textObserver.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-16">

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with entrance animation */}
        <div ref={titleRef} className="text-center mb-16">
          <h1
            className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-4 transform transition-all duration-800 ${
              titleVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            About{" "}
            <span className="text-coral-500 inline-block hover:scale-110 transition-transform duration-300 cursor-pointer">
              Me
            </span>
          </h1>
          <p
            className={`text-xl text-gray-700 font-medium transform transition-all duration-800 delay-200 ${
              titleVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Every bug fixed is a story told better.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Skills with staggered animations */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <CircularProgress
                  key={index}
                  percentage={skill.percentage}
                  color={skill.color}
                  skill={skill.skill}
                  description={skill.description}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>

          {/* Right side - About text and personal info */}
          <div ref={textRef} className="space-y-8">
            {/* About text with fade-in animation */}
            <div className="space-y-6">
              <p
                className={`text-gray-700 leading-relaxed transform transition-all duration-700 ${
                  textVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                I’m {" "}
                <span className="font-semibold text-coral-500 hover:text-coral-600 transition-colors duration-300">
                  Sushant Arora
                </span>{" "}
, a 3rd-year student at IIIT-Delhi, pursuing Electronics and VLSI Engineering (EVE). I’m a full-stack developer with real-world experience in React, Express, JavaScript, Java, and Python. I’ve built projects across both frontend and backend, and I also write automation scripts to simplify repetitive tasks.


              </p>
              <p
                className={`text-gray-700 leading-relaxed transform transition-all duration-700 delay-200 ${
                  textVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                As an active member of CyFuse, I’ve led development teams and helped organize major tech events like TechSpectra and EPOCH. I love using code to turn ideas into impactful solutions.
              </p>
            </div>

            {/* Personal information with staggered slide-in */}
            <div className="space-y-4">
              {personalInfo.map((info, index) => (
                <PersonalInfoItem key={index} label={info.label} value={info.value} delay={index * 100 + 400} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
