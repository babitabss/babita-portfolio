export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  profile_img: string | null
  location: string
  email: string
  github_url: string
  linkedin_url: string
  resume: string | null
}

export interface Skill {
  id: number
  name: string
  category: 'backend' | 'frontend' | 'database' | 'devops' | 'tools' | 'other'
  proficiency: number
  icon: string
  order: number
}

export interface Project {
  id: number
  title: string
  description: string
  tech_stack: string
  image: string | null
  github_url: string
  live_url: string
  featured: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface Experience {
  id: number
  company: string
  position: string
  description: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  order: number
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}