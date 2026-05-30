import { useEffect, useState } from "react"
import type { Skill } from "../types"
import { getSkills } from "../api"

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    getSkills().then(setSkills).catch(console.error)
  }, [])

  const categories = ["all", "backend", "database", "devops", "tools", "frontend"]

  const filtered = activeCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-accent" />
            <span className="text-accent font-medium text-sm tracking-widest uppercase">What I Know</span>
            <div className="w-12 h-0.5 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Skills</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Technologies and tools I use to build backend systems
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-lg shadow-accent/30"
                  : "bg-secondary text-slate-400 hover:text-accent border border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((skill) => (
            <div
              key={skill.id}
              className="bg-secondary border border-slate-700 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-sm group-hover:bg-accent/20 transition-colors">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-text font-semibold">{skill.name}</h3>
                    <span className="text-slate-500 text-xs capitalize">{skill.category}</span>
                  </div>
                </div>
                <span className="text-accent font-bold text-lg">{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-primary rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-accent to-cyan-400 transition-all duration-1000"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
