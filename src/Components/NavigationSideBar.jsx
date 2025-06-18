"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const NavigationSidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState("Home")

  const navigationItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Resume", href: "#resume" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ]

  const handleItemClick = (itemName, href) => {
    setActiveItem(itemName)
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setTimeout(() => onClose(), 300)
    }
  }

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Track scroll position to update active item
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => ({
        name: item.name,
        element: document.querySelector(item.href),
      }))

      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveItem(section.name)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Backdrop Overlay - Made non-blocking for scrolling */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-all duration-500 pointer-events-none ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Clickable backdrop area (only on the left side) */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
        style={{ right: isOpen ? "320px" : "0" }} // Exclude sidebar width from clickable area
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 z-50 transform transition-all duration-500 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-coral-500 hover:bg-coral-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90 group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>

        {/* Navigation Menu */}
        <div className="pt-20 px-8 h-full overflow-y-auto">
          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <div
                key={item.name}
                className={`transform transition-all duration-700 ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleItemClick(item.name, item.href)
                  }}
                  className={`group flex items-center gap-4 py-4 px-6 rounded-xl transition-all duration-300 hover:bg-gray-800/50 cursor-pointer focus:outline-none focus:bg-gray-800/70 ${
                    activeItem === item.name ? "bg-gray-800/70" : ""
                  }`}
                >
                  {/* Active Indicator */}
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeItem === item.name
                        ? "bg-white scale-100"
                        : "bg-gray-600 scale-75 group-hover:bg-gray-400 group-hover:scale-90"
                    }`}
                  />

                  {/* Menu Item Text */}
                  <span
                    className={`text-lg font-medium transition-all duration-300 ${
                      activeItem === item.name
                        ? "text-coral-500 translate-x-1"
                        : "text-white group-hover:text-coral-400 group-hover:translate-x-1"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Hover Effect Line */}
                  <div
                    className={`ml-auto w-0 h-0.5 bg-coral-500 transition-all duration-300 ${
                      activeItem === item.name ? "w-6" : "group-hover:w-4"
                    }`}
                  />
                </a>
              </div>
            ))}
          </nav>

          {/* Decorative Elements */}
          <div className="mt-16 space-y-4 pb-8">
            <div
              className={`w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent transition-all duration-1000 ${
                isOpen ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            />

            <div
              className={`text-center text-gray-500 text-sm transition-all duration-700 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <p>Portfolio 2024</p>
              <p className="text-xs mt-1">Made with ❤️</p>
            </div>
          </div>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-20 right-10 w-32 h-32 bg-coral-500/5 rounded-full transition-all duration-1000 ${
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          />
          <div
            className={`absolute bottom-32 left-8 w-24 h-24 bg-purple-500/5 rounded-full transition-all duration-1000 ${
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          />
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-coral-400/5 rounded-full transition-all duration-1000 ${
              isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ transitionDelay: "1200ms" }}
          />
        </div>
      </div>
    </>
  )
}

export default NavigationSidebar
