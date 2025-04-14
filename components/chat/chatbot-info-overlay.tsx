'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { X, BookOpen, Search, Shield, ArrowRight } from 'lucide-react'

interface ChatbotInfoOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatbotInfoOverlay({ isOpen, onClose }: ChatbotInfoOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl bg-background p-8 rounded-lg shadow-lg border"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue bg-clip-text text-transparent">
                    Test Your AI Assistant
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Train it with your business knowledge and see how it performs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Step 1: Add Knowledge</h3>
                      <p className="text-sm text-muted-foreground">
                        Share information about your business. For example:
                      </p>
                      <div className="mt-2 p-3 bg-muted/30 rounded-md text-sm">
                        <p className="font-medium">&quot;We are a software company that provides AI-powered customer service solutions. Our main product is an intelligent chatbot that can be trained with company knowledge. We offer three pricing tiers: Basic ($99/month), Pro ($299/month), and Enterprise (custom pricing).&quot;</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Step 2: Test Understanding</h3>
                      <p className="text-sm text-muted-foreground">
                        Ask questions to verify the AI&apos;s understanding:
                      </p>
                      <div className="mt-2 p-3 bg-muted/30 rounded-md text-sm">
                        <p className="font-medium">&quot;What pricing options do you offer?&quot;</p>
                        <p className="text-muted-foreground mt-1">The AI should respond with the pricing tiers you provided.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border p-4 bg-muted/50">
                  <h3 className="font-medium mb-2">Example Knowledge to Share</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Company overview and mission</li>
                    <li>• Product features and benefits</li>
                    <li>• Pricing and packages</li>
                    <li>• Target customers and use cases</li>
                    <li>• Industry-specific terminology</li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4 bg-muted/50">
                  <h3 className="font-medium mb-2">Example Questions to Test</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• What does your company do?</li>
                    <li>• Who are your target customers?</li>
                    <li>• What are your main products?</li>
                    <li>• How much does it cost?</li>
                    <li>• What makes you different?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <Button 
                className="w-full max-w-sm bg-gradient-to-r from-roq-orange via-roq-pink to-roq-blue text-white hover:opacity-90"
                onClick={onClose}
              >
                Start Testing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <p>All data is encrypted and will be automatically deleted after 24 hours</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 