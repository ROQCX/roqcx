export interface Faq {
  question: string
  answer: string
}

export interface ProofLink {
  href: string
  title: string
  note: string
  image?: string
}

export interface ServiceContent {
  path: string
  label: string
  eyebrow: string
  title: string
  lede: string
  situation: string
  problems: string[]
  deliverables: string[]
  process: { title: string; body: string }[]
  boundaries: string[]
  proof: ProofLink[]
  founderNote?: string
  faqs: Faq[]
}

export const services: ServiceContent[] = [
  {
    path: "/services/ai-automation",
    label: "AI automation",
    eyebrow: "Automate",
    title: "AI agents and automation you can still control.",
    lede: "We automate the copying, chasing and re-entering between the tools you already use. Where an AI agent is the useful part, we build a bounded one and put governance around it: what it can access, what it can do, and where a person still approves.",
    situation:
      "For teams pasting between a handful of tools, or trying an AI agent with no shared rules. You do not need a named AI project to start.",
    problems: [
      "Customer questions wait while someone searches for the answer.",
      "The same details are typed into more than one system.",
      "Follow-ups depend on who remembers to send them.",
      "An AI agent is in use, but nobody has agreed what it can see or do.",
    ],
    deliverables: [
      "An AI agent, or a plain workflow, for one defined piece of work.",
      "Governance for it: access, allowed actions, approval, review, and an owner after launch.",
      "Connections to the systems that already hold the information.",
      "Operating notes the team can run without us in the room.",
    ],
    process: [
      {
        title: "Name the work",
        body: "We follow one real workflow. What starts it, who touches it, and where it gets stuck.",
      },
      {
        title: "Choose the intervention",
        body: "Sometimes that is an AI agent. Sometimes it is a plain automation, or a clearer handoff with no model in it. We say which, and why.",
      },
      {
        title: "Build the bounded version",
        body: "We connect the systems we agreed, and we write the governance: what the agent can see, what it can do, and where it must stop.",
      },
      {
        title: "Hand it over",
        body: "You get the operating notes: what it can access, where a person approves, how activity is reviewed, and who owns it.",
      },
    ],
    boundaries: [
      "An AI agent is not the default. We use one when a person would otherwise repeat the same judgement, and governance is agreed before it runs.",
      "Ongoing oversight is part of the engagement only if we agree it.",
      "We name the specific tools in the proposal, after we have seen how you use them.",
      "We quote once we understand the work, and confirm the fee before anything is paid.",
    ],
    proof: [
      {
        href: "/case-studies/dubai-7s-ticketing",
        image: "/case-studies/dubai-7s-cover.webp",
        title: "Emirates Dubai 7s",
        note: "Ticketing and entry that had to hold when the gates opened.",
      },
      {
        href: "/case-studies/syntheve",
        image: "/case-studies/syntheve-fullpage-cover.webp",
        title: "Syntheve",
        note: "An AI-assisted resume workflow, with a person still checking the result.",
      },
    ],
    faqs: [
      {
        question: "Do you build AI agents?",
        answer:
          "Yes, when an agent is the useful part of a workflow. It gets a defined job, limited access, and a person who can stop, edit or approve. If a plain automation would do the job, we say so.",
      },
      {
        question: "What does AI agent governance include?",
        answer:
          "What the agent can access, what it is allowed to do, where a person has to approve, how activity is reviewed, and who owns it after launch. Those limits are agreed before it runs.",
      },
      {
        question: "Will this replace someone on the team?",
        answer:
          "The aim is to take repetitive steps out of a job, not to announce a headcount change. We say which steps stay with a person.",
      },
      {
        question: "Can it send messages to customers on its own?",
        answer:
          "Only if we explicitly agree that, and only for the cases we define. Otherwise it prepares a draft and waits.",
      },
    ],
  },
  {
    path: "/services/websites-web-apps",
    label: "Websites and web apps",
    eyebrow: "Build",
    title: "Websites and web apps that make things easier.",
    lede: "Business sites, customer-facing applications, internal tools, and prototypes, built around a task a customer or a colleague needs to finish.",
    situation:
      "For owners who need a site or a tool that matches how the business actually works. A prototype is available when you need to learn something before committing to a larger build.",
    problems: [
      "Customers cannot find the answer without calling.",
      "Staff rely on a spreadsheet or an inbox for work that should have a simple tool.",
      "An idea needs a tryout before a full build.",
      "The current site describes the company and does not help anyone complete a task.",
    ],
    deliverables: [
      "A business website with a clear next step.",
      "A customer-facing or internal web application.",
      "A prototype with a specific question it is meant to answer.",
      "A production build when the prototype, or the brief, has earned it.",
    ],
    process: [
      {
        title: "Start from the task",
        body: "Who is it for, what they are trying to do, and what gets in the way today.",
      },
      {
        title: "Decide how far to go",
        body: "A prototype, a site, or a production application. We recommend one, based on what you need to learn and what you are ready to run.",
      },
      {
        title: "Design and build",
        body: "You see the thing while it is being made. Scope stays attached to the task we agreed.",
      },
      {
        title: "Leave it operable",
        body: "Handover includes where it lives, how to change ordinary content, and what still needs a developer.",
      },
    ],
    boundaries: [
      "We will recommend a conventional site or a form when that is the better fix.",
      "We don’t promise a delivery in two weeks, and we quote after we understand the work.",
      "A prototype answers a question. It is not automatically the first phase of a larger contract.",
    ],
    proof: [
      {
        href: "/case-studies/wenanny",
        image: "/case-studies/wenanny-hero.webp",
        title: "WeNanny",
        note: "A care marketplace with explainable matching.",
      },
      {
        href: "/case-studies/paul-ries-ethiopia",
        image: "/case-studies/paul-ries-cover.webp",
        title: "Paul Ries & Sons Ethiopia",
        note: "A heritage site for a mobility business.",
      },
      {
        href: "/case-studies/mazadak-e-auction",
        image: "/case-studies/mazadak-cover.webp",
        title: "Mazadak",
        note: "An e-auction platform for an existing business.",
      },
    ],
    faqs: [
      {
        question: "Do we have to start with a prototype?",
        answer:
          "No. If the task is already clear, we build the site or the application. A prototype is for when you need to learn something first.",
      },
      {
        question: "Can you take over an existing site?",
        answer:
          "Often. We look at what you have before proposing a replacement.",
      },
    ],
  },
  {
    path: "/services/ai-training",
    label: "AI training",
    eyebrow: "Train",
    title: "Help your team use AI with confidence.",
    lede: "AI in Practice, a one-day masterclass for professionals and teams: how AI works, where it falls short, and how to put it to work with sensible boundaries. Also run as a tailored corporate workshop.",
    situation:
      "For teams experimenting in different tools, with no common habits. This is teaching and practice, not a certificate.",
    problems: [
      "Everyone has tried a chatbot. The outputs are inconsistent.",
      "People are unsure what customer or business information is safe to share.",
      "Good drafts are hard to tell from confident nonsense.",
      "Leaders want the team capable, without a new platform project.",
    ],
    deliverables: [
      "The AI 101 module, using your actual work rather than a generic slideshow.",
      "Exercises in drafting, checking and rejecting an answer.",
      "A short written reminder of the limits you want the team to keep.",
    ],
    process: [
      {
        title: "Learn the work",
        body: "We ask which tasks people already attempt with AI, and which information they handle.",
      },
      {
        title: "Run the session",
        body: "People practise on examples close to their role. We show what to verify before anything is sent or filed.",
      },
      {
        title: "Leave a reference",
        body: "If follow-up notes are part of the engagement, you get them. That is agreed beforehand, not assumed.",
      },
    ],
    boundaries: [
      "ROQ CX does not offer accredited or certified training.",
      "Corporate workshops agree group size, location and tailoring with each organisation.",
      "A workshop does not include an automation build unless that is a separate engagement.",
      "We confirm the fee once we know the group and what you want covered.",
    ],
    proof: [],
    faqs: [
      {
        question: "Do people need to be technical?",
        answer:
          "No. The session is for the people doing the work. We avoid model names unless they help a specific point.",
      },
      {
        question: "Is this a certification?",
        answer: "No. There is no accreditation attached to these sessions.",
      },
    ],
  },
]

