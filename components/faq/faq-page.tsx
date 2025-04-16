import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What services does ROQ CX offer?",
    answer: "ROQ CX offers AI-powered customer experience consulting, automation solutions, and analytics services tailored for SMBs. Our services help businesses streamline operations, enhance customer interactions, and leverage data-driven insights for growth."
  },
  {
    question: "How can ROQ CX help my business?",
    answer: "ROQ CX helps businesses improve customer satisfaction, streamline operations, and leverage AI to enhance their customer experience. We provide customized solutions that align with your business goals and industry requirements."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a wide range of industries including retail, healthcare, finance, and technology, with solutions tailored to each sector's unique needs. Our expertise spans across various business sizes and types."
  },
  {
    question: "How do I get started with ROQ CX?",
    answer: "Getting started is easy - simply contact us through our website or email, and we'll schedule a consultation to discuss your needs. Our team will work with you to understand your requirements and propose the best solutions."
  },
  {
    question: "What makes ROQ CX different from other consulting firms?",
    answer: "ROQ CX combines deep industry expertise with cutting-edge AI technology to deliver innovative solutions. We focus on practical, implementable strategies that drive real business results and provide ongoing support to ensure success."
  }
]

export function FAQPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Find answers to common questions about our services and how we can help your business.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
} 