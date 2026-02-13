"use client"

import * as React from "react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { projects } from "@/data/projects"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Folder } from "lucide-react"
import Link from "next/link"

export function Projects() {
    return (
        <Section id="projects" className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    A showcase of my work in AI, Machine Learning, and Software Engineering.
                </p>
            </div>

            <BentoGrid className="max-w-6xl mx-auto">
                {projects.map((project, i) => (
                    <BentoGridItem
                        key={i}
                        title={
                            <div className="flex items-center gap-2">
                                {project.title}
                                {project.link && project.link.trim().length > 0 && (
                                    <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-primary">
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        }
                        description={
                            <div className="flex flex-col gap-4">
                                <p>{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {project.github && project.github.trim().length > 0 && (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={project.github} target="_blank">
                                                <Github className="mr-2 h-4 w-4" /> GitHub
                                            </Link>
                                        </Button>
                                    )}
                                    {project.link && project.link.trim().length > 0 && (
                                        <Button size="sm" asChild>
                                            <Link href={project.link} target="_blank">
                                                Live Demo
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        }
                        header={
                            <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br items-center justify-center
                                ${i === 0 ? "from-violet-500/20 via-purple-500/20 to-blue-500/20" :
                                    i === 1 ? "from-emerald-500/20 via-teal-500/20 to-green-500/20" :
                                        i === 2 ? "from-orange-500/20 via-amber-500/20 to-yellow-500/20" :
                                            i === 3 ? "from-pink-500/20 via-rose-500/20 to-red-500/20" :
                                                "from-cyan-500/20 via-sky-500/20 to-blue-500/20"
                                }`}>
                                <div className="p-4 bg-background/50 backdrop-blur-sm rounded-full border border-white/10 shadow-sm">
                                    <Folder className={`h-8 w-8 
                                        ${i === 0 ? "text-violet-500" :
                                            i === 1 ? "text-emerald-500" :
                                                i === 2 ? "text-orange-500" :
                                                    i === 3 ? "text-pink-500" :
                                                        "text-cyan-500"
                                        }`} />
                                </div>
                            </div>
                        }
                        className={i === 0 || i === 3 ? "md:col-span-2" : i === 4 ? "md:col-span-3" : ""}
                    />
                ))}
            </BentoGrid>
        </Section>
    )
}
