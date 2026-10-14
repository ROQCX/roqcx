import type { GlyphName } from "@/components/studio/illustrations"
import type { Faq } from "./site-content"

export const trainingPath = "/services/ai-training"

/** Hash that preselects the corporate track in the registration form. */
export const CORPORATE_HASH = "#register-corporate"

export const outcomes: { icon: GlyphName; title: string; body: string }[] = [
  {
    icon: "search",
    title: "Understand AI",
    body: "Learn how generative AI and large language models work, and why they sometimes get things wrong.",
  },
  {
    icon: "pen",
    title: "Get better results",
    body: "Learn how to structure instructions, provide context and move beyond generic prompts.",
  },
  {
    icon: "layers",
    title: "Choose the right tools",
    body: "Explore ChatGPT, Claude, Gemini, Perplexity and Copilot, and what each is useful for.",
  },
  {
    icon: "compass",
    title: "Challenge your thinking",
    body: "Use AI to question assumptions, explore alternatives and improve ideas, instead of having it simply agree with you.",
  },
  {
    icon: "refresh",
    title: "Explore AI agents",
    body: "Understand how AI can complete multi-step tasks, and how to develop repeatable workflows.",
  },
  {
    icon: "lock",
    title: "Experiment responsibly",
    body: "Recognise risks, protect sensitive information and set sensible boundaries.",
  },
]

export type ModuleArt = "hierarchy" | "rcto" | "agent"

export const curriculum: { title: string; body: string; art?: ModuleArt }[] = [
  {
    title: "AI 101",
    body: "What AI is, and how to use it sensibly. Discover the AI you’ve already been using and what’s changed with generative AI, and the difference between AI, machine learning, generative AI and large language models.",
    art: "hierarchy",
  },
  {
    title: "How AI actually works",
    body: "Explore how LLMs generate responses, where hallucinations come from and why AI can sound confident even when it’s wrong. Learn to recognise useful outputs and questionable claims.",
  },
  {
    title: "Understanding the AI tool landscape",
    body: "Compare ChatGPT, Claude, Gemini, Perplexity and Microsoft Copilot. Explore how to choose a tool based on the task, the information involved and the level of risk.",
  },
  {
    title: "Prompting for better results",
    body: "Learn practical prompting principles and the R-C-T-O framework: Role, Context, Task and Output. See how clearer instructions change the usefulness of a response.",
    art: "rcto",
  },
  {
    title: "AI agents and practical automation",
    body: "Understand the shift from AI that answers questions to AI that can use tools, plan actions and complete multi-step tasks. Explore where automation helps and where human oversight matters.",
    art: "agent",
  },
  {
    title: "Applying AI safely across a business",
    body: "Explore shared assistants, reusable workflows, brand tone, sensitive data and AI governance. Learn how teams can experiment without losing consistency or control.",
  },
]

export const exercises: { title: string; body: string[] }[] = [
  {
    title: "Turn messy work into structure",
    body: [
      "Take something you already deal with, such as meeting notes, project updates, customer feedback or an unfinished idea, and use AI to turn it into something useful.",
      "Then challenge the output. What did it get right? What did it miss? Would you actually use it?",
    ],
  },
  {
    title: "Use AI as a thinking partner",
    body: [
      "Instead of asking AI to validate your next big idea, ask it to find the weaknesses.",
      "Explore assumptions, operational risks, likely objections and the evidence you’d need before moving forward.",
    ],
  },
  {
    title: "Design an AI use case for your team",
    body: [
      "Work with others to identify a practical opportunity for AI in your workplace.",
      "Define what the assistant should do, what information it needs, where human review is necessary and how you’d know whether it was useful.",
    ],
  },
]

