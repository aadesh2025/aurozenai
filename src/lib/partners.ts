export type Track = "Business" | "Technical" | "Creative" | "Operations";
export type Comp = "Sales commission" | "Project-based" | "Terms to be agreed";
export type Arrangement = "Part-time" | "Project-based" | "Flexible";
export type Status = "Open for applications" | "Join the talent network";

export type Role = {
  slug: string;
  title: string;
  group: string;
  track: Track;
  summary: string;
  responsibilities: string[];
  required: string[];
  preferred: string[];
  experience: string;
  beginner: boolean;
  arrangement: Arrangement[];
  availability: string;
  compensation: Comp;
  status: Status;
  remote: boolean;
  notes?: string;
};

export const GROUPS = [
  "Sales & Business Development",
  "Client Relationships & Operations",
  "AI & Automation Engineering",
  "Software & Web Development",
  "Product, Research & Quality",
  "Marketing & Growth",
] as const;

const SALES_COMP = "Commission is earned under terms agreed in writing before you start: rate or formula, what counts as your sale, payment timing, and what happens on cancellations or refunds. Leads and sales are not guaranteed, and there is no fixed salary unless separately agreed.";
const PROJECT_COMP = "Scope, deliverables, deadlines, ownership, and payment are agreed before work begins. Paid projects are not guaranteed to exist for every applicant.";

export const COMP_TEXT: Record<Comp, string> = {
  "Sales commission": SALES_COMP,
  "Project-based": PROJECT_COMP,
  "Terms to be agreed": "Responsibilities, hours, and compensation are discussed and agreed before work starts. Nothing is assumed or left open-ended.",
};

