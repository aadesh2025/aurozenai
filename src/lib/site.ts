// Single source of truth for site config. Items marked TODO need real values from Aadesh.

export const SITE = {
  name: "AUROZEN AI",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurozen.ai", // TODO confirm domain
  description:
    "AUROZEN AI helps businesses identify opportunities for AI, automate complex workflows, build intelligent business systems, and integrate AI into existing operations.",
  email: "aurozenai@gmail.com",
  // TODO: confirm product name + public URLs for the SaaS
  product: { name: "VICERO", appUrl: "https://vicero-ai.vercel.app/" },
  calendarUrl: null as string | null, // TODO: Cal.com / Calendly embed URL
  clientPortalUrl: null as string | null, // TODO
};

// Pricing policy: ONLY consulting and auditing may show a starting price.
// Set these to the approved amounts, e.g. "$1,500". null => no price is rendered.
export const PRICING = {
  consulting: null as string | null,
  audit: null as string | null,
};

export type NavItem = { label: string; href: string; desc?: string };
export type NavGroup = { label: string; href?: string; items?: NavItem[] };

export const NAV: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "AI Consulting", href: "/services/ai-consulting", desc: "Where AI is useful, and what to do first" },
      { label: "AI Auditing", href: "/services/ai-audit", desc: "Structured assessment of readiness and systems" },
      { label: "AI Automation", href: "/services/ai-automation", desc: "Automate repetitive business processes" },
      { label: "AI Agents", href: "/services/ai-agents", desc: "Tool-using agents with approval checkpoints" },
      { label: "AI Chatbots", href: "/services/ai-chatbots", desc: "FAQ to business-integrated assistants" },
      { label: "RAG & Knowledge Systems", href: "/services/rag-knowledge-systems", desc: "AI that works with your own information" },
      { label: "AI Voice Agents", href: "/services/ai-voice-agents", desc: "Custom voice solutions" },
      { label: "AI Integration", href: "/services/ai-integration", desc: "Fit AI into your existing software" },
      { label: "Intelligent Business Systems", href: "/services/intelligent-business-systems", desc: "Combined, cohesive solutions" },
      { label: "Support & Maintenance", href: "/services/ai-support-maintenance", desc: "Ongoing support after deployment" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Consulting Levels", href: "/consulting/levels" },
      { label: "Audit Types", href: "/auditing/audit-types" },
      { label: "AI Readiness Assessment", href: "/assessment" },
      { label: "Book a Consultation", href: "/book-consultation" },
    ],
  },
  {
    label: "Industries",
    items: [
      { label: "Professional Services", href: "/industries/professional-services" },
      { label: "Healthcare & Clinics", href: "/industries/healthcare" },
      { label: "E-commerce & Retail", href: "/industries/ecommerce" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Small & Medium Businesses", href: "/industries/smbs" },
    ],
  },
  {
    label: "Our Work",
    items: [
      { label: "Portfolio", href: "/work" },
      { label: "Technology & Integrations", href: "/technology-integrations" },
      { label: "Engineering Standards", href: "/engineering-standards" },
      { label: "VICERO", href: "/products/vicero" },
      { label: "Custom Implementation", href: "/products/custom-implementation" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Articles", href: "/insights" },
      { label: "FAQs", href: "/resources/faq" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/company/about" },
      { label: "Our Approach", href: "/company/approach" },
      { label: "How We Work", href: "/company/how-we-work" },
      { label: "Partner With Us", href: "/partners", desc: "Sales partners, developers, and AI specialists" },
      { label: "Contact", href: "/contact" },
      { label: "Client Support", href: "/support" },
    ],
  },
];

export const PHASES = [
  { name: "Discover", text: "Understand the business, processes, current technology, and desired outcomes." },
  { name: "Assess", text: "Evaluate feasibility, risks, constraints, data availability, integrations, and approaches." },
  { name: "Design", text: "Define the architecture, workflow, components, permissions, and implementation plan." },
  { name: "Build", text: "Implement the agreed solution using suitable technologies." },
  { name: "Integrate", text: "Connect the solution to existing systems where technically feasible." },
  { name: "Validate", text: "Test functionality, integration behavior, failure scenarios, and agreed performance criteria." },
  { name: "Deploy", text: "Deploy to the agreed environment: client-managed, cloud, or another supported arrangement." },
  { name: "Support", text: "Provide the agreed maintenance, troubleshooting, monitoring, and improvements." },
];

export const SERVICE_OPTIONS = [
  "AI Consulting",
  "AI Auditing",
  "AI Automation",
  "AI Agents",
  "AI Chatbots",
  "RAG & Knowledge Systems",
  "AI Voice Agents",
  "AI Integration",
  "Intelligent Business Systems",
  "Support & Maintenance",
  "VICERO / Custom Implementation",
  "Not sure yet",
];
