import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  // Implementation and Adoption
  {
    question: "How quickly can automation be implemented in a small business?",
    answer: "Most small businesses can begin seeing results from automation within a few weeks. Our solutions are designed for rapid deployment, with minimal disruption to your existing workflows. We guide you through each step to ensure a smooth transition."
  },
  {
    question: "What technical expertise is required to use your automation tools?",
    answer: "No advanced technical skills are needed. Our tools are built for ease of use, with intuitive interfaces and comprehensive onboarding. We provide training and ongoing support to empower your team regardless of their technical background."
  },
  {
    question: "How do you ensure smooth adoption across our team?",
    answer: "We offer hands-on onboarding, clear documentation, and responsive support. Our team works closely with yours to address concerns, customize workflows, and encourage adoption through best practices and change management."
  },
  // ROI and Business Impact
  {
    question: "How do I measure the ROI of implementing automation?",
    answer: "We help you define clear KPIs before implementation, such as time saved, error reduction, and cost savings. Our analytics dashboards provide real-time visibility into performance, so you can track ROI and business impact from day one."
  },
  {
    question: "What specific time savings can I expect for my business?",
    answer: "Time savings depend on your current processes, but most clients see a reduction in manual work by 30-60%. We analyze your workflows and provide estimates during the discovery phase, so you know what to expect."
  },
  {
    question: "How have similar businesses in my industry benefited from your solutions?",
    answer: "We have case studies and success stories from businesses like yours. Many have achieved faster turnaround times, improved customer satisfaction, and significant cost reductions. Ask us for examples relevant to your industry."
  },
  // Security and Data Privacy
  {
    question: "How is my business data protected when using your automation tools?",
    answer: "We use industry-standard encryption, secure cloud infrastructure, and regular security audits to protect your data. Access controls and compliance with best practices are built into every solution."
  },
  {
    question: "Who owns the data generated through your platform?",
    answer: "You retain full ownership of your business data. We do not use or share your data without your explicit consent, and you can export your data at any time."
  },
  {
    question: "How do you ensure compliance with data privacy regulations?",
    answer: "Our platform is designed to comply with major data privacy regulations (such as GDPR). We provide transparency, data access controls, and regular compliance reviews to keep your business protected."
  },
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
              Find answers to common questions about AI, Automation, and How it can help your business.
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