export const ROLES: Role[] = [
  {
    slug: "sales", title: "Sales Partner", group: GROUPS[0], track: "Business",
    summary: "Help AUROZEN AI find potential clients and generate legitimate business opportunities.",
    responsibilities: ["Identify businesses that may benefit from our services", "Do approved prospect research", "Reach out through permitted channels", "Introduce relevant services and qualify leads", "Schedule qualified meetings and follow up professionally", "Keep accurate lead and communication records", "Coordinate technical questions with the founder"],
    required: ["Clear written and spoken English", "Reliable follow-up habits", "Willingness to learn the services"], preferred: ["B2B sales or agency experience", "Experience with CRM tools"],
    experience: "Beginners with the right attitude are welcome. Experienced sellers are preferred.", beginner: true, arrangement: ["Part-time", "Flexible"], availability: "A few hours a week or more, agreed in advance", compensation: "Sales commission", status: "Open for applications", remote: true,
    notes: "Beginner-friendly does not mean effortless: results depend on consistent work, and there is no guaranteed income.",
  },
  {
    slug: "business-development", title: "International Business Development Partner", group: GROUPS[0], track: "Business",
    summary: "Build client and referral relationships in markets such as the US, UK, Canada, Australia, and Europe.",
    responsibilities: ["Research industries and prospects", "Build a qualified opportunity pipeline", "Establish professional business relationships", "Match client problems to our capabilities", "Arrange discovery meetings", "Support proposals and commercial discussions", "Help build repeatable acquisition processes"],
    required: ["Demonstrable B2B sales or business development experience", "Strong written communication"], preferred: ["International client experience", "Agency or SaaS sales background"],
    experience: "Experienced. International market experience helps but is not mandatory.", beginner: false, arrangement: ["Part-time", "Flexible"], availability: "Agreed per engagement", compensation: "Sales commission", status: "Open for applications", remote: true,
  },
  {
    slug: "part-time-sales", title: "Part-Time Sales Representative", group: GROUPS[0], track: "Business",
    summary: "Support approved prospecting, outreach, follow-ups, and meeting booking around your own schedule.",
    responsibilities: ["Research prospects", "Use approved outreach templates", "Contact suitable prospects through permitted channels", "Maintain a lead tracker", "Follow up as agreed", "Book qualified meetings when possible", "Report activity and results accurately"],
    required: ["Good written English", "Honest reporting", "A few reliable hours each week"], preferred: ["Customer-facing experience"],
    experience: "No prior sales experience required. Students, homemakers, and part-time workers are welcome.", beginner: true, arrangement: ["Part-time", "Flexible"], availability: "A few hours per week, agreed in advance", compensation: "Sales commission", status: "Open for applications", remote: true,
    notes: "Not a salaried job. You never pay to apply, for training, for software, or for access to work.",
  },
  {
    slug: "sales-manager", title: "Sales Manager", group: GROUPS[0], track: "Business",
    summary: "Organize the sales pipeline and support sales contributors as the business grows.",
    responsibilities: ["Maintain the pipeline", "Coordinate sales contributors", "Define and monitor agreed activity and conversion metrics", "Review lead quality", "Improve scripts and follow-up processes", "Run reporting and sales meetings", "Work with the founder on sales strategy"],
    required: ["Prior sales, sales operations, or team coordination experience"], preferred: ["Experience with CRM and pipeline reporting"],
    experience: "Experienced.", beginner: false, arrangement: ["Part-time", "Flexible"], availability: "Agreed per engagement", compensation: "Terms to be agreed", status: "Join the talent network", remote: true,
    notes: "No authority over pricing, contracts, or strategy unless specifically authorized.",
  },
  {
    slug: "growth", title: "Business Development & Growth Partner", group: GROUPS[0], track: "Business",
    summary: "Develop referral networks, partnerships, and new client-acquisition channels.",
    responsibilities: ["Identify growth opportunities", "Build referral and agency partnerships", "Research customer segments", "Improve client acquisition strategies", "Develop outbound and inbound channels", "Evaluate markets and service opportunities"],
    required: ["Business development, growth, agency, or entrepreneurial experience"], preferred: ["Existing network in a target market"],
    experience: "Experienced.", beginner: false, arrangement: ["Flexible", "Project-based"], availability: "Agreed per engagement", compensation: "Sales commission", status: "Open for applications", remote: true,
  },
  {
    slug: "client-relations", title: "Client Relationship Manager", group: GROUPS[1], track: "Operations",
    summary: "Coordinate client communication, follow-ups, and satisfaction as the client base grows.",
    responsibilities: ["Coordinate client communications", "Record requirements and decisions", "Track questions and follow-ups", "Organize meetings and project updates", "Coordinate with technical contributors", "Escalate delivery, contractual, or technical issues"],
    required: ["Organized, clear communicator", "Comfortable with client-facing work"], preferred: ["Account management or support experience"],
    experience: "Some practical experience preferred.", beginner: false, arrangement: ["Part-time", "Flexible"], availability: "Agreed per engagement", compensation: "Terms to be agreed", status: "Open for applications", remote: true,
    notes: "No promise of 24/7 support or guaranteed response times.",
  },
  {
    slug: "business-operations", title: "Business Operations & Project Coordinator", group: GROUPS[1], track: "Operations",
    summary: "Keep projects organized: tasks, milestones, documentation, and communication.",
    responsibilities: ["Organize tasks and schedules", "Track milestones and outstanding work", "Coordinate between clients and contributors", "Maintain project documentation", "Improve operational processes", "Identify and escalate delivery risks", "Support onboarding and handoffs"],
    required: ["Strong organization", "Written clarity"], preferred: ["Project coordination or operations experience", "Technical awareness"],
    experience: "Some practical experience preferred.", beginner: false, arrangement: ["Part-time", "Flexible"], availability: "Agreed per engagement", compensation: "Terms to be agreed", status: "Open for applications", remote: true,
  },
  {
    slug: "ai-automation", title: "AI Automation Specialist", group: GROUPS[2], track: "Technical",
    summary: "Build business workflows with n8n, APIs, webhooks, and third-party applications.",
    responsibilities: ["Build business workflows", "Work with n8n, APIs, webhooks, and apps", "Connect business systems", "Implement error handling and testing", "Document workflow behavior and dependencies"],
    required: ["Hands-on workflow automation (n8n or similar)", "Working knowledge of REST APIs and webhooks"], preferred: ["JSON, authentication flows, basic scripting"],
    experience: "Practical projects you can show.", beginner: false, arrangement: ["Project-based", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Open for applications", remote: true,
  },
  {
    slug: "ai-agents", title: "AI Agent Developer", group: GROUPS[2], track: "Technical",
    summary: "Design and build task-oriented agents that use tools, retrieve information, and follow workflows.",
    responsibilities: ["Design task-oriented agents", "Integrate tools and APIs", "Implement structured workflows and decision logic", "Evaluate behavior and failure cases", "Add human approval and safety controls", "Document limitations"],
    required: ["Experience building with LLM APIs and tool calling"], preferred: ["Evaluation methods, TypeScript or Python"],
    experience: "Practical, demonstrable projects.", beginner: false, arrangement: ["Project-based", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Open for applications", remote: true,
  },
  {
    slug: "ai-integration", title: "AI Integration Specialist", group: GROUPS[2], track: "Technical",
    summary: "Connect AI services with websites, CRMs, databases, messaging platforms, and APIs.",
    responsibilities: ["Integrate AI services with business software", "Investigate authentication and integration requirements", "Map data between systems", "Test integration reliability", "Document setup and limitations"],
    required: ["API integration experience", "Understanding of auth (OAuth, tokens)"], preferred: ["CRM or messaging platform integrations"],
    experience: "Practical, demonstrable projects.", beginner: false, arrangement: ["Project-based", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Open for applications", remote: true,
  },
  {
    slug: "ai-ml", title: "AI/ML Engineer", group: GROUPS[2], track: "Technical",
    summary: "Machine learning and model-integration engineering, evaluation, and data pipelines.",
    responsibilities: ["Work on ML and model-related engineering", "Integrate models where appropriate", "Evaluate model performance", "Build or improve data-processing pipelines", "Support experimentation and deployment"],
    required: ["Solid ML or applied-AI engineering background"], preferred: ["Production deployment experience"],
    experience: "Experienced.", beginner: false, arrangement: ["Project-based"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
    notes: "Not every project involves training custom models.",
  },
  {
    slug: "rag-engineering", title: "RAG & Knowledge Systems Engineer", group: GROUPS[2], track: "Technical",
    summary: "Retrieval-augmented generation, document search, and knowledge-grounded applications.",
    responsibilities: ["Build document ingestion pipelines", "Implement chunking, embeddings, retrieval, and search", "Build knowledge-grounded applications", "Evaluate retrieval quality and answer grounding", "Implement source attribution and insufficient-information behavior", "Support vector databases where needed"],
    required: ["Hands-on retrieval or search system experience"], preferred: ["Evaluation tooling, vector databases"],
    experience: "Experienced.", beginner: false, arrangement: ["Project-based"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
  },
  {
    slug: "chatbot-development", title: "AI Chatbot Developer", group: GROUPS[2], track: "Technical",
    summary: "Customer-support bots, FAQ assistants, and knowledge-based conversational experiences.",
    responsibilities: ["Develop FAQ and support chatbots", "Connect knowledge bases", "Implement conversation flows", "Integrate chat interfaces and APIs", "Test response quality and failure handling"],
    required: ["Experience building chat interfaces or bots"], preferred: ["Chatwoot or similar support-desk tools"],
    experience: "Practical projects.", beginner: false, arrangement: ["Project-based", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
  },
  {
    slug: "voice-agents", title: "AI Voice Agent Developer", group: GROUPS[2], track: "Technical",
    summary: "Conversational voice systems: speech services, call flows, and business-system integration.",
    responsibilities: ["Work on conversational voice systems", "Integrate speech services and APIs", "Develop conversation flows", "Test latency, transcription, and response quality", "Support call workflows and integrations"],
    required: ["Experience with speech APIs or telephony"], preferred: ["Real-time audio, low-latency systems"],
    experience: "Experienced.", beginner: false, arrangement: ["Project-based"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
    notes: "We do not claim a production voice platform exists today; this is a project-dependent capability.",
  },
  {
    slug: "full-stack-development", title: "Full-Stack Web Developer", group: GROUPS[3], track: "Technical",
    summary: "Websites, dashboards, APIs, and web applications.",
    responsibilities: ["Build responsive sites and web apps", "Implement frontend and backend features", "Work with APIs, databases, authentication, and deployment", "Maintain code quality and documentation"],
    required: ["Modern frontend and backend experience (for example React and Node)"], preferred: ["Next.js, TypeScript, deployment"],
    experience: "Portfolio of shipped work.", beginner: false, arrangement: ["Project-based", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
  },
  {
    slug: "backend-development", title: "Backend & API Developer", group: GROUPS[3], track: "Technical",
    summary: "Server-side systems, integrations, authentication, and data processing.",
    responsibilities: ["Build APIs and backend services", "Handle authentication and authorization", "Design data models", "Implement integrations and background tasks", "Support reliability, testing, and deployment"],
    required: ["Backend development experience", "Database fundamentals"], preferred: ["Queues, containers, observability"],
    experience: "Portfolio of shipped work.", beginner: false, arrangement: ["Project-based", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
  },
  {
    slug: "qa-evaluation", title: "QA & AI Evaluation Specialist", group: GROUPS[4], track: "Technical",
    summary: "Test workflows, agents, chatbots, and integrations for reliability and correctness.",
    responsibilities: ["Test workflows, agents, chatbots, and integrations", "Write test cases", "Find bugs and unexpected behavior", "Evaluate accuracy, reliability, and edge cases", "Document issues and verify fixes"],
    required: ["Attention to detail", "Clear bug reporting"], preferred: ["Test automation or LLM evaluation experience"],
    experience: "Beginners with strong detail orientation can apply.", beginner: true, arrangement: ["Project-based", "Part-time", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
  },
  {
    slug: "ui-ux-design", title: "UI/UX Designer", group: GROUPS[4], track: "Creative",
    summary: "Interfaces, user journeys, dashboards, and product experiences.",
    responsibilities: ["Design interfaces and user journeys", "Build wireframes and prototypes", "Improve accessibility and usability", "Design dashboards, websites, and product experiences"],
    required: ["Portfolio of interface design work"], preferred: ["Design systems, accessibility knowledge"],
    experience: "Portfolio required.", beginner: false, arrangement: ["Project-based", "Flexible"], availability: "Per project", compensation: "Project-based", status: "Join the talent network", remote: true,
  },
  {
    slug: "technical-research", title: "Technical Researcher", group: GROUPS[4], track: "Technical",
    summary: "Evaluate AI tools, frameworks, models, and implementation approaches.",
    responsibilities: ["Evaluate AI tools and frameworks", "Compare technical approaches", "Research APIs, models, and integration options", "Produce clear notes and prototypes", "Separate tested findings from assumptions"],
    required: ["Curiosity, clear technical writing"], preferred: ["Hands-on prototyping"],
    experience: "Students and early-career applicants welcome.", beginner: true, arrangement: ["Project-based", "Part-time", "Flexible"], availability: "Per project", compensation: "Terms to be agreed", status: "Join the talent network", remote: true,
  },
  {
    slug: "marketing-growth", title: "Marketing, Content & Lead Research", group: GROUPS[5], track: "Creative",
    summary: "Content, SEO research, prospect research, lead lists, and partnership research.",
    responsibilities: ["Content writing and technical documentation", "SEO and market research", "Social media content", "Prospect research and lead-list preparation", "Referral and partnership research"],
    required: ["Good written English", "Careful, honest research"], preferred: ["SEO or content experience"],
    experience: "Students, homemakers, and beginners welcome.", beginner: true, arrangement: ["Part-time", "Project-based", "Flexible"], availability: "A few hours per week, agreed in advance", compensation: "Terms to be agreed", status: "Join the talent network", remote: true,
    notes: "These are possible contribution areas, not guaranteed vacancies.",
  },
];

export const getRole = (slug: string) => ROLES.find((r) => r.slug === slug);

export const SCHEDULES = [
  { who: "College students", fit: "Lead research, part-time sales, appointment setting, content and market research, technical research, and project collaboration where available.", ids: ["part-time-sales", "marketing-growth", "technical-research", "qa-evaluation"] },
  { who: "Homemakers", fit: "Flexible sales outreach, lead research, client follow-ups, content, and administration. Remote contributions where suitable.", ids: ["part-time-sales", "marketing-growth", "client-relations"] },
  { who: "Part-time contributors", fit: "Roles that run on a few agreed hours a week.", ids: ["part-time-sales", "sales", "business-operations"] },
  { who: "Freelancers", fit: "Project-based development, automation, design, research, and specialist consulting.", ids: ["ai-automation", "ai-integration", "ui-ux-design", "technical-research"] },
  { who: "Early-career professionals", fit: "Roles where skills and attitude matter more than years of experience.", ids: ["sales", "qa-evaluation", "marketing-growth"] },
  { who: "Experienced professionals", fit: "International business development, sales management, client management, technical leadership, and specialist AI engineering.", ids: ["business-development", "sales-manager", "growth", "ai-agents"] },
];
