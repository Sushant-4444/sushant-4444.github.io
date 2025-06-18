"use client"

import { useState, useEffect, useRef } from "react"
import {  Laptop, Bot, Globe, CalendarClock } from "lucide-react"

const ResumeCard = ({ children, delay = 0 }) => {
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
      className={`bg-white rounded-2xl p-8 mt-6 shadow-sm border border-gray-200 transform transition-all duration-700 hover:shadow-lg hover:scale-105 hover:-translate-y-2 cursor-pointer group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }) => {
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
      className={`perspective-1000 transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flip-card w-full h-80 cursor-pointer">
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front bg-white shadow-lg border border-gray-100 p-8 text-center flex flex-col justify-center items-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-coral-100 rounded-2xl flex items-center justify-center transition-colors duration-300 icon-3d">
                <Icon className="w-8 h-8 text-coral-500 transition-colors duration-300" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 text-3d-title">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed transition-colors duration-300 text-3d-description">
              {description}
            </p>
          </div>

          {/* Back Side */}
          <div className="flip-card-back bg-coral-500 shadow-xl p-8 text-center flex flex-col justify-center items-center text-white">
            <div className="mb-6 icon-3d">
              <Icon className="w-12 h-12 text-white opacity-90" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white text-3d-title">{title}</h3>
            <p className="text-white/90 leading-relaxed mb-6 text-sm text-3d-description">{description}</p>
            <button className="border-2 border-white text-white hover:bg-white hover:text-coral-500 px-6 py-2 rounded-full transition-all duration-300 font-medium transform hover:scale-105 button-3d">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Resume = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const titleRef = useRef(null)

  const educationData = [
    {
      date: "2023 - Present",
      title: "B.Tech In Electronics and VLSI Design",
      subtitle: "IIIT Delhi",
      description:
        "Currently pursuing my bachelor's degree with a focus on electronics, digital systems, and VLSI design. Alongside core courses, I actively explore full-stack development, automation, and software projects.",
    },
  {
  date: "2022 - 2023",
  title: "Class 12th (Non-Medical, CBSE)",
  subtitle: "Sant Gyaneshwar Model School, Delhi - 92.2%",
  description:
    "Completed my senior secondary education with a focus on Physics, Chemistry, and Mathematics. Built a strong academic foundation and started exploring programming and tech through self-learning.",
},
    {
     date: "2020 – 2021",
  title: "Class 10th (CBSE)",
  subtitle: "Ram Prasad D.A.V Public School, Shahbad Markanda, Haryana - 95%",
  description:
    "Completed my secondary education under the CBSE board. Developed strong fundamentals in science and mathematics while actively participating in school-level activities and competitions.",
    },
  ]

  const experienceData = [
   {
  date: "JANUARY 2025 – PRESENT",
  title: "TAP & Draw Pvt. Ltd.",
  subtitle: "Solo Developer | Guide: Vipul Mishra",
  description:
    "Working independently to build a full-fledged E-commerce website with features like product listings, cart management, and secure checkout.",
},
{
  date: "JULY 2024 – NOVEMBER 2024",
  title: "NAVSRUJAN INNOTECH FOUNDATION (Industrial Internship)",
  subtitle: "Full-Stack Developer | Guide: Aabhas Agarwal | Team Size: 4",
  description:
    "Contributed to the development of a Django-based web application for managing coaching centers. Focused on streamlining student performance tracking and daily operations.",
},
{
  date: "MARCH 2024 – PRESENT",
  title: "CyFuse, IIIT-Delhi",
  subtitle: "Web Developer",
  description:
    "Actively involved in developing and maintaining the official CyFuse club website. Worked on frontend improvements, event pages, and content update systems.",
}
  ]

  const services = [
    {
    icon: Laptop,
    title: "Web Development",
    description:
      "From frontend to backend – complete full-stack solutions built for speed and scalability.",
  },
  {
    icon: Bot,
    title: "Automation Scripts",
    description:
      "Automating daily tasks with Selenium – efficient, accurate, and hands-free.",
  },
  {
    icon: Globe ,
    title: "Web Scraping",
    description:
      "Extracting data from the web in structured formats for analysis and use.",
  },
  {
    icon: CalendarClock,
    title: "Event Management",
    description:
      "Organizing and managing events with smooth coordination and great experiences.",
  },
  ]

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

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20 px-4">
          <h1
            className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-8 transform transition-all duration-800 ${
              titleVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            My{" "}
            <span className="text-coral-500 inline-block hover:scale-110 transition-transform duration-300 cursor-pointer">
              Resume
            </span>
          </h1>
        </div>

        {/* Education and Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 px-4">
          {/* Education Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center px-4">Education</h2>
            <div className="space-y-8">
              {educationData.map((item, index) => (
                <ResumeCard key={index} delay={index * 200}>
                  <div className="relative">
                    <div className="absolute -top-4 left-6">
                      <div className="bg-gray-300 text-gray-700 text-xs font-medium px-4 py-2 rounded-full shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                        {item.date}
                      </div>
                    </div>
                    <div className="pt-8 space-y-3">
                      <h3 className="text-xl font-semibold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-600 font-medium">- {item.subtitle}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ResumeCard>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center px-4">Experience</h2>
            <div className="space-y-8">
              {experienceData.map((item, index) => (
                <ResumeCard key={index} delay={index * 200 + 100}>
                  <div className="relative">
                    <div className="absolute -top-4 left-6">
                      <div
                        className={`text-xs font-medium px-4 py-2 rounded-full shadow-sm transition-all duration-300 transform group-hover:scale-105 ${
                          item.highlight
                            ? "bg-purple-500 text-white group-hover:bg-purple-600"
                            : "bg-gray-300 text-gray-700 group-hover:bg-purple-500 group-hover:text-white"
                        }`}
                      >
                        {item.date}
                      </div>
                    </div>
                    <div className="pt-8 space-y-3">
                      <h3 className="text-xl font-semibold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-600 font-medium">- {item.subtitle}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ResumeCard>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resume
