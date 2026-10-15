export type Article = {
  slug: string;
  title: string;
  category: string;
  intro: string;
  takeaways: string[];
  body: { h: string; p: string[] }[];
  related: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "identify-high-value-ai-automation-opportunities",
    title: "How to Identify High-Value AI Automation Opportunities",
    category: "AI Automation",
    intro: "Not every process deserves automation. The ones that do share a few traits you can check in an afternoon.",
    takeaways: ["Start from frequency and pain, not from technology", "Score candidates on volume, rule clarity, error cost, and access", "Pilot one process before building a program"],
    body: [
      { h: "Start with a list, not a tool", p: ["Most teams begin by asking what AI can do. A better starting point is a plain list of repetitive tasks: who does it, how often, and how long it takes each time. Include the small things. Five-minute tasks done fifty times a week add up faster than one big monthly report.", "Ask the people who do the work, not only their managers. They know where the copy-paste steps and the workarounds are."] },
      { h: "Score each candidate on four factors", p: ["Volume: how many times a week does it happen? Rule clarity: can you write down how a person decides what to do? Error cost: what happens if it goes wrong, and can someone catch it? Access: do the systems involved offer an API, a webhook, or an export?", "A task that is frequent, rule-based, low-risk, and well connected is a strong candidate. A task that is rare, subjective, or locked inside software with no access is not, however exciting the AI behind it sounds."] },
      { h: "Separate the AI part from the plumbing", p: ["Many 'AI' projects are mostly plumbing: moving data between tools reliably. The AI step might only be classification or extraction in the middle. Naming this honestly helps you budget correctly and choose simpler tools where they will do.", "Where judgement is involved, plan a review step. A person approving a drafted reply costs seconds and prevents the expensive mistakes."] },
      { h: "Check the data and the tools", p: ["Look at what the process reads and writes. Clean, structured inputs automate easily. Scanned PDFs, free-text notes, and several versions of the same spreadsheet need extra work first.", "Also check permissions. An automation needs access to act. If getting that access will take months of approvals, factor that into the order you tackle things."] },
      { h: "Pilot one, measure, then expand", p: ["Pick the highest-scoring process with the lowest risk. Define what 'better' means before you start: time per task, errors caught, turnaround. Run it alongside the manual process for a short period, compare, and only then widen it.", "A readiness assessment or a short consulting engagement can do this prioritisation with you if you would rather not guess."] },
    ],
    related: ["ai-automation", "ai-consulting", "ai-audit"],
  },
  {
    slug: "ai-audit-vs-ai-consulting",
    title: "AI Audit vs. AI Consulting: What's the Difference?",
    category: "AI Auditing",
    intro: "Both are advisory, but they answer different questions. Picking the wrong one wastes time and budget.",
    takeaways: ["Consulting looks forward: what should we do and in what order", "Auditing looks at what exists, or at how ready you are", "If you already run AI, audit first; if not, start with consulting or a readiness audit"],
    body: [
      { h: "Consulting is about decisions", p: ["AI consulting helps you decide where AI is useful, which technologies fit, and how to sequence the work. The output is direction: a prioritised list, an architecture recommendation, a roadmap.", "It suits teams that know they want to do something with AI but are not sure what, or that have several ideas and need to choose."] },
      { h: "An audit is about evidence", p: ["An audit examines something specific. A readiness audit looks at whether your processes, data, and systems can support AI. A systems audit looks at an existing AI tool: how reliable it is, how it handles data, where it fails. An opportunity audit ranks your processes by automation potential.", "The output is findings: what is true today, what the risks are, and what to fix first."] },
      { h: "What an audit is not", p: ["It is not a certification, a regulatory approval, or a security guarantee. It is an engineering assessment by people who build these systems. If you need formal certification, that is a separate process with a different body."] },
      { h: "Which should you buy first?", p: ["If you have no AI in production, start with consulting or a readiness audit. If a chatbot or automation is already live and you have doubts about accuracy, cost, or data handling, audit it before building more.", "They also combine well: an audit often produces the evidence that makes a consulting roadmap realistic."] },
    ],
    related: ["ai-audit", "ai-consulting"],
  },
  {
    slug: "when-should-a-business-use-rag",
    title: "When Should a Business Use RAG?",
    category: "RAG and Knowledge Systems",
    intro: "Retrieval-augmented generation helps an AI answer from your own, changing information. It is not always the right tool.",
    takeaways: ["RAG fits when answers must come from your documents", "It improves relevance but does not guarantee correctness", "Evaluate retrieval and answers on real questions before launch"],
    body: [
      { h: "What RAG actually does", p: ["A language model knows a lot in general and nothing specific about your business. RAG fixes that at question time: the system searches your documents for relevant passages and hands them to the model with the question. The model then answers using that material, ideally citing it.", "Because your content stays in your own store, updating an answer means updating a document, not retraining a model."] },
      { h: "Where it fits", p: ["Internal policy and procedure search, product and technical documentation, support knowledge bases, and research across a large document set are all good fits. The common thread is a lot of text, frequent questions, and answers that need to be traceable."] },
      { h: "Where it does not", p: ["If your knowledge fits comfortably on a page, put it in the prompt. If the task needs exact calculation or live data, you want a tool call or a database query, not retrieval. If your documents are out of date or contradict each other, RAG will faithfully surface the mess."] },
      { h: "The limits you should plan for", p: ["RAG reduces wrong answers but does not remove them. Retrieval can miss the right passage. The model can misread a good one. Permissions matter too: a system should only retrieve what the asker is allowed to see.", "Good systems say 'I could not find that' rather than guessing, show their sources, and are tested on a set of real questions before launch and again after content changes."] },
    ],
    related: ["rag-knowledge-systems", "ai-chatbots", "ai-agents"],
  },
  {
    slug: "integrating-ai-into-existing-business-software",
    title: "Integrating AI Into Existing Business Software",
    category: "Implementation and Integration",
    intro: "You rarely need to replace your stack. You need to know what each tool will let you do.",
    takeaways: ["Feasibility depends on APIs, webhooks, and permissions", "Give the AI layer the least access it needs", "Budget for maintenance when upstream APIs change"],
    body: [
      { h: "Start with the interfaces", p: ["For each system involved, find out how data gets in and out. A documented API or webhook support is the best case. A scheduled export is workable. A tool with neither may be a poor candidate until that changes.", "Do not assume that because a vendor has an API, the thing you want is exposed through it. Check the specific actions and fields."] },
      { h: "Decide what the AI may touch", p: ["Treat the AI layer like a new employee: it gets only the access its job requires. Read-only where possible. Write access for specific actions, with logs. Anything involving money or customer communication should have an approval step until you trust the behaviour."] },
      { h: "Map the data", p: ["Fields rarely line up neatly between systems. Decide which system is the source of truth for each piece of data, how records are matched, and what happens on conflicts or duplicates. This unglamorous mapping is where most integration time goes."] },
      { h: "Plan for failure and for change", p: ["Calls will time out, rate limits will bite, and vendors will change their APIs. Build retries and alerts, and decide who looks when something breaks. A support arrangement that covers integration updates is not a luxury here."] },
    ],
    related: ["ai-integration", "ai-automation", "ai-support-maintenance"],
  },
  {
    slug: "evaluating-ai-voice-agents",
    title: "What Businesses Should Evaluate Before Deploying AI Voice Agents",
    category: "AI Voice Technology",
    intro: "Voice raises the bar on speed and reliability. A pause that is fine in chat is awkward on a phone call.",
    takeaways: ["Measure end-to-end latency, not just model speed", "Check telephony compatibility early", "Always define when and how a human takes over"],
    body: [
      { h: "Latency is the experience", p: ["On a call, people expect a reply within about a second. Speech recognition, the model, any tool calls, and speech synthesis all add delay. Test the whole chain on real phone audio, not on a laptop microphone in a quiet room."] },
      { h: "Quality in real conditions", p: ["Accents, background noise, bad lines, and people talking over the agent all affect recognition. Test with the callers you actually have, and decide what the agent does when it is not sure what it heard."] },
      { h: "Telephony and integrations", p: ["Numbers, call routing, recording rules, and your phone provider's capabilities shape what is possible. Confirm early how calls will reach the agent and how it will reach your calendar or CRM."] },
      { h: "Handoff and honesty", p: ["Define exactly when a person takes over: caller asks, agent stuck twice, certain topics. Make the transfer smooth and pass along a summary. Check the disclosure and call-recording rules that apply in the places you operate.", "Treat voice as a project with testing and monitoring, not a switch you flip."] },
    ],
    related: ["ai-voice-agents", "ai-chatbots"],
  },
];
