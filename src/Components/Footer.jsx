"use client"

import { useState, useEffect, useRef } from "react"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

const SocialIcon = ({ icon: Icon, href, label, delay = 0 }) => {
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
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-75"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`relative group block w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
          isHovered ? "shadow-lg shadow-purple-500/30" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background with gradient */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isHovered
              ? "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600"
              : "bg-gradient-to-br from-purple-500 to-purple-600"
          }`}
        ></div>

        {/* Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Icon
            className={`w-5 h-5 text-white transition-all duration-300 ${
              isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
            }`}
          />
        </div>

        {/* Hover glow effect */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isHovered ? "bg-white/20 scale-110" : "bg-transparent scale-100"
          }`}
        ></div>

        {/* Ripple effect on hover */}
        {isHovered && <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>}
      </a>
    </div>
  )
}

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef(null)

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="bg-gray-50 border-t border-gray-200 py-8 px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright Text */}
          <div
            className={`transform transition-all duration-800 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
              Copyright ©{" "}
              <span className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-300 cursor-pointer">
                Sushant Arora
              </span>{" "}
              all rights reserved.
               {/* Powered by{" "} */}
              {/* <span className="text-purple-600 font-medium hover:text-purple-700 transition-colors duration-300 cursor-pointer">
                Brog
              </span> */}
              {/* . */}
            </p>
          </div>

          {/* Social Media Icons */}
          <div
            className={`transform transition-all duration-800 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animated divider line */}
        <div className="mt-8 pt-6 border-t border-gray-200 relative">
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
              isVisible ? "w-24 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>

          {/* Additional footer content */}
          <div
            className={`text-center transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-xs text-gray-500">
              Made with{" "}
              <span className="text-red-500 animate-pulse inline-block hover:scale-125 transition-transform duration-300">
                ❤️
              </span>{" "}
              for amazing experiences
            </p>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      {isVisible && (
        <>
          <div className="absolute top-4 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-float"></div>
          <div
            className="absolute top-8 right-20 w-1.5 h-1.5 bg-purple-300/40 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-6 left-1/4 w-1 h-1 bg-purple-500/20 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </>
      )}
    </footer>
  )
}

export default Footer
