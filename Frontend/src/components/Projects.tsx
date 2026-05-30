import { useEffect, useState } from "react"
import type { Project } from "../types"
import { getProjects } from "../api"
import { FiGithub, FiExternalLink } from "react-icons/fi"

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error)
  }, [])

  const displayed = showAll ? projects : projects.slice(0, 3)
  const toggleShow = () => setShowAll(!showAll)

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-accent" />
            <span className="text-accent font-medium text-sm tracking-widest uppercase">What I Built</span>
            <div className="w-12 h-0.5 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Projects</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project) => {
            const ghUrl = project.github_url
            const liveUrl = project.live_url
            const imgUrl = project.image
            const ptitle = project.title
            const pdesc = project.description
            const pid = project.id
            const pfeat = project.featured
            const techs = project.tech_stack.split(",")
            return (
              <div key={pid} className="bg-secondary border border-slate-700 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 group hover:-translate-y-2">
                <div className="h-48 bg-primary relative overflow-hidden">
                  {imgUrl ? (
                    <img src={imgUrl} alt={ptitle} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">🚀</span>
                    </div>
                  )}
                  {pfeat && (
                    <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full">Featured</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-text font-bold text-lg mb-2">{ptitle}</h3>
                  <p className="text-slate-400 text-sm mb-4">{pdesc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {techs.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md">{tech.trim()}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2 border-t border-slate-700">
                    {ghUrl && (
                      <a href={ghUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm">
                        <FiGithub size={16} />Code
                      </a>
                    )}
                    {liveUrl && (
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm">
                        <FiExternalLink size={16} />Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {projects.length > 3 && (
          <div className="text-center mt-12">
            <button onClick={toggleShow} className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-white rounded-lg">
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
