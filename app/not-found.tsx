"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Logo3D } from "@/components/logo-3d"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/footer"
import { GradientBackground } from "@/components/ui/gradient-background"
import { GeometricPattern } from "@/components/ui/geometric-pattern"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <GradientBackground>
        <GeometricPattern variant="dark" density="low" className="fixed inset-0" />
        
        <div className="min-h-[600px] md:min-h-[calc(100vh-22rem)] flex flex-col items-center justify-center px-6 pt-12 sm:pt-0">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-12 w-40 h-40 mx-auto sm:w-56 sm:h-56"
          >
            <Logo3D className="w-full h-full" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold">Oops! Page Not Found</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground">
              Looks like this page took a wrong turn in cyberspace. 
              <br />
              Don't worry though, our digital compass still works!
            </p>

            <Button asChild size="lg" className="mt-8">
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
        <Footer />
      </GradientBackground>
    
    </div>
  )
}