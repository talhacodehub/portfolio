/* Structured portfolio content for italha.com — edit here to update the page. */
window.SITE_DATA = {
  profile: {
    name: "Talha Khalid",
    initials: "TK",
    title: "Senior Software Engineer | WordPress, Integrations & AI Automation",
    location: "Lahore, Pakistan · Remote · On-site",
    email: "amtalhakhalid@gmail.com",
    linkedin: "https://www.linkedin.com/in/talha-sheikh-284a3a113/",
    linkedinLabel: "talha-sheikh",
    resumeUrl: "resume/talha-sheikh-resume.pdf",
    availability: "Open to opportunities",
    years: "9+",
    projectsShipped: "100+",
    liveWebsites: "70+"
  },

  services: [
    {
      id: "php-modernization",
      featured: true,
      name: "WordPress & Legacy PHP Modernization",
      problem: "Existing WordPress and PHP applications break during PHP upgrades, plugin updates, or hosting changes — and full rewrites are rarely the right first step.",
      deliverables: [
        "PHP version compatibility audits and upgrade remediation",
        "Legacy theme and plugin debugging",
        "Deprecated API and runtime error remediation",
        "Safe staging-based validation before production deployment",
        "Performance, maintainability, and technical SEO improvements"
      ],
      tech: ["PHP", "WordPress", "Custom Plugins", "Staging / Deploy"],
      cta: "Discuss a PHP Upgrade",
      mailtoSubject: "PHP / WordPress modernization inquiry"
    },
    {
      id: "crm-integrations",
      featured: true,
      name: "CRM, API & Business Workflow Integrations",
      problem: "Business data is trapped between websites, CRMs, and internal tools, creating manual work and inconsistent records.",
      deliverables: [
        "CRM-to-WordPress integrations and form-to-CRM workflows",
        "REST API and webhook implementations",
        "Data synchronization, mapping, and background processing",
        "Error handling, logging, retries, and sync monitoring",
        "Integration troubleshooting and operational documentation"
      ],
      tech: ["Zoho CRM", "WordPress", "REST APIs", "Webhooks", "Queues"],
      cta: "Plan an Integration",
      mailtoSubject: "CRM / API integration inquiry"
    },
    {
      id: "cloud-delivery",
      featured: true,
      name: "Cloud Deployment & CI/CD Implementation",
      problem: "Teams need reliable staging and production delivery from source control — without fragile manual releases.",
      deliverables: [
        "GitLab-based delivery pipelines for compatible applications",
        "Cloudflare Workers / Pages architecture assessment where appropriate",
        "Build, lint, type-check, and deployment pipeline troubleshooting",
        "Environment configuration and staging/production separation",
        "Deployment diagnostics, rollback considerations, and documentation"
      ],
      tech: ["GitLab CI/CD", "Cloudflare Workers", "Cloudflare R2", "Vite", "Bun"],
      cta: "Discuss Deployment",
      mailtoSubject: "Cloud deployment / CI-CD inquiry"
    },
    {
      id: "wp-templates",
      featured: false,
      name: "WordPress Website Development & Reusable Templates",
      problem: "Content teams need maintainable WordPress sites and reusable page systems instead of rebuilding every page from scratch.",
      deliverables: [
        "Custom WordPress themes and templates",
        "Elementor and reusable section implementations",
        "Landing pages and conversion-focused service pages",
        "CRM and contact-form integrations",
        "Responsive frontend implementation from approved designs"
      ],
      tech: ["WordPress", "Elementor", "PHP", "WooCommerce", "ACF"],
      cta: "Discuss a WordPress Build",
      mailtoSubject: "WordPress development inquiry"
    },
    {
      id: "ai-automation",
      featured: false,
      name: "AI Workflow Automation & Practical AI Integrations",
      problem: "Repetitive analysis, content, and support workflows can benefit from AI when the integration is scoped carefully.",
      deliverables: [
        "LLM API integrations into defined workflows",
        "AI-assisted data processing and content workflows",
        "Read-only knowledge and support assistants",
        "Prototype development and technical feasibility assessment",
        "Basic evaluation, validation, and human-review safeguards"
      ],
      tech: ["LLM APIs", "OpenAI APIs", "Automation", "Web Apps"],
      cta: "Discuss an Automation",
      mailtoSubject: "AI automation inquiry"
    },
    {
      id: "seo-audit",
      featured: false,
      name: "Technical SEO, Performance & Website Auditing",
      problem: "Crawlability, metadata, broken URLs, and performance issues quietly reduce site quality and maintainability.",
      deliverables: [
        "Technical SEO and structure audits",
        "Broken and duplicate URL analysis",
        "Metadata and internal-linking checks",
        "Core Web Vitals investigation",
        "Prioritized remediation plans and targeted implementation"
      ],
      tech: ["Technical SEO", "WordPress", "Performance", "Auditing"],
      cta: "Request an Audit",
      mailtoSubject: "Technical SEO / audit inquiry"
    }
  ],

  caseStudies: [
    {
      id: "rt-labs",
      featured: true,
      title: "Modernizing a Legacy Corporate Website into a Component-Driven Web Platform",
      category: "Website modernization · Cloud delivery",
      status: "ongoing",
      statusLabel: "Ongoing",
      context: "Rebuilding a WordPress-origin corporate marketing site into a React-based, component-driven static platform with reusable templates, migrated content structures, and a GitLab delivery pipeline targeting Cloudflare Workers.",
      role: "Engineering implementation across frontend architecture, content migration patterns, media delivery, SEO route hygiene, and CI/CD configuration.",
      approach: [
        "Component-based React architecture with shared page templates for service, product, and content pages",
        "Migration of service pages, blog content, case studies, and navigation into maintainable content modules",
        "Cloudflare R2 for public media delivery via build-time media base URL configuration",
        "GitLab CI stages for format, lint, typecheck, build, link checks, and staging Worker deployment",
        "Clear separation between local development, staging branch deploys, and production configuration"
      ],
      challenges: "Balancing content parity with a cleaner information architecture; keeping media out of the repository; and ensuring SSR/media configuration is correct so staging builds remain reliable.",
      outcome: "Staging deployment pipeline and Worker configuration are in active use. Production cutover depends on verified production environment configuration and remaining validation — not claimed as fully complete here.",
      stack: ["React", "TypeScript", "TanStack Start", "Vite", "Bun", "GitLab CI/CD", "Cloudflare Workers", "Cloudflare R2"],
      note: "Independent / client engineering work. No private repository URLs or credentials are published."
    },
    {
      id: "zoho-sync",
      featured: true,
      title: "Zoho CRM → WordPress Vendor Synchronization",
      category: "Integration · CRM",
      status: "completed",
      statusLabel: "Completed",
      context: "Vendor records, notes, and media needed to stay consistent between Zoho CRM and WordPress without manual copy-paste between systems.",
      role: "Designed and implemented a bi-directional automation pipeline connecting Zoho CRM and WordPress.",
      approach: [
        "Webhook and scheduled-job driven synchronization",
        "Notes and photo/media sync between platforms",
        "Queue-based background processing for reliable record handling",
        "Mapping and processing patterns suited to ongoing vendor updates"
      ],
      challenges: "Keeping large volumes of vendor data consistent while handling media and notes as first-class sync concerns, not afterthoughts.",
      outcome: "Automated synchronization reduced manual intervention for vendor record consistency. Exact production record counts are not published beyond previously verified portfolio language.",
      stack: ["Zoho CRM", "WordPress", "PHP", "Webhooks", "Queue Workers"]
    },
    {
      id: "php-compat",
      featured: true,
      title: "Diagnosing Legacy WordPress Compatibility Issues During a PHP Upgrade",
      category: "WordPress · PHP modernization",
      status: "completed",
      statusLabel: "Completed",
      context: "Legacy WordPress themes and plugins surface deprecation warnings and fatal errors when runtimes move forward — especially around function signatures, obsolete autoloading, and older PHP syntax.",
      role: "Investigated compatibility failures, inspected call sites before changing signatures, and applied focused patches validated in controlled environments.",
      approach: [
        "Triage deprecation warnings and fatal errors from logs and staging environments",
        "Review legacy plugins/themes for obsolete autoloading and incompatible signatures",
        "Patch carefully at call sites rather than rewriting entire systems",
        "Validate on staging or a compatible test runtime before production promotion"
      ],
      challenges: "Local PHP versions may not match production. A warning disappearing locally is not proof a change is safe — staging validation remains essential.",
      outcome: "Focused remediation reduced upgrade risk without unnecessary full rewrites. Client systems and private code are not disclosed.",
      stack: ["PHP", "WordPress", "Custom Plugins", "Staging Validation"]
    },
    {
      id: "ai-agent",
      featured: true,
      title: "AI Website Analysis Agent",
      category: "AI tooling · Prototype",
      status: "prototype",
      statusLabel: "Prototype",
      context: "A practical engineering prototype for accepting a website URL, analyzing pages, and organizing SEO/QA findings through a structured interface assisted by LLM tooling where configured.",
      role: "Built frontend and backend pieces for audit workflows, tool registry patterns, and report-oriented presentation.",
      approach: [
        "URL intake and page/analysis tooling for website inspection",
        "SEO and QA-oriented audit checks with structured reporting",
        "Progress-aware sessions for longer-running analysis work",
        "React frontend for presenting findings; Express-based backend agent tooling"
      ],
      challenges: "Keeping AI assistance scoped to useful engineering workflows — analysis and reporting — rather than overstating autonomy or production readiness.",
      outcome: "Working prototype with audit tooling and UI. Not presented as a mature commercial SaaS product.",
      stack: ["React", "TypeScript", "Express", "LLM tooling", "SEO audit utilities"]
    },
    {
      id: "erp",
      featured: false,
      title: "ERP Software Development",
      category: "Enterprise · ERP",
      status: "completed",
      statusLabel: "Completed",
      context: "Departments needed inventory, finance, and reporting workflows that were previously slowed by repetitive manual processes.",
      role: "Built enterprise ERP modules on a Laravel + MySQL stack with role-based access and automation jobs.",
      approach: [
        "Normalised schemas and role-based access",
        "Exportable reporting",
        "Automation jobs for repetitive departmental processes",
        "REST API-oriented module design"
      ],
      challenges: "Balancing operational reporting needs with maintainable data models across departments.",
      outcome: "Production ERP modules supporting inventory, finance, and reporting workflows.",
      stack: ["Laravel", "MySQL", "REST APIs", "Queues", "Reporting"]
    },
    {
      id: "headless-cms",
      featured: false,
      title: "Headless CMS Platform (Contentful + Next.js)",
      category: "Headless · CMS",
      status: "completed",
      statusLabel: "Completed",
      context: "Editors needed independent publishing while developers continued shipping frontend components in parallel.",
      role: "Implemented a headless architecture with Contentful as the content backend and Next.js on the frontend.",
      approach: [
        "Structured content models and preview environments",
        "ISR / SSG rendering for SEO-friendly pages",
        "Component-driven frontend delivery"
      ],
      challenges: "Keeping editor workflows independent from developer release cycles without sacrificing SEO-friendly rendering.",
      outcome: "Editors publish independently while developers ship components in parallel.",
      stack: ["Next.js", "Contentful", "React", "ISR / SSG", "SEO"]
    },
    {
      id: "react-apis",
      featured: false,
      title: "React Integration & API Systems",
      category: "Frontend · APIs",
      status: "completed",
      statusLabel: "Completed",
      context: "Internal tools needed reusable React modules with reliable authentication and data-layer patterns.",
      role: "Built reusable frontend modules and REST API integrations for enterprise applications.",
      approach: [
        "JWT / OAuth authentication flows",
        "Pagination and optimistic UI patterns",
        "Error-tolerant data layers"
      ],
      challenges: "Improving load times and developer experience without fragile one-off integrations.",
      outcome: "Reusable React modules and more maintainable API integration patterns across internal tools.",
      stack: ["React.js", "REST APIs", "JWT", "OAuth", "Tailwind"]
    },
    {
      id: "wp-landing-templates",
      featured: false,
      title: "WordPress Landing Pages & Reusable Template Systems",
      category: "WordPress · Templates",
      status: "completed",
      statusLabel: "Completed",
      context: "Teams needed consistent, responsive landing pages and reusable sections for service offerings — including CRM-related marketing pages — without rebuilding markup for every campaign.",
      role: "Implemented maintainable WordPress page structures, Elementor-compatible sections where applicable, and reusable inquiry/contact patterns.",
      approach: [
        "Reusable page structures and scoped styling",
        "Responsive implementation from approved designs",
        "CRM-aware contact/inquiry patterns where required",
        "Maintainability across multiple landing pages"
      ],
      challenges: "Preventing global WordPress styles from breaking reusable sections; keeping forms and layouts consistent across pages.",
      outcome: "Reusable template systems that reduce per-page rebuild cost. Individual client pages are not all listed publicly.",
      stack: ["WordPress", "Elementor", "PHP", "Responsive CSS", "Forms"]
    }
  ],

  experience: [
    {
      dates: "2022 — Present",
      title: "Senior Full Stack Software Engineer",
      company: "Dezinic",
      description: "Lead enterprise integrations and automation: Laravel / Slim backends, Zoho CRM ↔ WordPress sync engines, queue-driven vendor pipelines, React / Next.js frontends, and AI-assisted workflows on AWS. Ownership spans API design, background processing, and production delivery of business-critical web systems."
    },
    {
      dates: "2019 — 2022",
      title: "Web Developer",
      company: "Prima Systems",
      description: "Delivered production WordPress and PHP platforms, custom plugins, WooCommerce stores, and Angular dashboards for international clients with strict performance and SEO targets. Focused on maintainable themes, integrations, and reliable shipping."
    },
    {
      dates: "2017 — 2019",
      title: "Web Developer",
      company: "Base29",
      description: "Built responsive websites end-to-end — converting PSD / Figma / XD designs into production-ready WordPress themes and shipping client work on tight deadlines. Established foundational delivery practices across the WordPress and PHP stack."
    }
  ],

  education: [
    { years: "2013 — 2017", degree: "BSCS", school: "Virtual University of Pakistan" },
    { years: "2010 — 2012", degree: "FSc — Pre Engineering", school: "Govt College of Science, Lahore" },
    { years: "2008 — 2009", degree: "Matric", school: "Center Model School, Samnabad, Lahore" }
  ],

  capabilities: [
    {
      title: "Backend Engineering",
      summary: "PHP services, APIs, databases, auth, and background processing for business-critical systems.",
      tags: ["PHP", "Laravel", "Slim Framework", "REST APIs", "MySQL", "JWT / OAuth", "Queues"]
    },
    {
      title: "Frontend Engineering",
      summary: "Responsive interfaces and application frontends with maintainable component patterns.",
      tags: ["React", "Next.js", "Angular", "JavaScript", "TypeScript", "HTML / CSS", "Tailwind"]
    },
    {
      title: "WordPress & Content Platforms",
      summary: "Themes, plugins, headless CMS, structured content, and SEO-aware rendering.",
      tags: ["WordPress", "Custom Plugins", "Elementor", "WooCommerce", "Headless CMS", "Contentful", "SEO"]
    },
    {
      title: "CRM & Enterprise Integration",
      summary: "Connecting CRMs, websites, and internal systems with reliable sync and webhook patterns.",
      tags: ["Zoho CRM", "Webhooks", "Data Sync", "ERP workflows", "API Integrations"]
    },
    {
      title: "Cloud & Delivery",
      summary: "Source-controlled delivery pipelines, Worker/static hosting patterns, and deployment troubleshooting.",
      tags: ["Git", "GitLab CI/CD", "Cloudflare Workers", "Cloudflare R2", "AWS", "Staging / Prod separation"]
    },
    {
      title: "AI & Automation",
      summary: "Practical LLM integrations and automation for defined workflows — including prototypes.",
      tags: ["LLM API integration", "AI-assisted workflows", "Automation", "Structured extraction", "Prototypes"]
    }
  ],

  approach: [
    { step: "01", title: "Understand", text: "Clarify the business problem, current system, constraints, and desired outcome." },
    { step: "02", title: "Investigate", text: "Inspect existing code, integrations, dependencies, risks, and available evidence." },
    { step: "03", title: "Design", text: "Select a practical solution that fits the system rather than adding unnecessary complexity." },
    { step: "04", title: "Implement", text: "Build focused, maintainable changes with appropriate error handling and documentation." },
    { step: "05", title: "Validate", text: "Test behavior, integrations, responsive layouts, and relevant performance or SEO concerns." },
    { step: "06", title: "Deliver", text: "Prepare deployment changes, communicate limitations, and document follow-up recommendations." }
  ],

  testimonials: [
    {
      quote: "I have worked with Talha on a range of website designs, e-commerce solutions and core development. His service is creative, timely and accurate. He is a great developer who knows how to bring up solutions for more sales and revenue.",
      name: "Owais Gilani",
      role: "Creative Director"
    },
    {
      quote: "Talha developed many websites for me and my clients. His dedication to his work and knowledge — especially of WordPress and Laravel — is outstanding. It is always a good experience working with him.",
      name: "Adeel Adil",
      role: "Digital Marketing Manager"
    },
    {
      quote: "Talha is very reliable, dedicated and knowledgeable. He is quick, accurate, has great analytical skills and is a perfect web developer. It is an absolute pleasure to work with him.",
      name: "Ahmed Zafar",
      role: "Senior Software Quality Assurance"
    }
  ],

  wpProjects: [
    { name: "Skin Laser & Surgery", url: "https://www.skinandlasers.com/" },
    { name: "Schweiger Dermatology Group", url: "https://www.schweigerderm.com/" },
    { name: "Bernstein Medical", url: "https://www.bernsteinmedical.com/" },
    { name: "Porter & York", url: "https://porterandyork.com/" },
    { name: "Purity Peptide", url: "https://www.puritypeptide.com/" },
    { name: "Brown Bag Popcorn Co.", url: "https://www.brownbagpopcornco.com/" },
    { name: "Good Batch", url: "https://thegoodbatch.com/" },
    { name: "Cannabis Certified", url: "https://www.cannabiscertified.org/" },
    { name: "Cannabis Training Institute", url: "https://cannabistraininginstitute.com/" },
    { name: "iMusic Academy", url: "https://imusicacademy.com/" },
    { name: "Insight Eye Clinic", url: "https://insighteye.com.au/" },
    { name: "Mind Scholar", url: "https://mindscholar.com.au/" },
    { name: "Brian Francis DMD", url: "https://www.brianfrancisdmd.com/" },
    { name: "American Bancshares Mortgage", url: "https://myabsm.com/" },
    { name: "Linda G. Williams Consulting", url: "https://www.lwilliamsconsulting.com/" },
    { name: "Pinnacle Claim Services", url: "https://www.pinnacleclaimservices.com/" },
    { name: "Windsor Marketplace", url: "https://marketplace.windsorlifesettlements.com/" },
    { name: "Elysee Homes", url: "https://elyseehomes.com/" },
    { name: "Kanthan Realty", url: "https://www.kanthanrealty.com/" },
    { name: "Abio Properties", url: "https://abioproperties.com/" },
    { name: "Milestone Gem", url: "https://milestonegem.com/" },
    { name: "Orchid Nest", url: "https://www.orchidnest.com/" },
    { name: "Little Posy", url: "https://www.littleposy.com.au/" },
    { name: "Aqua View Fencing", url: "https://www.aquaviewfencing.com/" },
    { name: "Dunning's Fuel", url: "https://www.dunningsfuel.com.au/" },
    { name: "United Service Dog", url: "https://www.unitedservicedog.com/" },
    { name: "Trishia Grace", url: "https://trishiagrace.com/" },
    { name: "L'opportunità Italiana", url: "https://lopportunitaitaliana.com/" },
    { name: "Auto Warranty POA", url: "https://www.autowarrantypoa.com/" },
    { name: "Fixit Services", url: "https://fixit-services.net/" },
    { name: "Willow Tree Media", url: "http://willowtreemedia.com/" },
    { name: "Prima Systems", url: "https://primasystems.net/" }
  ]
};
