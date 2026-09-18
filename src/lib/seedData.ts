import { 
  SiteSettings, 
  HomepageData, 
  Service, 
  Resource, 
  AITool, 
  BlogPost, 
  Event, 
  Initiative, 
  Honoree, 
  TeamMember, 
  Testimonial, 
  Partner, 
  NavigationItem,
  MediaItem
} from '../types';

export const initialSiteSettings: SiteSettings = {
  site_name: "The Digital Librarian",
  site_tagline: "Digital Solutions · Learning · Research · Libraries · AI · Media",
  logo_url: "/images/logo.svg",
  logo_alt_text: "The Digital Librarian (TheDL) Logo",
  favicon_url: "/favicon.svg",
  primary_color: "#FFFFFF",
  accent_color: "#009DF6",
  dark_color: "#00003F",
  contact_phone: "07030413987",
  contact_email: "didigitallibrarian@gmail.com",
  whatsapp_number: "+2347030413987",
  whatsapp_link: "https://wa.me/message/VV5A32BESJYHC1",
  whatsapp_community_link: "https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD",
  social_links: {
    twitter: "https://twitter.com/didigital_libr",
    linkedin: "https://linkedin.com/in/sylvester-ebhonu",
    facebook_page: "https://facebook.com/didigitallibrarian",
    facebook_personal: "https://facebook.com/sylvester.ebhonu",
    facebook_group: "https://www.facebook.com/groups/brandedlibrarians/",
    instagram: "https://instagram.com/didigital_librarian",
    youtube: "https://youtube.com/@didigitallibrarian8254"
  },
  footer_tagline: "Digital Solutions. Learning. Research. Libraries. AI. Media.",
  copyright_text: "© 2026 The Digital Librarian. All rights reserved.",
  default_seo_title: "The Digital Librarian | Digital Solutions, Learning & AI Literacy",
  default_seo_description: "A professional platform for digital solutions, learning, research, libraries, technology and capacity building led by Sylvester I. Ebhonu.",
  default_og_image: "/images/sylvester-hero.jpg"
};

export const initialHomepageData: HomepageData = {
  hero: {
    headline: "Making Knowledge, Technology and Opportunity Work for You.",
    subheadline: "Learn something. Solve a problem. Build something better.",
    description: "The Digital Librarian (TheDL) is a professional platform for digital solutions, learning, research, libraries, technology and capacity building — helping individuals and organisations access practical solutions, useful knowledge and expert guidance.",
    image_url: "/images/sylvester-transparent.png",
    primary_btn_text: "Explore TheDL",
    primary_btn_url: "#what-we-do",
    secondary_btn_text: "Work With TheDL",
    secondary_btn_url: "/contact",
    ticker_tags: [
      "Digital Solutions",
      "Learning",
      "Research",
      "Libraries",
      "AI",
      "Media"
    ]
  },
  about_teaser: {
    heading: "More Than a Name. A Place to Learn, Build and Connect.",
    description: "The Digital Librarian brings together knowledge, technology, learning and professional expertise in one place. Whether you are here to learn, find a resource, solve a problem, discover an opportunity or explore something new, there is something here for you.",
    cta_text: "Discover TheDL →",
    cta_url: "/about"
  },
  quick_explore: {
    heading: "What are you looking for?",
    subheading: "There is something here for everyone seeking growth, capability, and technology.",
    items: [
      {
        title: "I want to learn",
        description: "Explore courses, masterclasses, tutorials, recordings, presentations and other learning resources.",
        link: "/upskilling-library",
        icon: "BookOpen"
      },
      {
        title: "I need a solution",
        description: "Discover TheDL's professional solutions for libraries (automation and database subscription), research, AI and digital literacy, capacity building, ICT and media.",
        link: "/solutions",
        icon: "Cpu"
      },
      {
        title: "I want to stay informed",
        description: "Read TheDL's articles, insights and periodic updates on issues worth knowing.",
        link: "/blog",
        icon: "Newspaper"
      },
      {
        title: "I want to connect",
        description: "Join the Upskill & Connect Village, explore our initiatives or connect with TheDL.",
        link: "/initiatives/upskill-connect-village",
        icon: "Users"
      }
    ]
  },
  featured_learning: {
    title: "Featured on The Upskilling Library",
    subtitle: "The Digital You Masterclass",
    description: "Digital presence, professional identity and building a stronger online footprint for educators, librarians, and modern professionals.",
    video_url: "https://www.youtube.com/watch?v=CoRkktaf1DI",
    thumbnail_url: "/images/masterclass-thumb.jpg",
    cta_text: "Watch / Explore →",
    cta_url: "/upskilling-library"
  },
  stats: {
    stat1_value: "15,000+",
    stat1_label: "People Reached",
    stat1_sub: "Through learning and training activities across academic, faith, corporate and social platforms.",
    stat2_value: "Africa & Beyond",
    stat2_label: "Global Impact",
    stat2_sub: "Connecting people, ideas and opportunities across professional communities in Africa and globally.",
    stat3_value: "Research • Practice",
    stat3_label: "Multi-Disciplinary",
    stat3_sub: "A growing body of published research, library setups, digital workflows, and community hubs."
  },
  final_cta: {
    heading: "Have a Problem Worth Solving?",
    description: "Whether you need training, professional support, a digital or library solution, research-related guidance, a speaker or facilitator, ICT/media support, or simply want to explore an idea, TheDL is open to meaningful conversations and collaborations.",
    primary_btn_text: "Talk to TheDL →",
    primary_btn_url: "/contact",
    secondary_btn_text: "Explore Solutions →",
    secondary_btn_url: "/solutions"
  }
};

