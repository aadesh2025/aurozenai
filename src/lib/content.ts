export type Industry = {
  slug: string;
  name: string;
  intro: string;
  problems: string[];
  uses: string[];
  considerations: string[];
  services: string[];
  notice?: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "professional-services",
    name: "Professional Services",
    intro: "Firms selling expertise lose hours to intake, document handling, and finding internal knowledge.",
    problems: ["Inquiries that need qualifying before a partner's time", "Onboarding paperwork", "Precedent and policy buried in shared drives"],
    uses: ["Lead qualification", "Document processing", "Client onboarding", "Appointment scheduling", "Internal knowledge retrieval"],
    considerations: ["Client confidentiality and access separation", "Matter- or client-level permissions in retrieval", "Review of AI-drafted output by a professional"],
    services: ["ai-automation", "rag-knowledge-systems", "ai-agents"],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    intro: "Clinics carry heavy administrative load. AI can help with administrative workflows, not clinical decisions.",
    problems: ["Phone-heavy appointment handling", "Repetitive general questions", "Hard-to-search internal documentation"],
    uses: ["Administrative workflow automation", "Appointment assistance", "General patient inquiries", "Internal documentation retrieval"],
    considerations: ["Privacy and security of patient data, minimized by design", "Human review for anything beyond general information", "Applicable regional rules must be assessed with your own advisers"],
    services: ["ai-chatbots", "ai-voice-agents", "rag-knowledge-systems"],
    notice: "AUROZEN AI does not provide medical advice and does not guarantee regulatory compliance. Solutions are administrative aids reviewed by your staff.",
  },
  {
    slug: "ecommerce",
    name: "E-commerce & Retail",
    intro: "Store teams answer the same product and order questions repeatedly while operational data sits in separate tools.",
    problems: ["High volume of order-status and product questions", "Disconnected storefront, support, and CRM", "Manual reporting"],
    uses: ["Product-information assistants", "Order-support workflows", "Customer-service automation", "CRM integration", "Internal operational reporting"],
    considerations: ["Storefront and order-system API access", "Refund and account actions need approval rules", "Catalog freshness"],
    services: ["ai-chatbots", "ai-automation", "ai-integration"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    intro: "Speed of response decides who wins an inquiry, and agents lose time on follow-up admin.",
    problems: ["Inquiries arriving outside working hours", "Leads routed by hand", "CRM updated late or not at all"],
    uses: ["Property inquiries", "Lead routing", "Appointment coordination", "CRM updates", "Follow-up automation"],
    considerations: ["Listing data sources and freshness", "Consent for follow-up messaging", "Calendar integration across agents"],
    services: ["ai-automation", "ai-voice-agents", "ai-chatbots"],
  },
  {
    slug: "smbs",
    name: "Small & Medium Businesses",
    intro: "Practical implementations for businesses that need better processes without unnecessary technical complexity.",
    problems: ["Owners doing admin that should be automated", "Tools that were never connected", "No in-house technical team"],
    uses: ["One workflow first, then expand", "Customer-question assistant", "Lead capture to CRM", "Simple reporting"],
    considerations: ["Phased implementation", "Existing software stays", "Measurable objectives agreed up front", "Operational constraints and budget"],
    services: ["ai-consulting", "ai-automation", "ai-chatbots"],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: "Prototype" | "Concept" | "In production";
  data: string;
  summary: string;
  sections: { title: string; text: string }[];
};

// Illustrative only. Replace with real, verified projects. Nothing here is a client result.
export const PROJECTS: Project[] = [
  {
    slug: "lead-routing-workflow",
    title: "Lead Capture and Routing Workflow",
    category: "AI automation",
    status: "Concept",
    data: "Sample data only. No client involved.",
    summary: "A reference design for capturing form leads, enriching, scoring, and routing to a CRM.",
    sections: [
      { title: "The problem", text: "Leads arrive from several forms and wait for manual sorting." },
      { title: "Business requirements", text: "Route within minutes, avoid duplicates, notify the right owner." },
      { title: "Proposed architecture", text: "Webhook intake, validation, AI-assisted classification, CRM write, notification." },
      { title: "Testing and validation", text: "Duplicate, malformed, and CRM-outage cases." },
      { title: "Outcomes", text: "None measured. This is a concept page." },
    ],
  },
  {
    slug: "knowledge-assistant",
    title: "Document Knowledge Assistant",
    category: "RAG and knowledge systems",
    status: "Prototype",
    data: "Sample documents only.",
    summary: "A prototype answering questions from a small public document set with source citations.",
    sections: [
      { title: "The problem", text: "Staff waste time searching long documents." },
      { title: "Architecture", text: "Ingestion, chunking, embeddings, retrieval, cited answer." },
      { title: "Testing", text: "Question set with expected sources." },
      { title: "Lessons learned", text: "Chunking strategy dominates retrieval quality." },
    ],
  },
];

export { ARTICLES, type Article } from "./articles";

export const FAQ_GROUPS: { group: string; link: string; items: { q: string; a: string }[] }[] = [
  { group: "AI consulting", link: "/services/ai-consulting", items: [{ q: "What does consulting produce?", a: "Written findings, a prioritized list, and a roadmap, scoped per engagement." }] },
  { group: "AI auditing", link: "/services/ai-audit", items: [{ q: "Is an audit a certification?", a: "No. It is an engineering assessment." }] },
  { group: "Automation", link: "/services/ai-automation", items: [{ q: "Can you connect our CRM?", a: "Where it has an API or webhook and access is granted." }] },
  { group: "AI agents", link: "/services/ai-agents", items: [{ q: "Do agents act on their own?", a: "Within permissions you define, with approval for higher-risk actions." }] },
  { group: "RAG", link: "/services/rag-knowledge-systems", items: [{ q: "Will answers always be right?", a: "No. RAG improves relevance but is evaluated, not guaranteed." }] },
  { group: "Voice agents", link: "/services/ai-voice-agents", items: [{ q: "Do they sound human?", a: "We make no such promise; quality is tested." }] },
  { group: "Integrations", link: "/services/ai-integration", items: [{ q: "Do you have prebuilt connectors?", a: "Integrations are scoped per project." }] },
  { group: "Project delivery", link: "/company/how-we-work", items: [{ q: "How does a project run?", a: "Inquiry, discovery, assessment, proposal, architecture, development, testing, deployment, support." }] },
  { group: "Security and privacy", link: "/engineering-standards", items: [{ q: "Are you certified?", a: "We make no certification claims. See Engineering Standards for practices." }] },
  { group: "Deployment", link: "/company/how-we-work", items: [{ q: "Where can it run?", a: "In an agreed environment, subject to feasibility and what we can support." }] },
  { group: "Maintenance and support", link: "/services/ai-support-maintenance", items: [{ q: "Is support included?", a: "Only as agreed. Monthly support is a separate engagement." }] },
  { group: "Commercial engagement", link: "/contact", items: [{ q: "How do I get a quote?", a: "Describe your project and request a tailored proposal." }] },
];

export type IntStatus = "Supported" | "Requires technical validation" | "Requires custom implementation" | "Not currently supported";
// Statuses are placeholders until verified. Never mark Supported without having built it.
export const INTEGRATIONS: { category: string; items: { name: string; status: IntStatus; use: string; needs: string }[] }[] = [
  { category: "AI models and providers", items: [{ name: "Groq API", status: "Supported", use: "Model inference for chat and agents", needs: "API key held by the deployment" }] },
  { category: "Workflow automation", items: [{ name: "n8n", status: "Supported", use: "Orchestrating multi-step workflows", needs: "An n8n instance and credentials per tool" }, { name: "Webhooks", status: "Supported", use: "Triggering workflows from forms and events", needs: "A sender that can POST" }] },
  { category: "Customer support", items: [{ name: "Chatwoot", status: "Supported", use: "Inbox, handoff to humans, conversation history", needs: "Chatwoot account and API token" }] },
  { category: "Deployment", items: [{ name: "Docker", status: "Supported", use: "Packaging and running services", needs: "A host that runs containers" }] },
  { category: "CRM systems", items: [{ name: "Generic CRM with an API", status: "Requires technical validation", use: "Lead creation and updates", needs: "API access, field mapping, write permission" }] },
  { category: "Email and scheduling", items: [{ name: "Email / calendar providers", status: "Requires technical validation", use: "Notifications and booking", needs: "API or SMTP access" }] },
  { category: "Voice and telephony", items: [{ name: "Telephony provider", status: "Requires custom implementation", use: "Inbound and outbound calls", needs: "Provider account and number" }] },
  { category: "Databases and vector search", items: [{ name: "Customer databases", status: "Requires technical validation", use: "Read-only lookups for answers", needs: "Scoped read credentials" }] },
  { category: "Legacy or closed software", items: [{ name: "Software with no API", status: "Not currently supported", use: "-", needs: "Assessed case by case" }] },
];
