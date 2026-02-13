import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold">Michael Salami</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Building intelligent solutions with AI & Data.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/olamiketech" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="mailto:olamike077@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                            <Mail className="h-5 w-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Michael Salami. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
