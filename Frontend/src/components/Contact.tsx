import { useState } from "react"
import type { ContactForm } from "../types"
import { sendContact } from "../api"
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend } from "react-icons/fi"

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await sendContact(form)
      setStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-accent" />
            <span className="text-accent font-medium text-sm tracking-widest uppercase">Get In Touch</span>
            <div className="w-12 h-0.5 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Me</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">Have a project in mind? Send me a message!</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-text font-bold text-xl mb-4">Lets work together</h3>
              <p className="text-slate-400 leading-relaxed">I am currently open to backend developer roles and freelance projects. My inbox is always open!</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-secondary border border-slate-700 rounded-xl">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FiMail className="text-accent" size={18} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Email</p>
                  <p className="text-text font-medium">itsssbabita221@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-secondary border border-slate-700 rounded-xl">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FiMapPin className="text-accent" size={18} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Location</p>
                  <p className="text-text font-medium">Pokhara, Nepal</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent transition-all">
                <FiGithub size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent transition-all">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full bg-secondary border border-slate-700 rounded-lg px-4 py-3 text-text placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-2 block">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full bg-secondary border border-slate-700 rounded-lg px-4 py-3 text-text placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="What is this about?" className="w-full bg-secondary border border-slate-700 rounded-lg px-4 py-3 text-text placeholder-slate-500 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..." className="w-full bg-secondary border border-slate-700 rounded-lg px-4 py-3 text-text placeholder-slate-500 focus:outline-none focus:border-accent transition-colors resize-none" />
            </div>
            <button type="submit" disabled={status === "loading"} className="w-full py-3 bg-accent hover:bg-indigo-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <FiSend size={16} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm text-center">
                Message sent! I will get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
