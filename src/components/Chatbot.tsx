"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function Chatbot() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                    <span className="sr-only">Toggle Chatbot</span>
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 z-50 w-[90vw] md:w-[400px] h-[500px] rounded-xl overflow-hidden shadow-2xl border bg-background"
                    >
                        <div className="w-full h-full relative">
                            <iframe
                                src="https://mikecareeragent.up.railway.app/"
                                className="w-full h-full border-0"
                                title="Career Chatbot"
                                allow="microphone; camera"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
