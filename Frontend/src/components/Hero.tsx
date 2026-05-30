import { useEffect, useState } from "react"
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi"
import { getProfile } from "../api"
import type { Profile } from "../types"

const Hero = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [text, setText] = useState("")
  const [titleIndex, setTitleIndex] = useState(0)

  const titles = ["Backend Developer", "Django Developer", "REST API Engineer", "Python Developer"]

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error)
  }, [])

  useEffect(() => {
    const currentTitle = titles[titleIndex]
    let charIndex = 0
    setText("")
    const typeInterval = setInterval(() => {
      if (charIndex < currentTitle.length) {
        setText(currentTitle.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => setTitleIndex((prev) => (prev + 1) % titles.length), 2000)
      }
    }, 100)
    return () => clearInterval(typeInterval)
  }, [titleIndex])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-0.5 bg-accent" />
            <span className="text-accent font-medium text-sm tracking-widest uppercase">Hello World</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            I am{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
              {profile?.name || "Babita Acharya"}
            </span>
          </h1>
          <div className="text-2xl md:text-3xl font-semibold text-slate-300 h-10">
            <span>{text}</span>
            <span className="animate-pulse text-accent">|</span>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
            {profile?.bio || "Backend Developer from Kathmandu, Nepal."}
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-accent">📍</span>
            <span>{profile?.location || "Kathmandu, Nepal"}</span>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#projects" className="px-8 py-3 bg-accent hover:bg-indigo-500 text-white font-medium rounded-lg transition-all duration-200">
              View My Work
            </a>
            {profile?.resume && (
              <a href={profile.resume} download className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-white font-medium rounded-lg flex items-center gap-2">
                <FiDownload size={16} />
                Download CV
              </a>
            )}
          </div>
          <div className="flex items-center gap-6 pt-2">
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors duration-200">
                <FiGithub size={22} />
              </a>
            )}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors duration-200">
                <FiLinkedin size={22} />
              </a>
            )}
            <a href="#contact" className="text-slate-400 hover:text-accent transition-colors duration-200">
              <FiMail size={22} />
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-cyan-400 blur-md opacity-50 scale-105" />
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/50">
              {profile?.profile_img ? (
                <img src={profile.profile_img} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-8xl">👩</span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 bg-secondary border border-slate-700 rounded-xl px-4 py-2 shadow-xl">
              <p className="text-accent font-bold text-sm">Open to Work</p>
              <p className="text-slate-400 text-xs">Available Now</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-500 text-xs">Scroll Down</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}

export default Hero
