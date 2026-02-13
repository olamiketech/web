"use client"

import * as React from "react"
import { experiences } from "@/data/experience"
import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Experience() {
    return (
        <Section id="experience" className="container mx-auto px-4 bg-muted/30">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Experience & Education</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                    My professional journey and qualifications.
                </p>
            </div>

            <div className="relative max-w-3xl mx-auto space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {experiences.map((item, index) => (
                    <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Icon/Dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 translate-x-0">
                            <div className="w-3 h-3 bg-white rounded-full" />
                        </div>

                        {/* Card */}
                        <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded border shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">{item.title}</CardTitle>
                                <time className="font-caveat font-medium text-indigo-500 text-sm whitespace-nowrap ml-2">{item.period}</time>
                            </div>
                            <CardDescription className="font-semibold text-slate-600 dark:text-slate-400 mb-2">{item.company}</CardDescription>
                            <CardContent className="p-0 text-slate-500 dark:text-slate-400 text-sm">
                                {item.description}
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </Section>
    )
}