export const opportunityReview = {
  path: "/ai-opportunity-review",
  eyebrow: "Start here",
  title: "Find a sensible place to start.",
  lede: "A short look at one workflow: where AI might help, and where it should not. You leave with a recommended next step. If there is a fee, we agree it before any paid work starts.",
  situation:
    "For owners and operators who are already experimenting and want a judgement about what is worth doing next. You do not need a solution in mind.",
  problems: [
    "There are several ideas and no order.",
    "A tool was bought, or tried, and it is not clear whether it changed the work.",
    "Customer experience and back-office admin are tangled together.",
  ],
  deliverables: [
    "A summary of the current workflow and how AI is already being used.",
    "A short list of opportunities, in an order.",
    "Notes on data, approval and whether the team would actually use it.",
    "A recommended pilot, or a recommendation not to use AI for this.",
    "What you would measure if you proceed.",
  ],
  process: [
    {
      title: "You tell us where it gets stuck",
      body: "The enquiry form is enough to start. We will ask for a follow-up if we need one.",
    },
    {
      title: "We look at one workflow",
      body: "Not the whole company. One place customers wait, or one place the team retypes.",
    },
    {
      title: "You get a recommendation",
      body: "Build, automate, train, or leave it. The review is not an implementation plan.",
    },
  ],
  boundaries: [
    "Asking for the review does not start paid work. If there is a fee, we agree it first.",
    "The output is a recommendation and a proposed pilot, not a finished system.",
    "We may tell you not to automate it.",
  ],
  proof: [] as ProofLink[],
  faqs: [
    {
      question: "Do we need to know what we want automated?",
      answer: "No. Bring the friction. We will say whether automation belongs.",
    },
    {
      question: "What does it cost?",
      answer:
        "The form starts the conversation. We’ll tell you if there is a fee before any paid work begins.",
    },
  ] as Faq[],
}

