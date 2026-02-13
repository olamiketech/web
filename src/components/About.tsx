"use client"

import { Section } from "@/components/ui/section"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download } from "lucide-react"

export function About() {
    return (
        <Section id="about" className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image Column */}
                <div className="relative group mx-auto md:mx-0">
                    <div className="relative w-[280px] h-[350px] sm:w-[350px] sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                        <Image
                            src="/assets/images/image.jpeg"
                            alt="Michael Salami"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -inset-4 rounded-2xl border-2 border-primary/20 bg-transparent -z-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                </div>

                {/* Text Column */}
                <div className="space-y-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Me</h2>
                    <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                        <p>
                            I’m an <span className="text-primary font-medium">AI/ML Engineer</span> passionate about building intelligent products that create real-world impact. With over 5 years of experience, I specialize in bridging the gap between complex data science and scalable software engineering.
                        </p>
                        <p>
                            My expertise spans across the entire ML lifecycle—from data engineering and model development to deployment and MLOps. I've delivered computer-vision solutions for agriculture, NLP systems for retail, and predictive analytics for healthcare.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <Button size="lg" className="gap-2" asChild>
                            <a href="/assets/MSalami.pdf" target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" /> Download CV
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    )
}
