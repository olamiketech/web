"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Gradient/Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-background/10 dark:to-background/5 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background z-0" />

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neutral-950 via-neutral-600 to-neutral-950 dark:from-neutral-100 dark:via-neutral-400 dark:to-neutral-100">
                        Turning Data Into <br className="hidden md:block" />
                        <span className="text-primary">Intelligent Solutions</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl font-light">
                        AI/ML Engineer | Data Scientist | MLOps Specialist
                    </p>
                    <p className="mx-auto max-w-[600px] text-muted-foreground/80 md:text-lg">
                        Leveraging expertise in AI, machine learning, data engineering, and MLOps to deliver end-to-end intelligent solutions.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-4"
                >
                    <Button size="lg" className="h-12 px-8 text-lg" asChild>
                        <Link href="#projects">
                            View My Work <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                        <Link href="#contact">Contact Me</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