export const initialServices: Service[] = [
  {
    id: "service-1",
    title: "Library & Information Solutions",
    slug: "library-information",
    short_description: "Digital and information solutions that help libraries and information organisations improve access, services, visibility and reach.",
    full_description: "Certified library consultancy with over 10 years of institutional leadership. We guide academic, special, and corporate libraries in automation (Koha, DSpace), institutional repository setup, e-library portal deployment, cataloguing standards, database subscriptions, and digital preservation.",
    icon: "Library",
    features: [
      "Library Automation (Koha, SLIMS, Alma)",
      "Institutional Repositories (DSpace, EPrints)",
      "Database Subscriptions & Resource Licencing",
      "Staff Retraining & Modern Digital Cataloguing",
      "Library Physical & Virtual Space Architecture"
    ],
    cta_text: "Explore Solution →",
    cta_url: "/solutions/library-information",
    display_order: 1,
    published: true
  },
  {
    id: "service-2",
    title: "Research & Scholarly Support",
    slug: "research",
    short_description: "Practical support for researchers around research writing, publication, scholarly communication, research visibility and the effective use of research tools.",
    full_description: "End-to-end scholarly enablement designed to increase publication success and citation impact. From systematic literature review mapping to citation management (Zotero, Mendeley), bibliometrics, journal selection, and avoiding predatory publishers.",
    icon: "BookMarked",
    features: [
      "Literature Mapping & Systematic Review Automation",
      "Reference Management (Zotero, Mendeley, JabRef)",
      "Scholarly Visibility & Author Profiles (ORCID, Google Scholar, Scopus)",
      "Journal Selection & Editorial Review Guidance",
      "Plagiarism Diagnostics & Thesis Formatting"
    ],
    cta_text: "Explore Solution →",
    cta_url: "/solutions/research",
    display_order: 2,
    published: true
  },
  {
    id: "service-3",
    title: "AI & Digital Literacy",
    slug: "ai-digital-literacy",
    short_description: "Helping individuals and organisations understand, evaluate and use digital and AI tools with greater confidence, skill and responsibility.",
    full_description: "Hands-on generative AI training for faculty, students, executives, and knowledge workers. We turn AI from an intimidating concept into an indispensable daily copilot for analysis, writing, curriculum design, and automation, while instilling ethical AI safeguards.",
    icon: "Cpu",
    features: [
      "Generative AI Prompt Engineering for Professionals",
      "AI Workflows for Literature Reviews & Data Cleaning",
      "Ethics, Attribution & Copyright Compliance in AI",
      "Custom Workflow Automation with AI Agents",
      "Faculty & Corporate AI Upskilling Workshops"
    ],
    cta_text: "Explore Solution →",
    cta_url: "/solutions/ai-digital-literacy",
    display_order: 3,
    published: true
  },
  {
    id: "service-4",
    title: "Capacity Building & Professional Development",
    slug: "capacity-building",
    short_description: "Workshops, masterclasses, coaching and professional learning experiences designed around practical needs.",
    full_description: "Facilitated seminars, campaigns and workshops for over 15,000 participants on academic, faith, corporate, and social platforms. We specialize in leadership, team-building, organizational management, digital mindsets, and career acceleration.",
    icon: "GraduationCap",
    features: [
      "Executive & Team Capacity Building Bootcamps",
      "Grow with Google Digital Skills Facilitation",
      "Career Acceleration & Mentorship for Librarians",
      "Purpose-Driven Leadership & Team Dynamics",
      "Keynote Speaking & Panel Facilitation"
    ],
    cta_text: "Explore Solution →",
    cta_url: "/solutions/capacity-building",
    display_order: 4,
    published: true
  },
  {
    id: "service-5",
    title: "ICT & Media Solutions",
    slug: "ict-media",
    short_description: "ICT, digital and multimedia support for individuals, libraries and organisations seeking to create, communicate and work more effectively.",
    full_description: "Full multimedia capability powered through Sesitech Ventures. We deliver web development, digital branding, professional photography, documentary videography, digital printing, and high-impact digital marketing campaigns.",
    icon: "MonitorPlay",
    features: [
      "Web Design, CMS Portals & E-Commerce Integration",
      "Documentary Videography & Media Production",
      "Brand Identity, Logo Design & Visual Systems",
      "Digital Printing, Event Banners & Publication Publishing",
      "Social Media Growth Strategy & Campaigns"
    ],
    cta_text: "Explore Solution →",
    cta_url: "/solutions/ict-media",
    display_order: 5,
    published: true
  },
  {
    id: "service-6",
    title: "Consultancy & General Contracts",
    slug: "consultancy",
    short_description: "Strategic advisory, technical auditing, technology procurement, and end-to-end contract delivery for institutions.",
    full_description: "High-level strategic advisory services for vice-chancellors, provosts, corporate boards, and non-profits aiming to modernize their information ecosystem, deploy institutional repositories, or execute funded projects.",
    icon: "Briefcase",
    features: [
      "Institutional Technology Roadmaps & Audits",
      "Grant Proposal Technical Consulting",
      "Equipment Specification & Procurement Oversight",
      "Turnkey Project Management"
    ],
    cta_text: "Explore Solution →",
    cta_url: "/solutions/consultancy",
    display_order: 6,
    published: true
  }
];

