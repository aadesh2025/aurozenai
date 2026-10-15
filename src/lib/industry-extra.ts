// Per-industry detail: a "day in the life" comparison, an example workflow, and questions. All illustrative.
export type Extra = {
  scenario: { title: string; before: string[]; after: string[] };
  flow: string[];
  stackNote: string;
  faqs: { q: string; a: string }[];
};

export const EXTRA: Record<string, Extra> = {
  "professional-services": {
    scenario: {
      title: "A new inquiry arrives at a small advisory firm",
      before: ["Inquiry sits in a shared inbox until someone notices", "A partner reads it to judge if it is a fit", "Intake forms are emailed back and forth", "Details are retyped into the practice system"],
      after: ["The inquiry is classified and key facts extracted", "A short summary and fit flag reach the right person", "A client intake form is sent automatically", "Approved fields are written to the practice system for review"],
    },
    flow: ["Inquiry form", "Extract and classify", "Fit flag + summary", "Partner approves", "Intake sent", "Record created"],
    stackNote: "Typically a website form, an email provider, a calendar, and a practice-management or CRM tool.",
    faqs: [
      { q: "Can the system see client-confidential files?", a: "Only what you grant. Retrieval can be restricted by matter or client so one client's documents never answer another's questions." },
      { q: "Will it draft advice?", a: "We design for administrative and internal-knowledge tasks. A qualified professional reviews anything that could be advice." },
    ],
  },
  healthcare: {
    scenario: {
      title: "A clinic front desk during a busy morning",
      before: ["Phones ring while staff check patients in", "The same questions about hours, directions, and forms repeat", "Rescheduling means calling back and forth", "Staff search several documents for policy answers"],
      after: ["After-hours and busy-time calls get a first response and a message", "General questions are answered from approved clinic information", "Rescheduling requests are queued for staff or handled within set rules", "Staff ask an internal assistant that cites the policy it used"],
    },
    flow: ["Call or chat", "Intent detected", "General info answered", "Anything clinical → human", "Booking request queued", "Staff confirms"],
    stackNote: "Often a phone system, a scheduling tool, and internal documents. Patient data handling needs particular care and your own advisers.",
    faqs: [
      { q: "Does it give medical advice?", a: "No. It handles administrative tasks and general information from approved content, and routes anything clinical to a person." },
      { q: "Are you HIPAA/GDPR compliant?", a: "We do not make blanket compliance claims. Requirements depend on your country and setup and need review with your own advisers." },
    ],
  },
  ecommerce: {
    scenario: {
      title: "Order questions on a sale weekend",
      before: ["Hundreds of 'where is my order' messages", "Agents switch between the storefront and courier sites", "Returns questions get inconsistent answers", "Daily sales and stock reports are assembled by hand"],
      after: ["Order-status questions are answered from live order data", "Policy questions are answered from your returns and shipping pages", "Refunds and exceptions are routed to staff with context", "A daily summary is generated automatically"],
    },
    flow: ["Customer message", "Lookup order", "Answer from policy", "Exception → staff", "Update ticket", "Daily report"],
    stackNote: "Usually a storefront platform, a courier or shipping tool, and a helpdesk. API access to orders is the key requirement.",
    faqs: [
      { q: "Can it issue refunds?", a: "Only if you set clear rules and an approval step. By default we recommend a human approves money movements." },
      { q: "Does it work with my platform?", a: "If the platform exposes the data we need through an API or webhooks, we can assess it. We validate per project." },
    ],
  },
  "real-estate": {
    scenario: {
      title: "A weekend portal inquiry for a listing",
      before: ["The inquiry waits until Monday", "The agent copies details into the CRM later", "Viewing times are negotiated over several messages", "Follow-ups depend on someone remembering"],
      after: ["The inquirer gets an immediate reply with listing facts", "Details and intent are logged in the CRM", "Viewing slots are offered from the agent's calendar", "Follow-up reminders are scheduled automatically"],
    },
    flow: ["Portal inquiry", "Instant reply", "Qualify budget + area", "Offer viewing slots", "CRM updated", "Follow-up scheduled"],
    stackNote: "A listing source, a CRM, email or messaging, and a calendar. Consent for follow-up messaging matters.",
    faqs: [
      { q: "Can it answer from our listings?", a: "Yes, if the listing data is available to us in a usable form and kept up to date." },
      { q: "Will it message people without consent?", a: "No. We build around the consent rules that apply to you." },
    ],
  },
  smbs: {
    scenario: {
      title: "A 10-person business with tools that never talk to each other",
      before: ["The owner copies leads from forms into a spreadsheet", "Customer emails are answered in the evening", "Invoices are keyed in by hand", "Nobody has time to look at the whole picture"],
      after: ["Leads flow into one place and the owner gets a daily digest", "Common questions get an instant first reply with handoff to a person", "Invoice details are extracted for review before entry", "A short weekly report shows what happened"],
    },
    flow: ["Pick one workflow", "Map it", "Automate it", "Measure it", "Expand"],
    stackNote: "Whatever you already use. We usually start with one process and grow from there.",
    faqs: [
      { q: "Where do we start with a small budget?", a: "One painful process. Our readiness assessment or a short consultation helps pick it." },
      { q: "Do we need technical staff?", a: "No. We document what we build and offer agreed support." },
    ],
  },
};
