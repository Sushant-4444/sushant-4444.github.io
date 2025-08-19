"use client"

import { ChevronDown, Settings } from "lucide-react"

const PortfolioHero = ({ onToggleSidebar }) => {
  return (
    <div id="home" className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="fixed z-50 top-8 right-8 animate-pulse">
        <button
          onClick={onToggleSidebar}
          className="w-16 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2"
        >
          <div className="grid grid-cols-2 gap-1">
            <div
              className="w-2 h-2 bg-coral-400 rounded-full group-hover:animate-ping"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-coral-400 rounded-full group-hover:animate-ping"
              style={{ animationDelay: "200ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-coral-400 rounded-full group-hover:animate-ping"
              style={{ animationDelay: "400ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-coral-400 rounded-full group-hover:animate-ping"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>
        </button>
      </div>

      <div className="fixed z-50 bottom-8 right-8">
        <Settings className="w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer hover:rotate-90 transform transition-transform" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left content */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left lg:pr-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">MySelf,</h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-coral-500">Sushant Arora</h2>
            </div>

            <p className="text-gray-600 max-w-sm mx-auto lg:mx-0 leading-relaxed">
              I’m a passionate developer who loves turning ideas into reality through code. Whether it’s building web apps, working on tech projects with my club, or diving into backend systems—I'm always up for a challenge.

Let’s build something awesome together.
            </p>

            <button
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-2 rounded-full transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
              onClick={() => {
                const link = document.getElementById('hidden-cv-link');
                if (link) link.click();
              }}
            >
              Download Resume
            </button>
            <a
              href="/Resume.pdf"
              download
              style={{ display: 'none' }}
              id="hidden-cv-link"
            >
              Download
            </a>
          </div>

          {/* Center image */}
          <div className="lg:col-span-4 flex justify-center px-4 lg:px-8">
            <div
              className="relative group cursor-pointer"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateX = (y - centerY) / 10
                const rotateY = (centerX - x) / 10

                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
              }}
            >
              <div className="w-72 lg:w-80 h-80 lg:h-96 bg-gray-300 rounded-2xl overflow-hidden transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:shadow-coral-500/20">
                <img
                  src="/Image.png"
                  alt="Sushant Arora - Professional headshot"
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-coral-500/0 via-purple-600/0 to-coral-500/0 group-hover:from-coral-500/10 group-hover:via-purple-600/5 group-hover:to-coral-500/10 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-4 text-center lg:text-left lg:pl-8">
            <div className="space-y-2">
              <p className="text-2xl lg:text-3xl text-gray-900">I am an</p>
              <div className="relative inline-block">
                <p className="text-2xl lg:text-3xl text-purple-600 font-medium">Engineer</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div
          className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:border-gray-600 transition-colors"
          onClick={() => {
            const aboutSection = document.querySelector("#about")
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}

export default PortfolioHero