export const initialAITools: AITool[] = [
  // Academics/Research
  {
    id: "tool-1",
    name: "Gemini (formerly Bard)",
    category: "academics",
    category_label: "Academics & Research",
    description: "A conversational chatbot that can code, answer complex research questions, synthesize literature, and generate structured analysis.",
    website_url: "https://gemini.google.com/",
    is_free: true,
    tags: ["Chatbot", "Literature", "Analysis"]
  },
  {
    id: "tool-2",
    name: "ChatPDF",
    category: "academics",
    category_label: "Academics & Research",
    description: "Upload research papers or book chapters in PDF format; extract instant summaries, ask questions, and verify citations.",
    website_url: "https://www.chatpdf.com/",
    is_free: true,
    tags: ["PDF", "Summarization", "Reading"]
  },
  {
    id: "tool-3",
    name: "QuillBot",
    category: "academics",
    category_label: "Academics & Research",
    description: "AI-powered paraphrasing tool and grammar checker that improves sentence fluency, vocabulary, and tone.",
    website_url: "https://quillbot.com/",
    is_free: true,
    tags: ["Paraphrasing", "Grammar", "Writing"]
  },
  {
    id: "tool-4",
    name: "Wordtune",
    category: "academics",
    category_label: "Academics & Research",
    description: "Helps you improve your writing by suggesting alternative phrasings, expanding ideas, and condensing verbose paragraphs.",
    website_url: "https://www.wordtune.com/",
    is_free: true,
    tags: ["Writing", "Editing", "Clarity"]
  },
  {
    id: "tool-5",
    name: "PaperPal",
    category: "academics",
    category_label: "Academics & Research",
    description: "Integrates with MS Word to provide real-time academic grammar and language polishing tailored for scholarly publication.",
    website_url: "https://paperpal.com/",
    requires_premium: true,
    tags: ["Academic Writing", "MS Word", "Publishing"]
  },
  {
    id: "tool-6",
    name: "Grammarly",
    category: "academics",
    category_label: "Academics & Research",
    description: "A writing assistant that catches spelling mistakes, improves tone, ensures clarity, and prevents plagiarism.",
    website_url: "https://www.grammarly.com/",
    is_free: true,
    tags: ["Proofreading", "Tone", "Grammar"]
  },
  {
    id: "tool-7",
    name: "Elicit",
    category: "academics",
    category_label: "Academics & Research",
    description: "Automates research workflows: finds relevant papers without keyword matching, extracts data points into tables, and synthesizes findings.",
    website_url: "https://elicit.org/",
    is_free: true,
    tags: ["Literature Review", "Synthesis", "Discovery"]
  },
  {
    id: "tool-8",
    name: "Connected Papers",
    category: "academics",
    category_label: "Academics & Research",
    description: "Visual graph mapping showing how academic papers connect through citations, co-citations, and bibliometric relevance.",
    website_url: "https://www.connectedpapers.com/",
    is_free: true,
    tags: ["Mapping", "Citations", "Discovery"]
  },
  {
    id: "tool-9",
    name: "Research Rabbit",
    category: "academics",
    category_label: "Academics & Research",
    description: "The Spotify of research papers. Builds personalized citation trees and sends alerts as new relevant literature is published.",
    website_url: "https://www.researchrabbit.ai/",
    is_free: true,
    tags: ["Citation Graph", "Alerts", "Bibliography"]
  },
  {
    id: "tool-10",
    name: "Zotero",
    category: "academics",
    category_label: "Academics & Research",
    description: "Free, open-source reference manager that collects, organizes, annotates, and cites research sources in any academic style.",
    website_url: "https://www.zotero.org/",
    is_free: true,
    tags: ["Reference Manager", "Citations", "Open Source"]
  },
  {
    id: "tool-11",
    name: "Mendeley",
    category: "academics",
    category_label: "Academics & Research",
    description: "Manage references, share annotated bibliographies, generate citations in thousands of journal formats, and collaborate.",
    website_url: "https://www.mendeley.com/",
    is_free: true,
    tags: ["Citations", "Elsevier", "Bibliography"]
  },
  {
    id: "tool-12",
    name: "JabRef",
    category: "academics",
    category_label: "Academics & Research",
    description: "Open-source bibliography reference manager using standard BibTeX and BibLaTeX files for LaTeX writers.",
    website_url: "https://www.jabref.org/",
    is_free: true,
    tags: ["BibTeX", "LaTeX", "Citations"]
  },
  {
    id: "tool-13",
    name: "Simplified",
    category: "academics",
    category_label: "Academics & Research",
    description: "All-in-one app for modern teams: generate presentation decks, write copy, collaborate, and schedule content.",
    website_url: "https://simplified.com/design",
    is_free: true,
    tags: ["Presentations", "Design", "AI"]
  },
  {
    id: "tool-14",
    name: "Prezi AI",
    category: "academics",
    category_label: "Academics & Research",
    description: "Dynamic zoomable presentation software that turns dry lecture points into engaging visual journeys.",
    website_url: "https://prezi.com/",
    is_free: true,
    tags: ["Presentations", "Visual", "Lectures"]
  },
  {
    id: "tool-15",
    name: "SlideAI",
    category: "academics",
    category_label: "Academics & Research",
    description: "AI-powered text-to-presentation tool that summarizes raw text and generates clean slide layouts in seconds.",
    website_url: "https://www.slidesai.io/",
    is_free: true,
    tags: ["Slides", "Automation", "Presentations"]
  },
  {
    id: "tool-16",
    name: "Transkriptor",
    category: "academics",
    category_label: "Academics & Research",
    description: "Accurate audio-to-text transcription engine for converting recorded interviews, lectures, and focus groups into verbatim transcripts.",
    website_url: "https://transkriptor.com/",
    is_free: true,
    tags: ["Transcription", "Interviews", "Audio"]
  },

  // Creative Writing
  {
    id: "tool-17",
    name: "ChatGPT",
    category: "creative",
    category_label: "Creative Writing",
    description: "State-of-the-art conversational AI for outlining books, creative storytelling, drafting articles, and refining narratives.",
    website_url: "https://www.chatgpt.com/",
    is_free: true,
    tags: ["Storytelling", "Outlines", "Drafting"]
  },
  {
    id: "tool-18",
    name: "Originality.ai",
    category: "creative",
    category_label: "Creative Writing",
    description: "Accurate AI content detector and plagiarism checker built specifically for serious publishers and educators.",
    website_url: "https://originality.ai/",
    requires_premium: true,
    tags: ["AI Detection", "Plagiarism", "Verification"]
  },
  {
    id: "tool-19",
    name: "Notion AI",
    category: "creative",
    category_label: "Creative Writing",
    description: "Integrated workplace intelligence that summarizes notes, drafts blog outlines, and automates document workflows.",
    website_url: "https://www.notion.so/",
    requires_premium: true,
    tags: ["Workplace", "Notes", "Productivity"]
  },
  {
    id: "tool-20",
    name: "Hemingway Editor",
    category: "creative",
    category_label: "Creative Writing",
    description: "Highlights verbose sentences, passive voice, and complex jargon so your prose becomes bold and clear.",
    website_url: "https://hemingwayapp.com/",
    is_free: true,
    tags: ["Editing", "Simplicity", "Readability"]
  },
  {
    id: "tool-21",
    name: "Tome",
    category: "creative",
    category_label: "Creative Writing",
    description: "Generative storytelling canvas that pairs rich text with AI visuals to build interactive pitches and narrative reports.",
    website_url: "https://tome.app/",
    is_free: true,
    tags: ["Storytelling", "Visuals", "Canvas"]
  },

  // Data Manipulation
  {
    id: "tool-22",
    name: "Equals",
    category: "data",
    category_label: "Data Manipulation",
    description: "Next-generation spreadsheet with built-in AI for writing SQL queries, auto-generating complex formulas, and charts.",
    website_url: "https://equals.com/ai",
    is_free: true,
    tags: ["Spreadsheets", "SQL", "Formulas"]
  },
  {
    id: "tool-23",
    name: "ATLAS.ti",
    category: "data",
    category_label: "Data Manipulation",
    description: "Industry-leading qualitative data analysis software equipped with AI for automated coding, sentiment analysis, and thematic extraction.",
    website_url: "https://atlasti.com/",
    requires_premium: true,
    tags: ["Qualitative", "Coding", "Research"]
  },
  {
    id: "tool-24",
    name: "NVivo (Lumivero)",
    category: "data",
    category_label: "Data Manipulation",
    description: "Qualitative data analysis tool helping researchers discover insights across unstructured interviews, social media, and focus groups.",
    website_url: "https://lumivero.com/",
    requires_premium: true,
    tags: ["Qualitative", "Interviews", "Insights"]
  },
  {
    id: "tool-25",
    name: "BioRender",
    category: "data",
    category_label: "Data Manipulation",
    description: "Create scientific figures and medical illustrations using a library of over 40,000 peer-reviewed icons and templates.",
    website_url: "https://www.biorender.com/",
    is_free: true,
    tags: ["Scientific Diagrams", "Illustrations", "Posters"]
  },
  {
    id: "tool-26",
    name: "SmallPDF",
    category: "data",
    category_label: "Data Manipulation",
    description: "Compress, convert, merge, split, sign, and unlock PDF files with frictionless cloud-based tools.",
    website_url: "https://smallpdf.com/",
    is_free: true,
    tags: ["PDF", "Conversion", "Utilities"]
  },

  // Multimedia
  {
    id: "tool-27",
    name: "Adobe Firefly",
    category: "multimedia",
    category_label: "Multimedia",
    description: "Generative AI art and design engine that produces photorealistic images, vector graphics, and text effects safely for commercial use.",
    website_url: "https://firefly.adobe.com/",
    is_free: true,
    tags: ["Generative Art", "Design", "Vectors"]
  },
  {
    id: "tool-28",
    name: "Canva",
    category: "multimedia",
    category_label: "Multimedia",
    description: "The world's favorite online visual suite with Magic Studio AI for flyers, social graphics, slides, and videos.",
    website_url: "https://www.canva.com/",
    is_free: true,
    tags: ["Graphics", "Social Media", "Posters"]
  },
  {
    id: "tool-29",
    name: "CapCut",
    category: "multimedia",
    category_label: "Multimedia",
    description: "Feature-packed video editor with automated captions, keyframe animations, and slow-motion effects.",
    website_url: "https://www.capcut.com/",
    is_free: true,
    tags: ["Video Editing", "Reels", "Subtitles"]
  },
  {
    id: "tool-30",
    name: "Designrr",
    category: "multimedia",
    category_label: "Multimedia",
    description: "Convert blog posts, podcasts, YouTube videos, and PDFs into beautifully designed eBooks in minutes.",
    website_url: "https://designrr.io/",
    requires_premium: true,
    tags: ["eBooks", "Lead Magnets", "Publishing"]
  },

  // Health
  {
    id: "tool-31",
    name: "IBM Watson Health",
    category: "health",
    category_label: "Health",
    description: "Clinical decision support tools designed to accelerate disease diagnosis and streamline clinical pathways.",
    website_url: "https://www.ibm.com/watson-health",
    requires_premium: true,
    tags: ["Healthcare", "Diagnostics", "Clinical"]
  },
  {
    id: "tool-32",
    name: "Google DeepMind Health",
    category: "health",
    category_label: "Health",
    description: "Groundbreaking AI applications forecasting disease risks and advancing protein folding research.",
    website_url: "https://www.deepmind.com/",
    is_free: true,
    tags: ["Deep Learning", "AlphaFold", "Medicine"]
  },

  // Finance
  {
    id: "tool-33",
    name: "Xero",
    category: "finance",
    category_label: "Finance",
    description: "Cloud-based accounting software that automates bank reconciliations, invoicing, and financial reporting.",
    website_url: "https://www.xero.com/",
    requires_premium: true,
    tags: ["Accounting", "Bookkeeping", "Invoices"]
  },
  {
    id: "tool-34",
    name: "QuickBooks Online",
    category: "finance",
    category_label: "Finance",
    description: "Track business expenses, mileage, payroll, and generate audit-ready financial statements.",
    website_url: "https://quickbooks.intuit.com/",
    requires_premium: true,
    tags: ["Taxes", "Small Business", "Payroll"]
  },

  // Legal
  {
    id: "tool-35",
    name: "Casetext (CARA AI)",
    category: "legal",
    category_label: "Legal",
    description: "AI-assisted legal research engine that analyzes legal briefs and predicts relevant precedents.",
    website_url: "https://casetext.com/",
    requires_premium: true,
    tags: ["Legal Research", "Briefs", "Precedent"]
  },
  {
    id: "tool-36",
    name: "Clio",
    category: "legal",
    category_label: "Legal",
    description: "Law firm practice management for client intake, case tracking, document storage, and trust accounting.",
    website_url: "https://www.clio.com/",
    requires_premium: true,
    tags: ["Law Practice", "Case Management", "Billing"]
  },

  // Productivity
  {
    id: "tool-37",
    name: "Otter.ai",
    category: "productivity",
    category_label: "Productivity",
    description: "Real-time AI meeting notes, audio recording, automated slide captures, and executive summaries.",
    website_url: "https://otter.ai/",
    is_free: true,
    tags: ["Meetings", "Notes", "Transcription"]
  },
  {
    id: "tool-38",
    name: "Pomofocus",
    category: "productivity",
    category_label: "Productivity",
    description: "Customizable Pomodoro timer with task tracking to maintain deep focus throughout the workday.",
    website_url: "https://pomofocus.io/",
    is_free: true,
    tags: ["Time Management", "Focus", "Pomodoro"]
  },
  {
    id: "tool-39",
    name: "Todoist",
    category: "productivity",
    category_label: "Productivity",
    description: "Clean task manager with natural language date parsing, priority levels, and cross-platform sync.",
    website_url: "https://todoist.com/",
    is_free: true,
    tags: ["Tasks", "Organization", "Workflow"]
  },
  {
    id: "tool-40",
    name: "TopAI Tools",
    category: "productivity",
    category_label: "Productivity",
    description: "Curated directory indexing over 3,800+ AI tools across design, business, research, and coding.",
    website_url: "https://topai.tools/",
    is_free: true,
    tags: ["Directory", "Discovery", "Curated"]
  }
];

