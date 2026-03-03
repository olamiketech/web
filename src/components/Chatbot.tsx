"use client"

import * as React from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Chatbot() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90 transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6 text-primary-foreground" /> : <MessageCircle className="h-6 w-6 text-primary-foreground" />}
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
                        className="fixed bottom-20 right-4 z-50 w-[90vw] md:w-[400px] h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border bg-background flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b bg-card flex items-center gap-3 shadow-sm z-10">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Michael's Digital Twin</h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Online
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            {messages.length === 0 ? (
                                <div className="text-center text-muted-foreground mt-10 flex flex-col items-center">
                                    <div className="h-16 w-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Bot className="h-8 w-8 text-primary opacity-80" />
                                    </div>
                                    <h4 className="font-medium text-foreground mb-1">Welcome!</h4>
                                    <p className="text-sm px-4 max-w-[250px]">
                                        Hi, I am Michael's digital twin. Ask me anything about his experience, skills, or projects.
                                    </p>
                                </div>
                            ) : (
                                messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={cn(
                                            "flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm",
                                            m.role === "user"
                                                ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                                                : "bg-background text-foreground rounded-bl-sm border border-border/50"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            {m.role !== "user" && <Bot className="h-4 w-4 mt-0.5 shrink-0 text-primary" />}
                                            <span className="leading-relaxed whitespace-pre-wrap">{m.content}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                                <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm shadow-sm bg-background text-foreground rounded-bl-sm border border-border/50">
                                    <div className="flex items-center gap-3">
                                        <Bot className="h-4 w-4 shrink-0 text-primary" />
                                        <span className="flex gap-1 py-1">
                                            <span className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                            <span className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                            <span className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t bg-card">
                            <form onSubmit={handleSubmit} className="flex gap-2 relative">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."
                                    className="flex w-full rounded-full border border-input bg-background pl-4 pr-12 py-3.5 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 transition-transform active:scale-95"
                                    disabled={isLoading || !input.trim()}
                                >
                                    <Send className="h-4 w-4 text-primary-foreground ml-0.5" />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
