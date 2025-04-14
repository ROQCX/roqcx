import { Hero } from "../../components/sections/hero"
import { Services } from "../../components/sections/services"
import { RoqchatShowcase } from "../../components/sections/roqchat-showcase"
import { Mission } from "../../components/sections/mission"
import { SuccessStories } from "../../components/sections/success-stories"
import { CTA } from "../../components/sections/cta"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <RoqchatShowcase />
      <Mission />
      <SuccessStories />
      <CTA />
    </>
  )
}