export const initialResources: Resource[] = [
  {
    id: "res-1",
    title: "Lets Communicate: A Life of Purpose",
    slug: "lets-communicate-life-of-purpose",
    category: "books",
    description: "A transformative guide by Sylvester Israel Ebhonu unpacking the principles of purposeful communication, self-awareness, and relational leadership in an era of digital distraction.",
    price: "₦2,000",
    thumbnail_url: "/images/book-lets-communicate.jpg",
    author: "Sylvester Israel Ebhonu",
    featured: true,
    published: true,
    created_at: "2024-01-15"
  },
  {
    id: "res-2",
    title: "An Evening with Mandy (Unpublished Preview)",
    slug: "an-evening-with-mandy",
    category: "books",
    description: "An inspiring exploration of relationship dynamics, personal growth, and authentic identity navigating modern society.",
    price: "₦5,000",
    thumbnail_url: "/images/book-evening-mandy.jpg",
    author: "Sylvester Israel Ebhonu",
    featured: true,
    published: true,
    created_at: "2024-05-20"
  },
  {
    id: "res-3",
    title: "The Digital You: Personal Branding for Modern Professionals",
    slug: "digital-you-masterclass",
    category: "courses",
    description: "Comprehensive video masterclass on crafting a memorable digital presence, optimizing your professional online footprint, and positioning your knowledge for global opportunities.",
    price: "Free Masterclass",
    thumbnail_url: "/images/masterclass-thumb.jpg",
    external_url: "https://www.youtube.com/watch?v=CoRkktaf1DI",
    author: "Sylvester I. Ebhonu",
    featured: true,
    published: true,
    created_at: "2024-08-10"
  },
  {
    id: "res-4",
    title: "Prescription of AI Tools for Quantum Leap Productivity",
    slug: "prescription-ai-tools",
    category: "tutorials",
    description: "Curated blueprint and prompt cheat sheets to automate research workflows, document synthesis, and daily task management.",
    price: "Free Download",
    thumbnail_url: "/images/ai-prescription.jpg",
    author: "The Digital Librarian",
    featured: true,
    published: true,
    created_at: "2024-09-01"
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Rethinking African Librarianship in the Age of Generative AI",
    slug: "rethinking-african-librarianship-ai",
    excerpt: "Librarians in Africa do so much in promoting digital literacy and knowledge management, yet stereotypes persist. Here is how modern technology shifts libraries from quiet book stores to innovation incubators.",
    content: `## The Modern African Library

For decades, the popular caricature of a librarian has been that of a passive custodian guarding rows of dust-covered books. In today’s Africa, however, information professionals are leading some of the most dynamic community and research initiatives on the continent.

### From Storage Facility to Innovation Hub
Libraries are increasingly recognized as centers for:
- Digital equity and broadband access
- AI prompt literacy and ethical scholarship
- Preserving indigenous knowledge systems through open repositories
- Community entrepreneurship and youth empowerment

### The Digital Librarian Approach
At **The Digital Librarian**, our objective is simple: equip knowledge professionals with the exact tools, methodologies, and confidence required to lead in the digital era. Whether configuring institutional repositories or running hands-on workshops with Google tools, we believe that empowering one librarian transforms an entire academic institution.`,
    featured_image: "/images/blog-ai-librarians.jpg",
    category: "Digital Literacy",
    tags: ["AI", "Libraries", "African Development"],
    author_name: "Sylvester I. Ebhonu",
    author_role: "Head of E-Services & Founder, TheDL",
    author_avatar: "/images/sylvester-portrait.png",
    published: true,
    published_at: "2024-09-10",
    reading_time: "5 min read",
    seo_title: "Rethinking African Librarianship in the Age of Generative AI",
    seo_description: "How African librarians are leveraging AI and digital technologies to transform academic institutions and community hubs."
  },
  {
    id: "post-2",
    title: "5 AI Research Workflows Every Academic Must Master in 2026",
    slug: "5-ai-research-workflows-academics",
    excerpt: "From automated literature mapping with Connected Papers to systematic data extraction with Elicit, discover how to reduce your literature review timeframe without sacrificing rigor.",
    content: `## Maximizing Research Output Without Compromising Integrity

Scholarly research has entered an unprecedented era of acceleration. While traditional literature reviews previously demanded months of manual search across disparate journals, contemporary researchers utilize specialized algorithmic frameworks to map citation webs in minutes.

### 1. Citation Mapping with Connected Papers & Research Rabbit
Rather than searching solely by keywords, citation mapping allows you to start from a seminal paper and visualize its entire citation network.

### 2. Deep Synthesis with Elicit
Elicit automates the extraction of key variables, sample sizes, and empirical findings into a structured matrix.

### 3. Ethical Safeguards
Always remember: AI tools are your research assistants, not the primary author. Verify every primary source and maintain strict adherence to institutional citation norms.`,
    featured_image: "/images/blog-research-tools.jpg",
    category: "Research & Scholarly",
    tags: ["Research", "Productivity", "Scholarship"],
    author_name: "Sylvester I. Ebhonu",
    author_role: "Head of E-Services & Founder, TheDL",
    author_avatar: "/images/sylvester-portrait.png",
    published: true,
    published_at: "2024-09-02",
    reading_time: "7 min read",
    seo_title: "5 AI Research Workflows Every Academic Must Master",
    seo_description: "A practical guide to accelerating scholarly reviews and citation management using modern AI tools."
  }
];

