import axios from "axios"
import type { Profile, Skill, Project, Experience, ContactForm } from "../types"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
})

export const getProfile = async (): Promise<Profile> => {
  const res = await api.get<Profile[]>("/profile/")
  return res.data[0]
}

export const getSkills = async (): Promise<Skill[]> => {
  const res = await api.get<Skill[]>("/skills/")
  return res.data
}

export const getProjects = async (): Promise<Project[]> => {
  const res = await api.get<Project[]>("/projects/")
  return res.data
}

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const res = await api.get<Project[]>("/projects/featured/")
  return res.data
}

export const getExperience = async (): Promise<Experience[]> => {
  const res = await api.get<Experience[]>("/experience/")
  return res.data
}

export const sendContact = async (data: ContactForm): Promise<void> => {
  await api.post("/contact/", data)
}
