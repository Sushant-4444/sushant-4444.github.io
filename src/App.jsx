"use client"

import { useState } from "react"
import "./App.css"
import PortfolioHero from "./Components/Page"
import AboutMe from "./Components/About"
import Resume from "./Components/Resume"
import Projects from "./Components/Projects"
import Contact from "./Components/Contact"
import Footer from "./Components/Footer"
import NavigationSidebar from "./Components/NavigationSideBar"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <PortfolioHero onToggleSidebar={toggleSidebar} />
      <div id="about">
        <AboutMe />
      </div>
      <div id="resume">
        <Resume />
      </div>
      <div id="portfolio">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />

      {/* Navigation Sidebar */}
      <NavigationSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  )
}

export default App
