"use client"

import { useState, useEffect, useRef } from "react"
import { X, ExternalLink, Calendar, User, Code, Tag, Globe } from "lucide-react"

const ProjectCard = ({ project, delay = 0, onClick }) => {
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
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transform transition-all duration-700 hover:shadow-lg hover:scale-105 hover:-translate-y-2 cursor-pointer group ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onClick(project)}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-purple-500 font-medium">{project.category}</p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {project.description}{" "}
            <span className="text-purple-500 hover:text-purple-600 cursor-pointer transition-colors duration-300">
              Read more
            </span>
          </p>

          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>Date: {project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>Client: {project.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-3 h-3" />
              <span>Tech: {project.tech}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-3 h-3" />
              <span>Type: {project.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span className="text-purple-500">URL: {project.url}</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-32 h-24 lg:h-32 bg-gray-100 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
            <p className="text-purple-500 font-medium">{project.category}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Image */}
          <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Date: {project.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Client: {project.client}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Tech: {project.tech}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Type: {project.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-1"
                  >
                    {project.url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-600 leading-relaxed">{project.fullDescription}</p>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Key Features:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {project.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <a
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full transition-colors duration-300 flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Project
            </a>
            <button
              onClick={onClose}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-full transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const titleRef = useRef(null)

  const filters = ["ALL", "DESIGN", "DEVELOPMENT", "GRAPHICS", "TEMPLATES"]

  const projects = [
    // {
    //   id: 1,
    //   title: "BonzaMart - Super market",
    //   category: "3D Graphics | Templates",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard ever since the 1500s.",
    //   fullDescription:
    //     "BonzaMart is a comprehensive e-commerce platform designed for supermarket chains. The project involved creating a modern, user-friendly interface with advanced inventory management and customer engagement features.",
    //   date: "1 Jan - 2023",
    //   client: "Symphony",
    //   tech: "Angular, NodeJS, Ios",
    //   type: "eCommerce",
    //   url: "www.your-project-url.com",
    //   image: "/placeholder.svg?height=200&width=300",
    //   filterCategory: "DEVELOPMENT",
    //   features: [
    //     "Responsive design for all devices",
    //     "Advanced search and filtering",
    //     "Real-time inventory tracking",
    //     "Secure payment integration",
    //     "Customer loyalty program",
    //   ],
    // },
    // {
    //   id: 2,
    //   title: "ShowMania - Entertainment",
    //   category: "Web Design",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard ever since the 1500s.",
    //   fullDescription:
    //     "ShowMania is an entertainment platform that brings together movies, TV shows, and live events in one comprehensive streaming service.",
    //   date: "15 Mar - 2022",
    //   client: "Martin Wilson",
    //   tech: "React, NodeJS, Android",
    //   type: "Entertainment",
    //   url: "www.your-project-url.com",
    //   image: "/placeholder.svg?height=200&width=300",
    //   filterCategory: "DESIGN",
    //   features: [
    //     "HD video streaming",
    //     "Multi-device synchronization",
    //     "Personalized recommendations",
    //     "Social sharing features",
    //     "Offline viewing capability",
    //   ],
    // },
    // {
    //   id: 3,
    //   title: "WorldToday - Portal",
    //   category: "Web Design",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard ever since the 1500s.",
    //   fullDescription:
    //     "WorldToday is a comprehensive news portal that delivers real-time news updates from around the globe with personalized content curation.",
    //   date: "5 Feb - 2022",
    //   client: "John Warrior",
    //   tech: "React, NodeJS, Android",
    //   type: "News",
    //   url: "www.your-project-url.com",
    //   image: "/placeholder.svg?height=200&width=300",
    //   filterCategory: "DEVELOPMENT",
    //   features: [
    //     "Real-time news updates",
    //     "Personalized news feed",
    //     "Multi-language support",
    //     "Social media integration",
    //     "Breaking news alerts",
    //   ],
    // },
    // {
    //   id: 4,
    //   title: "Doctory - Health care",
    //   category: "Development",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard ever since the 1500s.",
    //   fullDescription:
    //     "Doctory is a comprehensive healthcare management system that connects patients with healthcare providers through a seamless digital platform.",
    //   date: "12 Dec - 2021",
    //   client: "Mariya Loremis",
    //   tech: "PHP, MySql",
    //   type: "Health",
    //   url: "www.your-project-url.com",
    //   image: "/placeholder.svg?height=200&width=300",
    //   filterCategory: "DEVELOPMENT",
    //   features: [
    //     "Online appointment booking",
    //     "Telemedicine consultations",
    //     "Medical record management",
    //     "Prescription tracking",
    //     "Health monitoring tools",
    //   ],
    // },
    // {
    //   id: 5,
    //   title: "ConsultMe",
    //   category: "Templates | Web Design",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard ever since the 1500s.",
    //   fullDescription:
    //     "ConsultMe is a professional consulting platform that connects businesses with expert consultants across various industries.",
    //   date: "23 Oct - 2021",
    //   client: "Stouka Mitsu",
    //   tech: "Android | Ios",
    //   type: "Consultancy",
    //   url: "www.your-project-url.com",
    //   image: "/placeholder.svg?height=200&width=300",
    //   filterCategory: "TEMPLATES",
    //   features: [
    //     "Expert consultant matching",
    //     "Video consultation rooms",
    //     "Project management tools",
    //     "Secure document sharing",
    //     "Payment processing",
    //   ],
    // },
    // {
    //   id: 6,
    //   title: "Shoply - The big market",
    //   category: "Development | Graphics",
    //   description:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard ever since the 1500s.",
    //   fullDescription:
    //     "Shoply is a large-scale marketplace platform that enables thousands of vendors to sell their products to millions of customers worldwide.",
    //   date: "8 May - 2020",
    //   client: "Babu Rao",
    //   tech: "Android",
    //   type: "eCommerce",
    //   url: "www.your-project-url.com",
    //   image: "/placeholder.svg?height=200&width=300",
    //   filterCategory: "GRAPHICS",
    //   features: [
    //     "Multi-vendor marketplace",
    //     "Advanced analytics dashboard",
    //     "Automated inventory management",
    //     "Global shipping integration",
    //     "AI-powered recommendations",
    //   ],
    // },


  {
    id: 1,
    title: "B.Tech Induction Website",
    category: "Web Development",
    description:
      "Official onboarding website for B.Tech students at IIIT-Delhi.",
    fullDescription:
      "Developed and deployed a responsive and interactive induction website for IIIT-Delhi, streamlining the onboarding process for over 600 students. Focused on usability, accessibility, and speed.",
    date: "Jun 2024 – Jul 2024",
    client: "IIIT-Delhi",
    tech: "React, Firebase, Vercel",
    type: "Onboarding Platform",
    url: "btech-induction.vercel.app/",
    image: "/BTechInduction.png",
    filterCategory: "DEVELOPMENT",
    features: [
      "Responsive web design",
      "Fast-loading pages",
      "Centralized onboarding content",
      "Real-time updates",
      "Custom content management",
    ],
  },
  {
    id: 2,
    title: "RISC-V Assembler and Simulator",
    category: "Systems Programming",
    description:
      "Custom assembler and simulator for a simplified ISA.",
    fullDescription:
      "Created a low-level assembler and simulator for a simplified RISC-V instruction set. Demonstrated strong understanding of ISA design, instruction parsing, and CPU-like simulations.",
    date: "Mar 2024 – Apr 2024",
    client: "IIIT-Delhi | Guide: Prof. Tamman Tillo",
    tech: "Python",
    type: "Assembler + Simulator",
    url: "github.com/Sushant-4444/CO_PROJECT.git",
    image: "https://images.unsplash.com/photo-1655036387197-566206c80980?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    filterCategory: "DEVELOPMENT",
    features: [
      "Custom instruction parsing",
      "Memory simulation",
      "Register and flag support",
      "Step-by-step execution",
      "Terminal-based output",
    ],
  },
  {
    id: 3,
    title: "BookVerse",
    category: "Hackathon Project",
    description:
      "React app to trade books among students.",
    fullDescription:
      "Built a React-based app during a hackathon to enable college students to share and trade books within their community. Focused on minimal UI and functionality to allow seamless book exchanges.",
    date: "May 2024",
    client: "Hackathon Project",
    tech: "React, Firebase",
    type: "Community Platform",
    url: "github.com/Sushant-4444/BOOKVERSE.git",
    image: "BookVerse.png",
    filterCategory: "TEMPLATES",
    features: [
      "User authentication",
      "Book listing and browsing",
      "Chat for negotiations",
      "Trade request flow",
      "Firebase Firestore backend",
    ],
  },
  {
    id: 4,
    title: "Angry Birds Game",
    category: "Game Development",
    description:
      "A desktop Angry Birds clone using OOP.",
    fullDescription:
      "Developed a desktop game clone of Angry Birds using object-oriented principles, game loop design, and collision physics to simulate real-time interaction and gameplay.",
    date: "Mar 2024 – Apr 2024",
    client: "Course Project | Guide: Prof. Sambuddho",
    tech: "Java",
    type: "2D Game",
    url: "github.com/Aayush06122005/AP_Project.git",
    image: "https://www.shutterstock.com/shutterstock/photos/178235420/display_1500/stock-photo-hilversum-netherlands-february-angry-birds-is-a-video-game-by-finnish-game-developer-178235420.jpg",
    filterCategory: "DEVELOPMENT",
    features: [
      "OOP-based architecture",
      "Collision detection",
      "Slingshot mechanics",
      "Score tracking",
      "Interactive gameplay",
    ],
  },
  {
    "id": 5,
    "title": "Aventis Consultancy Website",
    "category": "Web Development",
    "description": "Enterprise-grade responsive website for SAP consultancy services.",
    "fullDescription": "Architected and deployed a professional ReactJS platform for Aventis Consultancy. The site features complex service listings and was validated to handle 1000 concurrent users in a production environment, significantly boosting client engagement.",
    "date": "Jun 2025",
    "client": "Aventis Consultancy",
    "tech": "ReactJS, Tailwind CSS",
    "type": "Corporate Website",
    "url": "www.aventis-consultancy.com/",
    "image": "/aventis.png",
    "filterCategory": "DEVELOPMENT",
    "features": [
      "High-concurrency optimization",
      "Responsive enterprise UI",
      "Service-specific landing pages",
      "Production-ready deployment"
    ]
  },
  {
    "id": 6,
    "title": "AISS25 Official Website",
    "category": "Web Development",
    "description": "Flagship event website for the CAI Department at IIIT-Delhi.",
    "fullDescription": "Developed the official digital platform for the AI Summer School (AISS25). Focused on delivering a high-performance user experience for researchers and students, integrating event schedules, speaker profiles, and registration details.",
    "date": "Jun 2025",
    "client": "CAI Department, IIIT-Delhi",
    "tech": "ReactJS, Tailwind CSS",
    "type": "Event Management Platform",
    "url": "aiss.iiitd.edu.in",
    "image": "/aiss.png",
    "filterCategory": "DEVELOPMENT",
    "features": [
      "Dynamic schedule integration",
      "Speaker highlight modules",
      "Optimized assets for fast loading",
      "Mobile-first design",
      "Interactive FAQ section"
    ]
  },
  {
    "id": 7,
    "title": "1px Design Conference Website",
    "category": "Web Development",
    "description": "Official platform for the premier design conference at IIIT-Delhi.",
    "fullDescription": "Engineered a visually driven website for the 1px Design Conference. The project emphasizes aesthetic precision and smooth animations to reflect the conference's focus on high-quality UI/UX design.",
    "date": "2024",
    "client": "1px Design Club",
    "tech": "ReactJS, CSS Animations",
    "type": "Conference Website",
    "url": "1pxdesignconf.iiitd.edu.in/",
    "image": "/1px.png",
    "filterCategory": "DEVELOPMENT",
    "features": [
      "Advanced CSS animations",
      "Aesthetic-centric UI",
      "Cross-browser compatibility",
      "Event registration flow",
      "Sponsor showcase layout"
    ]
  },
  {
    "id": 8,
    "title": "CyFuse Tech Club Website",
    "category": "Web Development",
    "description": "Central hub for the technical community at IIIT-Delhi.",
    "fullDescription": "As an Interim Coordinator, led the development of the CyFuse club website. The platform serves as a central repository for technical resources, event archives, and member recruitment for the college tech community.",
    "date": "Aug 2024 – Present",
    "client": "CyFuse (Tech Club)",
    "tech": "ReactJS, CSS, Git",
    "type": "Community Hub",
    "url": "cyfuse.iiitd.edu.in/", 
    "image": "/cyfuse.png",
    "filterCategory": "DEVELOPMENT",
    "features": [
      "Club membership management",
      "Project archival system",
      "Event timeline integration",
      "Collaborative development",
      "Resource sharing portal"
    ]
  }

  ]

  const filteredProjects =
    activeFilter === "ALL" ? projects : projects.filter((project) => project.filterCategory === activeFilter)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
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

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 px-4">
          <h1
            className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-8 transform transition-all duration-800 ${
              titleVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            My{" "}
            <span className="text-coral-500 inline-block hover:scale-110 transition-transform duration-300 cursor-pointer">
              Projects
            </span>
          </h1>

          {/* Filter Tabs */}
          <div
            className={`flex flex-wrap justify-center gap-4 transform transition-all duration-800 delay-200 ${
              titleVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter
                    ? "bg-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-purple-500 hover:bg-purple-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 150} onClick={handleProjectClick} />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Projects
