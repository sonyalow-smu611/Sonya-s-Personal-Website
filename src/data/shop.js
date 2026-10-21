// All portfolio content. One basket per section; one item per entry.
// Basket { id, kind, category, sticker?, items: Item[] }
// Item   { name, art?, image?, title, meta, body, links: { label, href }[], sticker? }
// art: file name in public/items (no extension); items without one show the dashed placeholder.
// image: photo shown above the title in the "Scanned item" card. Put the file in public/photos and
//        write its name with extension, e.g. image: 'hoppers.png'. null = no photo.
// href: null = URL not added yet (TODO: fill in Devpost / GitHub links).

export const contact = {
  name: "Sonya Low Ya Xuan",
  email: "s.lowyaxuan@gmail.com",
  github: "https://github.com/sonyalow-smu611",
  linkedin: "www.linkedin.com/in/sonyalow",
};

export const baskets = [
  {
    id: "skills",
    kind: "Fruits",
    category: "Skills",
    items: [
      {
        name: "Banana",
        art: "banana",
        image: null,
        title: "Languages",
        meta: "Skills",
        body: "Python · SQL (PostgreSQL) · JavaScript · HTML · CSS",
        links: [],
      },
      {
        name: "Apple",
        art: "apple",
        image: null,
        title: "Frameworks",
        meta: "Skills",
        body: "React · Next.js · Node.js · Vue.js · Express · FastAPI · Flask · Bootstrap",
        links: [],
      },
      {
        name: "Pomegranate",
        art: "pomegranate",
        image: null,
        title: "Agentic & AI tools",
        meta: "Skills",
        body: "LangChain · LangGraph · LangSmith · OpenAI SDK · Supabase (pgvector) · n8n · Zapier · Make.com",
        links: [],
      },
      {
        name: "Kiwis",
        art: "kiwi",
        image: null,
        title: "Dev tools & libraries",
        meta: "Skills",
        body: "Git · Docker · Google Cloud Platform · PyCharm · Pandas · NumPy · Matplotlib · Seaborn",
        links: [],
      },
    ],
  },
  {
    id: "education",
    kind: "Vegetables",
    category: "Education",
    items: [
      {
        name: "Eggplant",
        art: "eggplant",
        image: null,
        title: "Singapore Management University",
        meta: "BSc Information Systems · Aug 2025 – May 2029",
        body: "Bachelor of Science in Information Systems.",
        links: [],
      },
      {
        name: "Cabbage",
        art: "cabbage",
        image: null,
        title: "Relevant coursework",
        meta: "SMU",
        body: "Web Application Development · Data Analytics · Data Structures & Algorithms · Database Management Systems · Statistics",
        links: [],
      },
      {
        name: "Tomato",
        art: "tomato",
        image: null,
        title: "Raffles Institution",
        meta: "Chemistry Economics History Math · Feb 2023 – Nov 2024",
        body: "86.5 RP",
        links: [],
      },
    ],
  },
  {
    id: "experience",
    kind: "Household",
    category: "Experience",
    sticker: "hot",
    items: [
      {
        name: "Detergent",
        art: "detergent",
        image: "headAILodge.JPG",
        title: "Head of AI Lodge Programme",
        meta: "BIA Club · Jan 2026 – Jun 2027",
        body: "Led a programme on ML, RAG, AI agents, red teaming and deployment. Recruited 70 from 200+ applicants, worked with 20+ mentors, 70+ AI projects completed.",
        links: [{ label: "LinkedIn", href: "https://lnkd.in/p/gfdR8jEf" }],
        sticker: "promotion",
      },
      {
        name: "Sponge",
        art: "sponge",
        image: "lodgementor.JPG",
        title: "Lodge Mentor",
        meta: "BIA Club AI Lodge",
        body: "Taught ML/AI theory up to Transformers; led workshops on LangGraph multi-agent workflows, LLM-as-a-judge evals and agentic RAG.",
        links: [],
      },
      {
        name: "Tissue box",
        art: "tissue",
        image: "mentee.jpeg",
        title: "Lodge Mentee",
        meta: "BIA Club AI Lodge",
        body: "Built an agentic pipeline that turns the past two weeks of headlines into short vertical news videos.",
        links: [{ label: "GitHub", href: null }],
      },
      {
        name: "Light bulb",
        art: "light-bulb",
        image: "fintechhacakthon.jpeg",
        title: "Fintech Innovators Hackathon — 3rd of 200",
        meta: "Mar 2026",
        body: "Macroeconomic news intelligence platform: HeatScore ranking, D3 associations graph, RAG chat assistant.",
        links: [{ label: "LinkedIn", href: "https://lnkd.in/p/g7WZ3ZW5" }],
      },
      {
        name: "Batteries",
        art: "batteries",
        image: "janestreet.jpg",
        title: "Jane Street WiSE Programme",
        meta: "Hong Kong · Jul 2025",
        body: "Selected from a cohort of 70+ women in STEM; trading and risk-management strategy with Jane Street traders.",
        links: [{ label: "LinkedIn", href: "https://lnkd.in/p/g2xvPhEg" }],
      },
    ],
  },
  {
    id: "projects",
    kind: "Snacks",
    category: "Projects",
    sticker: "new-thumb",
    items: [
      {
        name: "Chips",
        art: "chips",
        image: "hoppers.png",
        title: "Hoppers — cafe discovery app",
        meta: "Next.js · Express · React · PostgreSQL · May – Jul 2026",
        body: "Full-stack app with a decoupled REST API, live status aggregation and LLM-ranked recommendations.",
        links: [
          { label: "Live site", href: "https://hoppers2-0.vercel.app/" },
          { label: "Devpost", href: "https://devpost.com/software/hoppers" },
        ],
      },
      {
        name: "Cookies",
        art: "cookies",
        image: null,
        title: "Notion MCP Telegram agent",
        meta: "Node.js · OpenAI Agents SDK · Notion MCP · Vercel · Upstash Redis",
        body: "Telegram assistant that saves tasks, expenses, events and links to Notion; a triage agent routes each message to specialists with validated tools.",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/sonyalow-smu611/notion-assistant-telebot",
          },
        ],
      },
      {
        name: "Chocolate bar",
        art: "chocolate",
        image: "learnactive.png",
        title: "LearnActively",
        meta: "React · Next.js · Zod · Drizzle · Supabase · Jun – Jul 2026",
        body: "AI active-learning workspace: 8+ agents generate roadmaps, labs, flashcards and quizzes, streamed over SSE.",
        links: [
          {
            label: "Devpost",
            href: "https://devpost.com/software/learnactively",
          },
          {
            label: "GitHub",
            href: "https://github.com/sonyalow-smu611/LearnActively",
          },
        ],
      },
      {
        name: "Popcorn",
        art: "popcorn",
        image: "langchainagent.png",
        title: "LangChain vibecoding agent workflow",
        meta: "Python · LangChain · Pydantic · Jul 2026",
        body: "Director → architect → worker agents orchestrated as a graph with typed shared state.",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/sonyalow-smu611/Langchain-Agent-Workflow/tree/main/example%20langchain%20agents/vibecoder",
          },
          {
            label: "GitHub (Chingu)",
            href: "https://github.com/sonyalow-smu611/Chingu",
          },
        ],
      },
      {
        name: "Gummy bears",
        art: "gummy-bear",
        image: "reveriedatathon.png",
        title: "Customer segmentation analytics",
        meta: "Python · scikit-learn · Pandas · Aug 2026",
        body: "K-Means pipeline segmenting 2,237 customers into 4 personas, with a leakage-safe split.",
        links: [
          {
            label: "Devpost",
            href: "https://devpost.com/software/new-project-mbztn8",
          },
          {
            label: "GitHub",
            href: "https://github.com/xuenlynn/reverie_datathon",
          },
        ],
      },
      {
        name: "Instant noodles",
        art: "instant-noodles",
        image: "shoppingcopilot.png",
        title: "TikTok Hackathon RAG agent",
        meta: "Python · BM25 · Sentence-Transformers · Aug 2026",
        body: "Hybrid retrieval pipeline plus a multi-turn agent with intent routing and slot extraction.",
        links: [
          {
            label: "Devpost",
            href: "https://devpost.com/software/shopper-agent",
          },
        ],
        sticker: "new-arrival",
      },
    ],
  },
];
