import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Skills from "../components/Skills"
import Projects from "../components/Projects"
import ExperienceSection from "../components/Experience"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <main className="bg-primary text-text">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <ExperienceSection />
      <Contact />
      <Footer />
    </main>
  )
}

export default Home