export const initialEvents: Event[] = [
  {
    id: "event-1",
    title: "AI Masterclass & Productivity Workshop (#AIM)",
    slug: "ai-masterclass-workshop",
    tagline: "Prescription of AI Tools to Work Smarter and Gain a Quantum Leap in Your Career",
    category: "Masterclass",
    status: "upcoming",
    date: "2026-10-15",
    time: "10:00 AM - 2:00 PM WAT",
    location: "Virtual (Zoom & WhatsApp Live Stream)",
    is_virtual: true,
    flyer_url: "/images/event-ai-masterclass.jpg",
    description: "An intensive practical workshop led by Sylvester I. Ebhonu tailored for students, researchers, librarians, educators, administrators, and entrepreneurs. Learn prompt engineering, document analysis, automated presentations, and research workflows.",
    expectations: [
      "To improve my work/research performance and productivity",
      "To upgrade my products/services delivery by leveraging AI",
      "To establish research or business relations for future collaborations",
      "To gain practical know-how and become a Master of AI"
    ],
    investment_tiers: [
      { label: "Tier 1: Access Only", amount: "₦1,000 / $3", description: "Access to live session & digital certificate" },
      { label: "Tier 2: Standard Package", amount: "₦2,000 / $5", description: "Live session, certificate & session recording" },
      { label: "Tier 3: Executive VIP Package", amount: "₦5,000 / $11", description: "Full materials, 1-on-1 coaching audit & VIP community access" },
      { label: "Keynote Only", amount: "Free", description: "Free attendance for the keynote address only" }
    ],
    bank_details: {
      account_name: "SESITECH VENTURES",
      account_number: "4011277179",
      bank_name: "FIDELITY BANK",
      contact: "didigitallibrarian@gmail.com / 07030413987"
    },
    whatsapp_redirect_url: "https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD",
    published: true,
    featured: true
  },
  {
    id: "event-2",
    title: "Library Innovation Summit Africa: The Digital Shift",
    slug: "library-innovation-summit-africa",
    tagline: "Redefining Libraries as Dynamic Catalysts for National Innovation",
    category: "Summit",
    status: "past",
    date: "2025-11-20",
    time: "9:00 AM - 4:00 PM WAT",
    location: "Admiralty University / Virtual Hybrid",
    is_virtual: true,
    flyer_url: "/images/event-summit.jpg",
    description: "Over 800 library directors, information scientists, and tech innovators gathered to discuss the integration of open access repositories, cloud catalogs, and AI chatbots in African universities.",
    expectations: [],
    investment_tiers: [],
    bank_details: {
      account_name: "SESITECH VENTURES",
      account_number: "4011277179",
      bank_name: "FIDELITY BANK",
      contact: "didigitallibrarian@gmail.com"
    },
    whatsapp_redirect_url: "https://chat.whatsapp.com/BeYzmeB5lUP8TXqUwMNWlD",
    published: true,
    featured: false
  }
];