export const homeFaqs: Faq[] = [
  {
    question: "We already use ChatGPT. What would you help us do differently?",
    answer:
      "A shared way of working. We look at a real task, decide whether AI belongs in it, and if it does, put it where the team can use it with someone still accountable.",
  },
  {
    question: "Do we need to know what we want to automate?",
    answer:
      "No. Start from what is slow or frustrating. The opportunity review does not begin with a tool list.",
  },
  {
    question: "Can you work with our existing tools?",
    answer:
      "Usually, yes. We confirm the specific systems in the proposal, after we have seen how you use them.",
  },
  {
    question: "Will our team need technical skills?",
    answer:
      "Not to use what we ship. Someone on your side still owns the process. We name that person before we build.",
  },
  {
    question: "How do you decide whether AI is appropriate?",
    answer:
      "If a clearer page, a form, or a plain workflow would do the job, we say so.",
  },
  {
    question: "What happens to customer or business information?",
    answer:
      "Do not put it in the enquiry form. In an engagement, access is limited to what the work needs, and we agree that before anything is connected.",
  },
  {
    question: "Can we start with a small pilot?",
    answer:
      "Yes. A recommendation can be a small pilot with something to measure. It is not a commitment to a large build.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Handover, including who operates the thing, is part of the engagement. Ongoing support exists only if we agree it.",
  },
  {
    question: "How are engagements priced?",
    answer:
      "After we understand the work. We’ll tell you the fee before anything is paid.",
  },
]

export const serviceNav = [
  ...services.map((service) => ({ href: service.path, label: service.label })),
  { href: opportunityReview.path, label: "AI Opportunity Review" },
]
