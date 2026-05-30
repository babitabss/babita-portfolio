const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="py-8 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-2xl font-bold">
          <span className="text-accent">B</span>
          <span className="text-text">abita</span>
          <span className="text-accent">.</span>
        </div>
        <p className="text-slate-400 text-sm">{year} Babita Acharya. Built with Django and React.</p>
        <div className="flex gap-6">
          <a href="#home" className="text-slate-400 hover:text-accent text-sm transition-colors">Home</a>
          <a href="#skills" className="text-slate-400 hover:text-accent text-sm transition-colors">Skills</a>
          <a href="#projects" className="text-slate-400 hover:text-accent text-sm transition-colors">Projects</a>
          <a href="#contact" className="text-slate-400 hover:text-accent text-sm transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