export const initialInitiatives: Initiative[] = [
  {
    id: "init-1",
    title: "Librarian Spotlight Africa (LSA)",
    slug: "librarian-spotlight-africa",
    tagline: "Amplifying Impact to Inspire Positive Change",
    short_description: "A leading pan-African initiative birthed by Sylvester Ebhonu dedicated to recognizing and celebrating the exemplary contributions of librarians across Africa through storytelling.",
    content: `Librarians in Africa do so much in promoting information and digital literacy, knowledge management, and addressing societal issues like education inequality and information access. Yet their relevance is frequently under-represented due to outdated stereotypes.

Librarian Spotlight Africa (LSA) shines a spotlight on their transformational work through monthly live-streamed interviews, community showcases, capacity-building mentorships, and recognition programs.`,
    featured_image: "/images/lsa-hero.jpg",
    logo_url: "/images/lsa-logo.png",
    published: true,
    display_order: 1
  },
  {
    id: "init-2",
    title: "Upskill & Connect Village",
    slug: "upskill-connect-village",
    tagline: "Don't Just Learn. Connect.",
    short_description: "A vibrant global community of purpose-driven librarians, educators, researchers, and digital leaders learning together and sharing opportunities.",
    content: `Upskill & Connect Village is an interactive network facilitating weekly knowledge drops, collaborative research groups, peer feedback, and direct networking with international partners.`,
    featured_image: "/images/village-hero.jpg",
    logo_url: "/images/village-logo.png",
    published: true,
    display_order: 2
  }
];

