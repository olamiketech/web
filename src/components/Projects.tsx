"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/data/projects"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Folder } from "lucide-react"
import Link from "next/link"

export function Projects() {
    return (
        <Section id="projects" className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    A showcase of my work in AI, Machine Learning, and Software Engineering.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {projects.map((project, i) => (
                    <Card key={i} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-white/5 dark:bg-black/40 backdrop-blur-sm bg-white/40">
                        <div className={`h-32 w-full flex items-center justify-center bg-gradient-to-br
                            ${i === 0 ? "from-violet-500/20 via-purple-500/20 to-blue-500/20" :
                                i === 1 ? "from-emerald-500/20 via-teal-500/20 to-green-500/20" :
                                    i === 2 ? "from-orange-500/20 via-amber-500/20 to-yellow-500/20" :
                                        i === 3 ? "from-pink-500/20 via-rose-500/20 to-red-500/20" :
                                            "from-cyan-500/20 via-sky-500/20 to-blue-500/20"
                            }`}>
                            <div className="p-4 bg-background/50 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                                <Folder className={`h-8 w-8 
                                    ${i === 0 ? "text-violet-500" :
                                        i === 1 ? "text-emerald-500" :
                                            i === 2 ? "text-orange-500" :
                                                i === 3 ? "text-pink-500" :
                                                    "text-cyan-500"
                                    }`} />
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                {project.title}
                                {project.link && project.link.trim().length > 0 && (
                                    <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                )}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs font-medium">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>

                        <CardContent className="flex-grow">
                            <CardDescription className="text-sm text-foreground/80 leading-relaxed">
                                {project.description}
                            </CardDescription>

                            {project.features && project.features.length > 0 && (
                                <ul className="mt-4 space-y-2">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>

                        <CardFooter className="pt-4 pb-6 gap-3">
                            {project.github && project.github.trim().length > 0 && (
                                <Button variant="outline" size="sm" className="flex-1" asChild>
                                    <Link href={project.github} target="_blank">
                                        <Github className="mr-2 h-4 w-4" /> Code
                                    </Link>
                                </Button>
                            )}
                            {project.link && project.link.trim().length > 0 && (
                                <Button size="sm" className="flex-1" asChild>
                                    <Link href={project.link} target="_blank">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                    </Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Section>
    )
}
