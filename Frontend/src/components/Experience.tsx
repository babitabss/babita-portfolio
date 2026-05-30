import { useEffect, useState } from "react"
import type { Experience } from "../types"
import { getExperience } from "../api"
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi"

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])

  useEffect(() => {
    getExperience().then(setExperiences).catch(console.error)
  }, [])

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-accent" />
            <span className="text-accent font-medium text-sm tracking-widest uppercase">My Journey</span>
            <div className="w-12 h-0.5 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Experience</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            My professional journey so far
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp) => {
              const company = exp.company
              const position = exp.position
              const description = exp.description
              const location = exp.location
              const startDate = exp.start_date
              const endDate = exp.end_date
              const isCurrent = exp.is_current
              const eid = exp.id

              const startYear = new Date(startDate).getFullYear()
              const endYear = isCurrent ? "Present" : endDate ? new Date(endDate).getFullYear() : "Present"

              return (
                <div key={eid} className="relative flex gap-6">
                  <div className="flex-shrink-0 w-16 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-primary mt-1" />
                  </div>

                  <div className="flex-1 bg-secondary border border-slate-700 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 mb-2">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-text font-bold text-lg">{position}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <FiBriefcase size={14} className="text-accent" />
                          <span className="text-accent font-medium">{company}</span>
                        </div>
                      </div>
                      {isCurrent && (
                        <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/30 font-medium">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <FiCalendar size={14} className="text-accent" />
                        <span>{startYear} - {endYear}</span>
                      </div>
                      {location && (
                        <div className="flex items-center gap-2">
                          <FiMapPin size={14} className="text-accent" />
                          <span>{location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ExperienceSection
