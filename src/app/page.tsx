import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Skills } from "@/components/Skills"
import { Projects } from "@/components/Projects"
import { Experience } from "@/components/Experience"
import { Contact } from "@/components/Contact"
import { Chatbot } from "@/components/Chatbot"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 md:gap-24 pb-20">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Chatbot />
    </div>
  )
}