export const initialHonorees: Honoree[] = [
  {
    id: "hon-1",
    name: "Dr. Catherine Musonda",
    month: "August",
    year: 2026,
    country: "Zambia",
    institution: "University of Zambia Library",
    role: "Head of Digital Collections",
    bio: "Pioneered the open access digitization of rare regional agricultural manuscripts, making critical historical food security data accessible to researchers across Africa.",
    photo_url: "/images/honoree-1.jpg",
    featured_quote: "African libraries hold the key to preserving the continent's intellectual legacy for future generations."
  },
  {
    id: "hon-2",
    name: "Emmanuel K. Mensah",
    month: "July",
    year: 2026,
    country: "Ghana",
    institution: "Ashesi University",
    role: "Research & Instruction Librarian",
    bio: "Championed AI literacy bootcamps for over 3,000 undergraduate students, bridging the digital equity gap in higher education.",
    photo_url: "/images/honoree-2.jpg",
    featured_quote: "When a librarian masters technology, they unlock the potential of every researcher who walks through their doors."
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Sylvester I. Ebhonu",
    role: "Founder & Programme Director",
    organization: "The Digital Librarian / Admiralty University of Nigeria",
    bio: "Certified Librarian in Nigeria with over 10 years of experience in library consultations, setup, and administration. Head of E-Services at Admiralty University of Nigeria. Grow with Google Trainer, Author, and Youthpreneur.",
    photo_url: "/images/sylvester-portrait.png",
    display_order: 1,
    initiative: "core",
    is_active: true,
    social_links: {
      linkedin: "https://linkedin.com/in/sylvester-ebhonu",
      twitter: "https://twitter.com/didigital_libr"
    }
  },
  {
    id: "team-2",
    name: "Mrs. Folashade Adepoju",
    role: "Coordinator, Global Outreach and Evaluation Committee",
    organization: "Librarian Spotlight Africa",
    bio: "Leading international outreach and independent committee assessment for pan-African librarian recognitions.",
    photo_url: "/images/team-folashade.jpg",
    display_order: 2,
    initiative: "lsa",
    is_active: true
  },
  {
    id: "team-3",
    name: "Hajiya Ramatu A. Haliru",
    role: "Coordinator, Research and Evaluation",
    organization: "Librarian Spotlight Africa",
    bio: "Directs longitudinal impact assessment and scholarly feedback evaluation across the continent.",
    photo_url: "/images/team-ramatu.jpg",
    display_order: 3,
    initiative: "lsa",
    is_active: true
  },
  {
    id: "team-4",
    name: "Victoria C. Chukwuedozie",
    role: "Manager, Content and Communications",
    organization: "Librarian Spotlight Africa",
    bio: "Oversees editorial storytelling, digital media releases, and community broadcasts.",
    photo_url: "/images/team-victoria.jpg",
    display_order: 4,
    initiative: "lsa",
    is_active: true
  },
  {
    id: "team-5",
    name: "Mulugeta Woldetsadik",
    role: "Coordinator, Partnership and Community Engagement",
    organization: "Librarian Spotlight Africa",
    bio: "Spearheads pan-African institutional alliances and student engagement chapters.",
    photo_url: "/images/team-mulugeta.png",
    display_order: 5,
    initiative: "lsa",
    is_active: true
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Prof. Kenneth O. Nwabueze",
    role: "Director of Academic Planning",
    organization: "Admiralty University of Nigeria",
    quote: "Sylvester I. Ebhonu is a professional to the core. His mastery of digital library architecture, automated repository management, and his sheer commitment to building capacity in others has set a gold standard for our institution.",
    photo_url: "/images/test-kenneth.jpg",
    rating: 5,
    featured: true,
    location_context: "home"
  },
  {
    id: "test-2",
    name: "Dr. Amina Bello",
    role: "Senior Research Fellow",
    organization: "Nigerian Institute of Advanced Studies",
    quote: "Attending The Digital Librarian's AI Workshop fundamentally transformed how my research team handles systematic reviews. What used to take us two months now takes three days with complete citation accuracy.",
    photo_url: "/images/test-amina.jpg",
    rating: 5,
    featured: true,
    location_context: "upskilling"
  },
  {
    id: "test-3",
    name: "Chukwudi Okafor",
    role: "University Librarian & Secretary",
    organization: "Nigerian Library Association",
    quote: "Librarian Spotlight Africa is the single most vital storytelling platform our profession has seen in a generation. It restores dignity, showcases real innovation, and inspires the next generation of African information scientists.",
    photo_url: "/images/test-chukwudi.jpg",
    rating: 5,
    featured: true,
    location_context: "lsa"
  }
];