export const audiences: { icon: GlyphName; title: string; body: string }[] = [
  {
    icon: "compass",
    title: "Business leaders and managers",
    body: "Understand AI capabilities, limitations and opportunities so you can make better decisions about adoption.",
  },
  {
    icon: "flag",
    title: "Product and project managers",
    body: "Use AI to explore problems, challenge assumptions, organise information and support planning.",
  },
  {
    icon: "chat",
    title: "Marketing, sales and CX professionals",
    body: "Explore practical applications for content, research, communication and customer experience.",
  },
  {
    icon: "person",
    title: "Everyday AI users",
    body: "Move beyond occasional ChatGPT prompts and develop more useful, repeatable ways of working.",
  },
]

export const principles: { title: string; body: string }[] = [
  {
    title: "Understand the technology, not just the interface.",
    body: "Learn what the models are doing, where their answers come from and why they make mistakes.",
  },
  {
    title: "Use your own problems, not only prepared demos.",
    body: "Work with familiar tasks and scenarios that reflect what you actually do.",
  },
  {
    title: "Develop judgement, not dependence.",
    body: "Learn when AI can help, when it needs checking and when it shouldn’t be making decisions.",
  },
  {
    title: "Leave with something you can use.",
    body: "Identify practical AI opportunities and begin turning useful prompts into repeatable workflows.",
  },
]

export const corporateIncludes = [
  "Department-specific AI use cases and exercises",
  "Guidance on appropriate tools and safe usage",
  "Shared assistants and reusable workflows",
  "Brand tone, consistency and AI governance",
  "Practical next steps for team adoption",
]

export const format: { label: string; value: string; icon: GlyphName }[] = [
  { label: "Duration", value: "One day, 10:00–16:00", icon: "clock" },
  { label: "Format", value: "Live and interactive", icon: "team" },
  { label: "Location", value: "Dubai, or on-site for your organisation", icon: "flag" },
  { label: "Experience", value: "Beginner-friendly", icon: "badge" },
]

export const trainingFaqs: Faq[] = [
  {
    question: "Do I need any technical knowledge to attend?",
    answer:
      "No. The masterclass is designed for professionals without a technical background. You won’t write code or study machine learning mathematics. Concepts are explained in plain language, and the focus is on practical use.",
  },
  {
    question: "Is this AI training suitable for beginners?",
    answer:
      "Yes. It starts from the AI you have already been using without noticing, and builds from there. People who already use AI every day still get value from the sections on how models work, where they fail and how to check what they produce.",
  },
  {
    question: "Will I learn how to use ChatGPT?",
    answer:
      "Yes, alongside Claude, Gemini, Perplexity and Microsoft Copilot. The aim is not to memorise where the buttons are. It is to understand what these tools are doing, so you can choose the right one for a task and get more useful results from it.",
  },
  {
    question: "What is AI 101?",
    answer:
      "AI 101 is a module inside AI in Practice, not a separate course. It covers what AI is and how to use it sensibly. The rest of the day builds on it: prompting, AI agents, safe use across a business, and three exercises using your own work.",
  },
  {
    question: "Does the masterclass cover AI agents?",
    answer:
      "Yes. One module covers the shift from AI that answers questions to AI that can use tools, plan actions and complete multi-step tasks, and where a person still needs to review or approve the result.",
  },
  {
    question: "Can the AI masterclass be delivered to our employees?",
    answer:
      "Yes. It can be run as a corporate workshop for your team and tailored to your functions, the tools you already use and your everyday business challenges. Register your interest and choose “Training for my organisation”.",
  },
  {
    question: "What should I bring?",
    answer:
      "Real, non-confidential work examples, such as meeting notes, project updates or an idea you are working on. Please don’t bring customer records, passwords or confidential documents to use in the exercises. We’ll confirm anything else you need, such as a device or access to a particular tool, before the session.",
  },
  {
    question: "How long is the AI masterclass?",
    answer:
      "One day, from 10:00 to 16:00. It mixes short explanations, live demonstrations, individual exercises and group discussion.",
  },
  {
    question: "Is this a certification?",
    answer: "No. ROQ CX does not offer accredited or certified training, and no certificate is attached to the masterclass.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Register your interest and we’ll share the fee when dates are confirmed. Corporate workshops are quoted once we understand your team and what you want to cover.",
  },
]