export const initialPartners: Partner[] = [
  {
    id: "part-1",
    name: "Admiralty University of Nigeria",
    logo_url: "/images/partner-adun.png",
    website_url: "https://adun.edu.ng",
    description: "Leading Maritime & Defense University in Nigeria",
    display_order: 1
  },
  {
    id: "part-2",
    name: "Grow with Google Partner Network",
    logo_url: "/images/partner-google.png",
    description: "Certified Haptics Trainer Partner for Digital Skills",
    display_order: 2
  },
  {
    id: "part-3",
    name: "Nigerian Library Association (NLA)",
    logo_url: "/images/partner-nla.png",
    description: "National Professional Association for Librarians",
    display_order: 3
  },
  {
    id: "part-4",
    name: "Sesitech Ventures",
    logo_url: "/images/partner-sesitech.png",
    description: "Multimedia, Creative & ICT Solutions Firm",
    display_order: 4
  },
  {
    id: "part-5",
    name: "Breakitdown Initiative Platform",
    logo_url: "/images/partner-breakitdown.png",
    description: "Youth Purpose & Empowerment Organization",
    display_order: 5
  },
  {
    id: "part-6",
    name: "INFOLIBNET",
    logo_url: "/images/partner-infolibnet.png",
    description: "Information & Library Science Network",
    display_order: 6
  }
];

export const initialNavigation: NavigationItem[] = [
  {
    id: "nav-home",
    label: "Home",
    url: "/",
    order: 1,
    open_in_new_tab: false
  },
  {
    id: "nav-about",
    label: "About",
    url: "/about",
    order: 2,
    open_in_new_tab: false,
    children: [
      { id: "sub-about-1", label: "The Digital Librarian", url: "/about", order: 1, description: "Our mission, philosophy and approach" },
      { id: "sub-about-2", label: "Sylvester Ebhonu", url: "/about/sylvester-ebhonu", order: 2, description: "Meet the Founder, Head of E-Services & Youthpreneur" },
      { id: "sub-about-3", label: "Our Team", url: "/about/team", order: 3, description: "The coordinators and advisors behind our mission" }
    ]
  },
  {
    id: "nav-solutions",
    label: "Solutions",
    url: "/solutions",
    order: 3,
    open_in_new_tab: false,
    children: [
      { id: "sub-sol-1", label: "Library & Information Solutions", url: "/solutions/library-information", order: 1 },
      { id: "sub-sol-2", label: "Research & Scholarly Support", url: "/solutions/research", order: 2 },
      { id: "sub-sol-3", label: "AI & Digital Literacy", url: "/solutions/ai-digital-literacy", order: 3 },
      { id: "sub-sol-4", label: "Capacity Building & Training", url: "/solutions/capacity-building", order: 4 },
      { id: "sub-sol-5", label: "ICT & Media Solutions", url: "/solutions/ict-media", order: 5 },
      { id: "sub-sol-6", label: "Consultancy & Contracts", url: "/solutions/consultancy", order: 6 }
    ]
  },
  {
    id: "nav-upskilling",
    label: "Upskilling Library",
    url: "/upskilling-library",
    order: 4,
    open_in_new_tab: false,
    children: [
      { id: "sub-up-1", label: "Resource Library & Books", url: "/upskilling-library", order: 1 },
      { id: "sub-up-2", label: "AI Productivity Tools Directory", url: "/upskilling-library#ai-tools", order: 2 },
      { id: "sub-up-3", label: "Courses & Masterclasses", url: "/upskilling-library#courses", order: 3 },
      { id: "sub-up-4", label: "TheDL Blog", url: "/blog", order: 4 }
    ]
  },
  {
    id: "nav-initiatives",
    label: "Initiatives",
    url: "/initiatives",
    order: 5,
    open_in_new_tab: false,
    children: [
      { id: "sub-init-1", label: "Librarian Spotlight Africa (LSA)", url: "/initiatives/librarian-spotlight-africa", order: 1 },
      { id: "sub-init-2", label: "Upskill & Connect Village", url: "/initiatives/upskill-connect-village", order: 2 },
      { id: "sub-init-3", label: "Upcoming Events", url: "/events", order: 3 },
      { id: "sub-init-4", label: "Event Archives", url: "/events#past", order: 4 }
    ]
  },
  {
    id: "nav-connect",
    label: "Connect",
    url: "/contact",
    order: 6,
    open_in_new_tab: false,
    children: [
      { id: "sub-con-1", label: "Work With TheDL", url: "/contact?subject=work", order: 1 },
      { id: "sub-con-2", label: "Partnerships", url: "/contact?subject=partnership", order: 2 },
      { id: "sub-con-3", label: "Speaking & Facilitation", url: "/contact?subject=speaking", order: 3 },
      { id: "sub-con-4", label: "Contact & Inquiries", url: "/contact", order: 4 }
    ]
  }
];

export const initialMediaItems: MediaItem[] = [
  {
    id: "med-1",
    title: "Sylvester Ebhonu Hero Portrait",
    file_name: "sylvester-hero.png",
    file_url: "/images/sylvester-hero.png",
    file_type: "image",
    file_size: "240 KB",
    created_at: "2026-09-15"
  },
  {
    id: "med-2",
    title: "AI Masterclass Flyer 2026",
    file_name: "event-ai-masterclass.jpg",
    file_url: "/images/event-ai-masterclass.jpg",
    file_type: "image",
    file_size: "450 KB",
    created_at: "2026-09-10"
  },
  {
    id: "med-3",
    title: "Lets Communicate Book Cover",
    file_name: "book-lets-communicate.jpg",
    file_url: "/images/book-lets-communicate.jpg",
    file_type: "image",
    file_size: "180 KB",
    created_at: "2026-09-01"
  }
];
