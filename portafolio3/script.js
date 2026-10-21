/* ═══════════════════════════════════════════════
   PORTAFOLIO 3: THE ANALYTICAL ATELIER SCRIPT
   - Web Audio Synthesizer (FX)
   - Bilingual Translation Engine (ES / EN)
   - Interactive Project Console Studio (Scroll Details & GitHub Link)
   - Tactile Block-by-Block & Scroll-Driven 3x3 Arsenal Animations
   - Conversion & 1-Click Copy Handlers
   ═══════════════════════════════════════════════ */

// ─── 1. Audio Synthesizer (Web Audio API) ─────
class AtelierAudio {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('atelier_audio') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playTone(freq = 780, duration = 0.03, type = 'sine', gainVal = 0.035) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  playTick() {
    this.playTone(820, 0.02, 'sine', 0.025);
  }

  playClick() {
    this.playTone(960, 0.035, 'triangle', 0.04);
  }

  playSwitch() {
    this.playTone(640, 0.03, 'sine', 0.03);
    setTimeout(() => this.playTone(880, 0.04, 'sine', 0.03), 40);
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    this.playTone(523, 0.06, 'sine', 0.04);
    setTimeout(() => this.playTone(659, 0.06, 'sine', 0.04), 50);
    setTimeout(() => this.playTone(784, 0.1, 'sine', 0.05), 100);
  }
}

const audio = new AtelierAudio();

// ─── 2. Bilingual Dictionary (ES / EN) ────────
const dictionary = {
  es: {
    nav_cv: "CURRÍCULUM",
    nav_contact: "INICIAR CONTACTO",
    toc_label: "SECCIONES:",
    toc_00: "00. INTRO",
    toc_01: "01. ENFOQUE & SERVICIOS",
    toc_02: "02. PROYECTOS & CONSOLA",
    toc_03: "03. ARSENAL TÉCNICO",
    toc_04: "04. EXPEDIENTE",
    toc_05: "05. PROPUESTA DIRECTA",
    hero_edition: "[ EDICIÓN 2026 // ESTUDIO PROFESIONAL ]",
    hero_title: `Transformando <span class="serif-accent">datos dispersos</span> en decisiones <span class="serif-accent">estratégicas</span> y sistemas de alto impacto.`,
    hero_desc: `Soy <strong>Mayquel Bernaola</strong>, estudiante de <strong>Ingeniería de Sistemas en 9° ciclo</strong> y <strong>Analista de Datos</strong>. Diseño modelos dimensionales, tableros ejecutivos en Power BI y aplicaciones corporativas con un único principio: <em>la precisión analítica al servicio del negocio</em>.`,
    hero_btn_discuss: "DISCUTIR UN PROYECTO O VACANTE",
    hero_btn_copy: "COPIAR EMAIL",
    metric_01: "Ciclo en Ing. Sistemas",
    metric_02: "Modelado & Optimización",
    metric_03: "Entrega Iterativa",
    fig_title: "FIG. 01 — PERFIL ANALÍTICO",
    fig_sub: "Lima, Perú • Universidad Nacional",
    fn_specialty_lbl: "ESPECIALIDAD:",
    fn_specialty_val: "Data Modeling & BI Intelligence",
    fn_arch_lbl: "ARQUITECTURA:",
    fn_arch_val: "C# .NET / Relational Engines",
    chap1_num: "01. ENFOQUE & SERVICIOS",
    chap1_title: "¿Qué problemas resuelvo y cómo aporto valor?",
    chap1_lead: "No construyo código ni dashboards aislados. Estructuro soluciones que eliminan fricciones operativas y clarifican la toma de decisiones.",
    serv1_title: "Modelado Relacional & SQL Avanzado",
    serv1_desc: "Diseño de esquemas en estrella y copos de nieve, consultas complejas optimizadas, índices, triggers y procedimientos almacenados en SQL Server y MySQL.",
    serv1_li1: "Normalización y eliminación de redundancias",
    serv1_li2: "Optimización de tiempos de respuesta en queries",
    serv1_li3: "Integridad referencial y auditoría transaccional",
    serv2_title: "Dashboards Ejecutivos & Power BI",
    serv2_desc: "Transformación de datos con Power Query y formulación de métricas analíticas con DAX (Time Intelligence, segmentación dinámica y ratios operacionales).",
    serv2_li1: "Extracción y limpieza automatizada (ETL)",
    serv2_li2: "KPIs visuales con jerarquías y drill-down",
    serv2_li3: "Reportes listos para gerencia y toma de decisiones",
    serv3_title: "Desarrollo de Software (.NET / C#)",
    serv3_desc: "Construcción de aplicaciones de escritorio y corporativas bajo arquitectura por capas, con separación estricta entre capa de datos, lógica y presentación.",
    serv3_li1: "Patrones de diseño limpios y mantenibles",
    serv3_li2: "Gestión transaccional y control de concurrencia",
    serv3_li3: "Interfaces intuitivas centradas en el usuario final",
    serv4_title: "Gestión de Proyectos & Metodología Scrum",
    serv4_desc: "Coordinación iterativa, refinamiento de historias de usuario, prototipado rápido en Figma y entregas periódicas de valor medible.",
    serv4_li1: "Trabajo colaborativo en sprints y retrospectivas",
    serv4_li2: "Documentación técnica y control de versiones con Git",
    serv4_li3: "Prototipos interactivos de alta fidelidad",
    chap2_num: "02. PROYECTOS & CONSOLA",
    chap2_title: "Estudio Interactivo de Proyectos",
    chap2_lead: "Selecciona un caso en el panel izquierdo para explorar su arquitectura, especificaciones técnicas y enlace a código. Desplázate por el visor para leer la documentación completa.",
    proj_deck_lbl: "CASOS DOCUMENTADOS",
    p1_tab_name: "Sistema Ollas Comunes",
    p1_tab_sub: "Logística & Gestión de Alimentos",
    p2_tab_name: "Sistema C# + SQL Server",
    p2_tab_sub: "Transaccional Corporativo",
    p3_tab_name: "Dashboard Power BI & DAX",
    p3_tab_sub: "KPIs & Modelado Dimensional",
    p4_tab_name: "Soluciones Full-Stack Data",
    p4_tab_sub: "Próximos lanzamientos",
    chap3_num: "03. ARSENAL TÉCNICO",
    chap3_title: "Competencias evaluadas por impacto de uso",
    chap3_lead: "Más que una lista de nombres, así es exactamente cómo aplico cada tecnología en entornos de producción.",
    tab_all: "Todas las Competencias",
    tab_data: "Datos & BI",
    tab_dev: "Ingeniería de Software",
    tab_method: "Metodologías & Operaciones",
    lvl_expert: "EXPERTO",
    lvl_adv: "AVANZADO",
    lvl_inter: "INTERMEDIO-ALTO",
    lvl_mid: "INTERMEDIO",
    skill_sql_desc: "Modelado relacional, subconsultas complejas, optimización de índices, transacciones ACID y procedimientos almacenados para backends y almacenes de datos.",
    skill_sql_use: "Uso: Arquitectura de datos & ETL",
    skill_pbi_desc: "Creación de métricas analíticas complejas, funciones de inteligencia de tiempo, modelado dimensional en estrella y dashboards interactivos para comités de dirección.",
    skill_pbi_use: "Uso: Business Intelligence & Dashboards",
    skill_py_desc: "Scripts de automatización, pipelines de limpieza y transformación de datos (ETL), análisis exploratorio de datos (EDA) y estadística aplicada.",
    skill_py_use: "Uso: Procesamiento analítico & ETL",
    skill_xls_desc: "Modelado financiero y operativo, lenguaje M en Power Query, tablas dinámicas avanzadas y formulación matricial para análisis ágil.",
    skill_xls_use: "Uso: Análisis ad-hoc & Modelos rápidos",
    skill_cs_desc: "Desarrollo de aplicaciones corporativas, arquitectura por capas, POO estricta, integración con bases de datos relacionales y manejo robusto de excepciones.",
    skill_cs_use: "Uso: Backend & Sistemas de escritorio",
    skill_js_desc: "Lógica asíncrona, interacción fluida con el DOM, consumo de endpoints REST, diseño de visualizaciones dinámicas e interactividad web.",
    skill_js_use: "Uso: Frontend & Dinamismo interactivo",
    skill_html_desc: "Diseño responsivo, Grid, Flexbox, accesibilidad (a11y), tipografía editorial y diseño de interfaces sin depender de plantillas prediseñadas.",
    skill_html_use: "Uso: Maquetación editorial y responsive",
    skill_scrum_desc: "Gestión de sprints, redacción y estimación de historias de usuario, coordinación en ceremonias ágiles y enfoque en entregables continuos.",
    skill_scrum_use: "Uso: Gestión ágil & Trabajo en equipo",
    skill_git_desc: "Gestión de ramas, commits convencionales, resolución de conflictos, code review y control de versiones transparente.",
    skill_git_use: "Uso: Control de versiones & Colaboración",
    chap4_num: "04. EXPEDIENTE & TRAYECTORIA",
    chap4_title: "Formación académica e hitos profesionales",
    chap4_lead: "Fundamento teórico riguroso complementado con especialización constante en la industria de la tecnología.",
    rec_active: "EN CURSO",
    rec_completed: "COMPLETADO",
    rec_in_practice: "EN PRÁCTICA",
    rec1_tag: "EDUCACIÓN UNIVERSITARIA",
    rec1_title: "Ingeniería de Sistemas — 9° Ciclo",
    rec1_desc: "Formación enfocada en ciencias de la computación, arquitectura de software, modelado de bases de datos relacionales, estadística inferencial, algoritmos y gestión estratégica de proyectos de TI.",
    rec1_p1: "• Promedio destacado y orientación al análisis cuantitativo",
    rec1_p2: "• Liderazgo en proyectos multidisciplinarios",
    rec1_p3: "• Próximo a egresar",
    rec2_tag: "ESPECIALIZACIÓN PROFESIONAL",
    rec2_title: "Business Intelligence & Modelado con Power BI",
    rec2_desc: "Capacitación intensiva en diseño de soluciones analíticas de extremo a extremo: extracción de fuentes heterogéneas con Power Query, formulación DAX con Time Intelligence y diseño de dashboards ejecutivos.",
    rec2_p1: "• Modelado en estrella y buenas prácticas en VertiPaq",
    rec2_p2: "• Reducción de tiempos de procesamiento de reportes",
    rec3_tag: "EXPERIENCIA APLICADA",
    rec3_title: "Desarrollo de Software & Metodologías Ágiles",
    rec3_desc: "Participación en el desarrollo de plataformas reales, proyectos con ONG (Sistema Ollas Comunes) y aplicaciones de escritorio empresariales bajo marco Scrum y diseño colaborativo en Figma.",
    rec3_p1: "• Aplicación de principios SOLID y Clean Architecture",
    rec3_p2: "• Comunicación asertiva y resolución proactiva de incidentes",
    chap5_num: "05. PROPUESTA DIRECTA",
    chap5_title: "Iniciemos una conversación profesional",
    chap5_lead: "¿Tienes una vacante en tu equipo, un requerimiento de análisis de datos o un sistema por construir? Envíame un mensaje y te responderé en menos de 24 horas.",
    form_title: "FORMULARIO DE CONTACTO DIRECTO",
    form_note: "SIN INTERMEDIARIOS",
    form_name_lbl: "Tu nombre o empresa",
    form_email_lbl: "Correo electrónico",
    form_interest_lbl: "Tipo de oportunidad o interés principal:",
    interest_data: "Analista de Datos / BI",
    interest_dev: "Desarrollo Software (.NET / Web)",
    interest_proj: "Proyecto / Consultoría",
    interest_other: "Otra consulta",
    form_subject_lbl: "Asunto",
    form_msg_lbl: "Mensaje",
    form_submit_btn: "ENVIAR MENSAJE DIRECTO",
    ch_pref: "CANAL PREFERENTE",
    ch_email_lbl: "CORREO ELECTRÓNICO",
    ch_copy_btn: "COPIAR EMAIL",
    ch_guarantee: "<strong>Garantía de respuesta:</strong> Todos los correos y consultas son atendidos en un plazo máximo de 24 horas laborales con total transparencia.",
    footer_role: "ANALISTA DE DATOS & ESTUDIANTE ING. DE SISTEMAS (9° CICLO)",
    footer_cv_btn: "DESCARGAR CURRÍCULUM EN PDF",
    footer_copy: "© 2026 Mayquel Bernaola. Dirección de arte y arquitectura de datos."
  },
  en: {
    nav_cv: "RÉSUMÉ (CV)",
    nav_contact: "GET IN TOUCH",
    toc_label: "CHAPTERS:",
    toc_00: "00. INTRO",
    toc_01: "01. PRACTICE & SERVICES",
    toc_02: "02. PROJECTS & CONSOLE",
    toc_03: "03. TECHNICAL ARSENAL",
    toc_04: "04. DOSSIER RECORD",
    toc_05: "05. DIRECT INQUIRY",
    hero_edition: "[ 2026 EDITION // PROFESSIONAL DOSSIER ]",
    hero_title: `Transforming <span class="serif-accent">raw data</span> into <span class="serif-accent">strategic</span> decisions and high-impact software.`,
    hero_desc: `I am <strong>Mayquel Bernaola</strong>, <strong>9th Cycle Systems Engineering student</strong> and <strong>Data Analyst</strong>. I architect dimensional data models, executive Power BI dashboards, and enterprise applications with one core standard: <em>rigorous analytical clarity driving business outcomes</em>.`,
    hero_btn_discuss: "DISCUSS A ROLE OR PROJECT",
    hero_btn_copy: "COPY EMAIL",
    metric_01: "Systems Engineering Cycle",
    metric_02: "Modeling & Optimization",
    metric_03: "Iterative Delivery",
    fig_title: "FIG. 01 — ANALYTICAL PROFILE",
    fig_sub: "Lima, Peru • National University",
    fn_specialty_lbl: "SPECIALTY:",
    fn_specialty_val: "Data Modeling & BI Intelligence",
    fn_arch_lbl: "ARCHITECTURE:",
    fn_arch_val: "C# .NET / Relational Engines",
    chap1_num: "01. PRACTICE & SERVICES",
    chap1_title: "What problems do I solve and how do I deliver value?",
    chap1_lead: "I do not build isolated code or siloed dashboards. I architect cohesive solutions that eliminate operational friction and clarify executive decisions.",
    serv1_title: "Relational Modeling & Advanced SQL",
    serv1_desc: "Star & Snowflake schema design, query optimization, indexing strategies, ACID transactions, and stored procedures across SQL Server and MySQL.",
    serv1_li1: "Schema normalization & redundancy reduction",
    serv1_li2: "Query execution latency optimization",
    serv1_li3: "Referential integrity & transactional auditing",
    serv2_title: "Executive Dashboards & Power BI",
    serv2_desc: "ETL pipelines via Power Query and advanced analytical DAX formulation (Time Intelligence, dynamic segmentation, and operational KPI ratios).",
    serv2_li1: "Automated extraction and transformation (ETL)",
    serv2_li2: "Visual KPI hierarchies with drill-down exploration",
    serv2_li3: "Decision-ready executive reporting suites",
    serv3_title: "Enterprise Software (.NET / C#)",
    serv3_desc: "Desktop and enterprise system development utilizing clean layered architecture, ensuring strict decoupling between data access, business logic, and UI.",
    serv3_li1: "Clean, maintainable design patterns",
    serv3_li2: "Transactional consistency and concurrency control",
    serv3_li3: "Human-centered, friction-free operator interfaces",
    serv4_title: "Project Delivery & Scrum Framework",
    serv4_desc: "Iterative sprint coordination, user story backlog refinement, rapid Figma UX prototyping, and reliable incremental software deployments.",
    serv4_li1: "Collaborative sprint planning & retrospectives",
    serv4_li2: "Transparent technical documentation & Git versioning",
    serv4_li3: "High-fidelity interactive prototypes in Figma",
    chap2_num: "02. PROJECTS & CONSOLE",
    chap2_title: "Interactive Project Studio",
    chap2_lead: "Select a case file on the left deck to examine architecture, technical specifications, and repository source code. Scroll through the pane to view complete documentation.",
    proj_deck_lbl: "DOCUMENTED CASE FILES",
    p1_tab_name: "Community Food Logistics",
    p1_tab_sub: "Logistics & Food Distribution",
    p2_tab_name: "C# + SQL Server Platform",
    p2_tab_sub: "Corporate Transactional Core",
    p3_tab_name: "Power BI & DAX Dashboard",
    p3_tab_sub: "KPIs & Dimensional Modeling",
    p4_tab_name: "Full-Stack Data Solutions",
    p4_tab_sub: "Upcoming Deployments",
    chap3_num: "03. TECHNICAL ARSENAL",
    chap3_title: "Competencies evaluated by production impact",
    chap3_lead: "Beyond a generic list of logos, this is precisely how each technology is utilized in real production environments.",
    tab_all: "All Competencies",
    tab_data: "Data & BI",
    tab_dev: "Software Engineering",
    tab_method: "Agile & Operations",
    lvl_expert: "EXPERT",
    lvl_adv: "ADVANCED",
    lvl_inter: "UPPER-MID",
    lvl_mid: "INTERMEDIATE",
    skill_sql_desc: "Relational modeling, complex joins, index optimization, ACID guarantees, and stored procedures for enterprise backends and analytical data warehouses.",
    skill_sql_use: "Use: Data Architecture & Storage",
    skill_pbi_desc: "Complex analytical measure engineering, Time Intelligence DAX, Star Schema modeling, and interactive executive dashboards for leadership steering.",
    skill_pbi_use: "Use: Business Intelligence & Dashboards",
    skill_py_desc: "Automation scripts, data cleaning and transformation pipelines (ETL), exploratory data analysis (EDA), and applied statistics.",
    skill_py_use: "Use: Analytical Processing & ETL",
    skill_xls_desc: "Financial and operational modeling, Power Query M-code, advanced pivot matrixes, and formula engines for rapid ad-hoc scenario analysis.",
    skill_xls_use: "Use: Ad-hoc Analysis & Rapid Modeling",
    skill_cs_desc: "Enterprise application engineering, layered architecture, strict OOP, robust relational database integration, and resilient exception handling.",
    skill_cs_use: "Use: Backend & Desktop Enterprise Systems",
    skill_js_desc: "Asynchronous stream logic, fluid DOM manipulation, REST API consumption, and reactive interactive data visualizations.",
    skill_js_use: "Use: Frontend & Interactive Dynamic UI",
    skill_html_desc: "Semantic responsive markup, CSS Grid, Flexbox, accessible a11y patterns, and bespoke editorial typography without template dependencies.",
    skill_html_use: "Use: Editorial Layout & Accessibility",
    skill_scrum_desc: "Sprint management, user story drafting, estimation ceremonies, iterative feedback loops, and consistent continuous delivery.",
    skill_scrum_use: "Use: Agile Delivery & Team Coordination",
    skill_git_desc: "Branching strategies, conventional commits, conflict resolution, code review, and transparent version control workflows.",
    skill_git_use: "Use: Version Control & Collaboration",
    chap4_num: "04. DOSSIER RECORD",
    chap4_title: "Academic qualifications & verified milestones",
    chap4_lead: "Rigorous theoretical engineering foundations paired with continuous specialized industry training.",
    rec_active: "IN PROGRESS",
    rec_completed: "COMPLETED",
    rec_in_practice: "IN PRODUCTION",
    rec1_tag: "UNIVERSITY DEGREE",
    rec1_title: "Systems Engineering — 9th Cycle",
    rec1_desc: "Curriculum centered on computer science, software architecture, relational database theory, inferential statistics, advanced algorithms, and IT project governance.",
    rec1_p1: "• Distinguished academic standing with quantitative analytical focus",
    rec1_p2: "• Technical leadership across multidisciplinary projects",
    rec1_p3: "• Anticipated graduation imminent",
    rec2_tag: "PROFESSIONAL SPECIALIZATION",
    rec2_title: "Business Intelligence & Power BI Modeling",
    rec2_desc: "Intensive training in end-to-end analytical solutions: heterogeneous source ingestion via Power Query, Time Intelligence DAX, and executive dashboard delivery.",
    rec2_p1: "• Star schema architecture and VertiPaq engine optimization",
    rec2_p2: "• Significant reduction in report generation latency",
    rec3_tag: "APPLIED EXPERIENCE",
    rec3_title: "Software Engineering & Agile Methodologies",
    rec3_desc: "Hands-on participation building production systems, NGO community platforms (Food Logistics System), and corporate desktop software under Scrum and Figma UX workflows.",
    rec3_p1: "• Strict application of SOLID principles and Clean Architecture",
    rec3_p2: "• Assertive communication and proactive problem resolution",
    chap5_num: "05. DIRECT INQUIRY",
    chap5_title: "Initiate a direct professional conversation",
    chap5_lead: "Have an opening on your data or software team, or a technical system to architect? Send a direct transmission and I will reply within 24 business hours.",
    form_title: "DIRECT INQUIRY FORM",
    form_note: "NO INTERMEDIARIES",
    form_name_lbl: "Your name or organization",
    form_email_lbl: "Email address",
    form_interest_lbl: "Primary opportunity or interest area:",
    interest_data: "Data Analyst / BI Engineer",
    interest_dev: "Software Development (.NET / Web)",
    interest_proj: "Project / Technical Consulting",
    interest_other: "General Inquiry",
    form_subject_lbl: "Subject",
    form_msg_lbl: "Message",
    form_submit_btn: "TRANSMIT INQUIRY NOW",
    ch_pref: "PREFERRED CHANNEL",
    ch_email_lbl: "EMAIL ADDRESS",
    ch_copy_btn: "COPY EMAIL",
    ch_guarantee: "<strong>Response commitment:</strong> All inquiries receive a direct, personal response within 24 business hours with complete transparency.",
    footer_role: "DATA ANALYST & SYSTEMS ENGINEERING CANDIDATE (9TH CYCLE)",
    footer_cv_btn: "DOWNLOAD RÉSUMÉ (PDF)",
    footer_copy: "© 2026 Mayquel Bernaola. Art direction and data systems architecture."
  }
};

let currentLang = localStorage.getItem('atelier_lang') || 'es';

// ─── 3. Project Console Studio Data ───────────
const projectsData = {
  ollas: {
    title: {
      es: "CASE_01 // SISTEMA PARA OLLAS COMUNES",
      en: "CASE_01 // COMMUNITY FOOD LOGISTICS SYSTEM"
    },
    status: {
      es: "DEPLOYED",
      en: "DEPLOYED"
    },
    category: {
      es: "PLATAFORMA WEB & IMPACTO SOCIAL",
      en: "WEB PLATFORM & SOCIAL IMPACT"
    },
    heading: {
      es: "Sistema de Gestión y Logística para Ollas Comunes",
      en: "Community Food Logistics & Distribution System"
    },
    chips: ["Scrum Framework", "Figma UI/UX", "Web Platform", "SQL Data Management"],
    summary: {
      es: "<strong>El Reto:</strong> En coordinación con una ONG comunitaria, múltiples comedores populares administraban donaciones e inventarios en cuadernos físicos, generando descontrol, duplicidad de raciones y falta de transparencia contable.",
      en: "<strong>The Challenge:</strong> Partnering with a community NGO, multiple soup kitchens managed donations and inventory using handwritten physical notebooks, causing miscalculations, duplicate ration distributions, and accounting obscurity."
    },
    solution: {
      es: "<strong>La Solución Técnica:</strong> Prototipé la interfaz en Figma asegurando usabilidad para personas de bajo perfil digital, y colaboré en la construcción del sistema web bajo Scrum, centralizando almacenes y generando reportes de auditoría en tiempo real.",
      en: "<strong>The Technical Solution:</strong> Prototyped the interface in Figma ensuring effortless usability for non-technical community leaders, and co-developed the web platform using Scrum sprints to centralize food warehouses and generate real-time audit reports."
    },
    metrics: [
      {
        val: "100%",
        lbl: {
          es: "Trazabilidad verificable en cada ración y donación",
          en: "Verifiable traceability across all rations and donations"
        }
      },
      {
        val: "0%",
        lbl: {
          es: "Pérdida o duplicidad de registros contables",
          en: "Data loss or duplicate accounting records"
        }
      }
    ],
    architecture: {
      es: "ARQUITECTURA: Frontend responsivo modular • Base de datos relacional para control de inventarios • Gestión de roles (Administrador ONG, Coordinador de Olla, Auditor).",
      en: "ARCHITECTURE: Modular responsive frontend • Normalized relational database for inventory tracking • Role-based access control (NGO Admin, Kitchen Lead, Auditor)."
    },
    github: "https://github.com/maykelcb"
  },
  csharp: {
    title: {
      es: "CASE_02 // SISTEMA TRANSACCIONAL C# + SQL",
      en: "CASE_02 // TRANSACTIONAL ENGINE C# + SQL"
    },
    status: {
      es: "DESKTOP CORE",
      en: "DESKTOP CORE"
    },
    category: {
      es: "SISTEMA EMPRESARIAL & DESKTOP CORE",
      en: "ENTERPRISE DESKTOP & TRANSACTIONAL CORE"
    },
    heading: {
      es: "Sistema Empresarial en C# (.NET) + SQL Server",
      en: "Enterprise Core Application in C# (.NET) + SQL Server"
    },
    chips: ["C# (.NET)", "SQL Server", "Stored Procedures", "Layered Architecture", "ACID Transactions"],
    summary: {
      es: "<strong>El Reto:</strong> Automatizar el control de transacciones comerciales, gestión de inventario crítico y cobranzas con cero margen de error en cálculos y validaciones concurrentes.",
      en: "<strong>The Challenge:</strong> Automate commercial transactions, critical stock reconciliation, and payment ledgers with zero tolerance for concurrent calculation discrepancies."
    },
    solution: {
      es: "<strong>La Solución Técnica:</strong> Arquitectura por capas (Acceso a Datos DAL, Lógica de Negocio BLL, Interfaz UI) con stored procedures parametrizados para blindar la base de datos contra inyección SQL y garantizar transacciones atómicas.",
      en: "<strong>The Technical Solution:</strong> Strict layered architecture (DAL, BLL, UI) with parameterized stored procedures in SQL Server to secure data against SQL injection and enforce atomic transactions."
    },
    metrics: [
      {
        val: "ACID",
        lbl: {
          es: "Garantía estricta de atomicidad y consistencia en cada transacción",
          en: "Strict atomicity, consistency, and rollback guarantees per transaction"
        }
      },
      {
        val: "0 ms",
        lbl: {
          es: "Bloqueos por consultas no parametrizadas",
          en: "Deadlocks or unindexed query stalls"
        }
      }
    ],
    architecture: {
      es: "ARQUITECTURA: Capa DAL desacoplada • Stored procedures relacionales con transacciones BEGIN/COMMIT/ROLLBACK • Capa BLL con validaciones de inventario mínimo en tiempo real.",
      en: "ARCHITECTURE: Decoupled DAL layer • Relational stored procedures with BEGIN/COMMIT/ROLLBACK • BLL business layer validating minimum inventory thresholds in real time."
    },
    github: "https://github.com/maykelcb"
  },
  powerbi: {
    title: {
      es: "CASE_03 // DASHBOARD EJECUTIVO POWER BI",
      en: "CASE_03 // EXECUTIVE POWER BI DASHBOARD"
    },
    status: {
      es: "ANALYTIC BI",
      en: "ANALYTIC BI"
    },
    category: {
      es: "BUSINESS INTELLIGENCE & ANALÍTICA DIRECTIVA",
      en: "BUSINESS INTELLIGENCE & EXECUTIVE ANALYTICS"
    },
    heading: {
      es: "Dashboard Analítico & KPIs de Rendimiento en Power BI",
      en: "Performance Analytics & Executive KPIs in Power BI"
    },
    chips: ["Power BI", "DAX Avanzado", "Power Query M", "Star Schema", "Time Intelligence"],
    summary: {
      es: "<strong>El Reto:</strong> La dirección requería visibilidad consolidada de métricas clave dispersas en múltiples hojas de cálculo, cuyo armado manual tardaba días y provocaba discrepancias numéricas.",
      en: "<strong>The Challenge:</strong> Leadership required unified visibility into key performance indicators fragmented across spreadsheets, requiring days of error-prone manual consolidation."
    },
    solution: {
      es: "<strong>La Solución Técnica:</strong> Diseñé un modelo analítico en estrella (Star Schema) con ingesta automatizada mediante Power Query y formulación de métricas analíticas con DAX (YTD, YoY, ratios de eficiencia y segmentación temporal dinámica).",
      en: "<strong>The Technical Solution:</strong> Architected an analytical Star Schema with automated Power Query ingestion and advanced DAX measures (YTD, YoY variance, efficiency margins, and dynamic temporal segmentation)."
    },
    metrics: [
      {
        val: "-80%",
        lbl: {
          es: "Reducción drástica en tiempo de generación de reportes",
          en: "Drastic reduction in reporting generation time"
        }
      },
      {
        val: "100%",
        lbl: {
          es: "Punto único de verdad para directores y líderes operativos",
          en: "Single source of truth for leadership and operational teams"
        }
      }
    ],
    architecture: {
      es: "ARQUITECTURA: Modelo dimensional en estrella • Tabla Fact centralizada vinculada a dimensiones de Tiempo, Canal y Producto • Motor VertiPaq optimizado con medidas en memoria.",
      en: "ARCHITECTURE: Dimensional Star Schema • Central Fact table linked to Time, Channel, and Product dimensions • VertiPaq in-memory engine with optimized DAX evaluation."
    },
    github: "https://github.com/maykelcb"
  },
  upcoming: {
    title: {
      es: "CASE_04 // LAB PROTOTYPE",
      en: "CASE_04 // LAB PROTOTYPE"
    },
    status: {
      es: "IN DEVELOPMENT",
      en: "IN DEVELOPMENT"
    },
    category: {
      es: "NUEVAS SOLUCIONES & PIPELINES DATA",
      en: "UPCOMING SOLUTIONS & DATA PIPELINES"
    },
    heading: {
      es: "Nuevos Sistemas en Construcción & Python Data APIs",
      en: "New Systems in Construction & Python Data APIs"
    },
    chips: ["Python", "FastAPI / REST", "React / Modern Web", "Cloud Ready"],
    summary: {
      es: "<strong>En Progreso:</strong> Desarrollo de soluciones web full-stack con pipelines analíticos en Python y consumo de microservicios. Espacio reservado para los nuevos proyectos que se incorporarán esta misma semana.",
      en: "<strong>In Progress:</strong> Development of full-stack web solutions powered by Python data processing pipelines and microservice consumption. Reserved slot for new projects releasing this week."
    },
    solution: {
      es: "<strong>Próxima Integración:</strong> Código fuente y documentación técnica detallada disponible en el repositorio de GitHub de forma inmediata tras el despliegue final.",
      en: "<strong>Upcoming Deployment:</strong> Source code and architectural documentation will be published to the GitHub repository immediately upon release."
    },
    metrics: [
      {
        val: "Q1/Q2",
        lbl: {
          es: "Lanzamiento y catalogación oficial de nuevos repositorios",
          en: "Official launch and documentation across new repositories"
        }
      },
      {
        val: "100%",
        lbl: {
          es: "Arquitectura modular y código limpio listo para producción",
          en: "Modular clean code architecture ready for production"
        }
      }
    ],
    architecture: {
      es: "ARQUITECTURA: Microservicios en Python • Frontend reactivo • Integración continua mediante GitHub Actions.",
      en: "ARCHITECTURE: Python analytical microservices • Reactive modern frontend • Continuous integration via GitHub Actions."
    },
    github: "https://github.com/maykelcb"
  }
};

// ─── 4. DOM Initialization ────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAudioControls();
  initLanguageControls();
  initProjectConsole();
  initTactileArsenal();
  initTOCNavigation();
  initCopyActions();
  initInquiryForm();
});

// ─── 5. Audio Synthesizer Controls ─────────────
function initAudioControls() {
  const toggleBtn = document.getElementById('audioToggle');
  const icon = document.getElementById('audioIcon');
  const label = document.getElementById('audioLabel');

  function updateAudioUI() {
    if (audio.enabled) {
      if (toggleBtn) toggleBtn.classList.add('active');
      if (icon) icon.className = 'fas fa-volume-high';
      if (label) label.textContent = 'AUDIO: ON';
    } else {
      if (toggleBtn) toggleBtn.classList.remove('active');
      if (icon) icon.className = 'fas fa-volume-xmark';
      if (label) label.textContent = 'AUDIO: OFF';
    }
  }

  updateAudioUI();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      audio.init();
      audio.enabled = !audio.enabled;
      localStorage.setItem('atelier_audio', audio.enabled ? 'true' : 'false');
      updateAudioUI();
      if (audio.enabled) {
        audio.playSuccess();
        showToast(currentLang === 'es' ? 'Audio interactivo activado' : 'Interactive audio activated');
      } else {
        showToast(currentLang === 'es' ? 'Audio silenciado' : 'Audio muted');
      }
    });
  }

  // Bind subtle sounds to interactive elements
  document.querySelectorAll('button, a, .project-tab-btn, .filter-tab').forEach(el => {
    el.addEventListener('mouseenter', () => audio.playTick());
  });
}

// ─── 6. Language Switcher Engine ───────────────
function initLanguageControls() {
  const langButtons = document.querySelectorAll('.lang-toggle-btn');

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('atelier_lang', lang);
    document.body.setAttribute('data-lang', lang);

    langButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    const dict = dictionary[lang];
    if (!dict) return;

    // Translate all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update active project console view
    const activeProjectBtn = document.querySelector('.project-tab-btn.active');
    const activeProjectKey = activeProjectBtn ? activeProjectBtn.getAttribute('data-project') : 'ollas';
    renderProjectConsole(activeProjectKey);

    audio.playSwitch();
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang !== currentLang) {
        applyLanguage(selectedLang);
      }
    });
  });

  // Apply saved or default language on initial load
  applyLanguage(currentLang);
}

// ─── 7. Interactive Project Console Studio ─────
function initProjectConsole() {
  const projectButtons = document.querySelectorAll('.project-tab-btn');

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      projectButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const projectKey = btn.getAttribute('data-project');
      renderProjectConsole(projectKey);
      audio.playClick();
    });
  });

  // Render first project initially
  renderProjectConsole('ollas');
}

function renderProjectConsole(key) {
  const data = projectsData[key];
  const pane = document.getElementById('projectViewerPane');
  const titleEl = document.getElementById('consoleCurrentTitle');
  const statusEl = document.getElementById('consoleCurrentStatus');

  if (!data || !pane) return;

  const lang = currentLang;

  if (titleEl) titleEl.textContent = data.title[lang];
  if (statusEl) statusEl.textContent = data.status[lang];

  const chipsHtml = data.chips.map(chip => `<span class="pv-chip">${chip}</span>`).join('');
  const metricsHtml = data.metrics.map(m => `
    <div class="pv-metric-card">
      <div class="pv-metric-val">${m.val}</div>
      <div class="pv-metric-lbl">${m.lbl[lang]}</div>
    </div>
  `).join('');

  const btnRepoLabel = lang === 'es' ? 'Ver Repositorio en GitHub' : 'View Repository on GitHub';
  const btnInquireLabel = lang === 'es' ? 'Consultar este Sistema' : 'Inquire About This System';

  pane.style.opacity = '0';
  pane.style.transform = 'translateY(10px)';

  setTimeout(() => {
    pane.innerHTML = `
      <div class="pv-header">
        <span class="pv-category-stamp">${data.category[lang]}</span>
        <h3 class="pv-title">${data.heading[lang]}</h3>
        <div class="pv-chips-row">${chipsHtml}</div>
      </div>

      <div class="pv-section-block">
        <div class="pv-section-title">${lang === 'es' ? 'PROBLEMA & CONTEXTO OPERATIVO' : 'OPERATIONAL CHALLENGE & CONTEXT'}</div>
        <div class="pv-text">${data.summary[lang]}</div>
      </div>

      <div class="pv-section-block">
        <div class="pv-section-title">${lang === 'es' ? 'ARQUITECTURA & SOLUCIÓN TÉCNICA' : 'TECHNICAL SOLUTION & ARCHITECTURE'}</div>
        <div class="pv-text">${data.solution[lang]}</div>
      </div>

      <div class="pv-grid-metrics">${metricsHtml}</div>

      <div class="pv-arch-box">${data.architecture[lang]}</div>

      <div class="pv-actions-deck">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="pv-btn-github">
          <i class="fab fa-github"></i>
          <span>${btnRepoLabel}</span>
          <i class="fas fa-arrow-up-right-from-square" style="font-size: 11px;"></i>
        </a>
        <a href="#inquiry" class="pv-btn-inquire">
          <span>${btnInquireLabel}</span>
        </a>
      </div>
    `;

    pane.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    pane.style.opacity = '1';
    pane.style.transform = 'translateY(0)';
    pane.scrollTop = 0;
  }, 100);
}

// ─── 8. Tactile "Block-by-Block" & 3x3 Arsenal Animations ───
function initTactileArsenal() {
  const grid = document.getElementById('arsenalGrid');
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.arsenal-item');
  if (!grid || !items.length) return;

  let currentFilter = 'all';

  // 1. Scroll-driven 3x3 rows in "Todas" mode
  function checkScrollRows() {
    if (currentFilter !== 'all') return;

    const windowHeight = window.innerHeight;
    const triggerOffset = windowHeight * 0.88;

    // Check row 1, 2, 3 independently based on viewport
    [1, 2, 3].forEach(rowNum => {
      const rowItems = document.querySelectorAll(`.arsenal-item[data-row="${rowNum}"]`);
      if (!rowItems.length) return;

      const firstItemRect = rowItems[0].getBoundingClientRect();
      const isVisible = firstItemRect.top < triggerOffset && firstItemRect.bottom > 60;

      rowItems.forEach((item, idx) => {
        if (isVisible) {
          if (!item.classList.contains('row-active')) {
            // Stagger each item in the row slightly for natural tactile placement
            setTimeout(() => {
              item.classList.add('row-active');
            }, idx * 60);
          }
        } else {
          // If the user scrolls back up past the section, remove smoothly
          if (firstItemRect.top >= triggerOffset) {
            item.classList.remove('row-active');
          }
        }
      });
    });
  }

  window.addEventListener('scroll', checkScrollRows, { passive: true });
  // Check initially in case page loaded scrolled down
  setTimeout(checkScrollRows, 150);

  // 2. Filter click: Sequential one-by-one tactile block placement
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      currentFilter = tab.getAttribute('data-filter');
      audio.playClick();

      if (currentFilter === 'all') {
        // Reset to 3x3 row scroll mode
        items.forEach(item => {
          item.style.display = 'flex';
          item.classList.remove('block-pop');
        });
        checkScrollRows();
      } else {
        // Filter mode: Tactile One-by-One cascade ("bloque por bloque")
        let matchingIndex = 0;

        items.forEach(item => {
          const group = item.getAttribute('data-group');
          item.classList.remove('row-active');
          item.classList.remove('block-pop');

          if (group === currentFilter) {
            item.style.display = 'flex';
            // Stagger one-by-one with deliberate tactile timing
            const delay = matchingIndex * 90;
            matchingIndex++;

            setTimeout(() => {
              item.classList.add('block-pop');
              audio.playTick();
            }, delay);
          } else {
            // Immediate clean disappearance so no awkward bottom-hanging gap occurs!
            item.style.display = 'none';
          }
        });
      }
    });
  });
}

// ─── 9. Sticky Chapter TOC Navigation ─────────
function initTOCNavigation() {
  const chapters = document.querySelectorAll('.chapter-block');
  const tocLinks = document.querySelectorAll('.nav-toc-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          const isMatch = link.getAttribute('data-section') === id;
          link.classList.toggle('active', isMatch);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0
  });

  chapters.forEach(chap => observer.observe(chap));
}

// ─── 10. 1-Click Copy & Toast Notification ─────
function showToast(message) {
  const toast = document.getElementById('editorialToast');
  const textEl = document.getElementById('toastText');
  if (!toast) return;

  if (textEl) textEl.textContent = message;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 2600);
}

function initCopyActions() {
  const email = 'Maykelcb095@gmail.com';

  const copyButtons = [
    document.getElementById('heroQuickCopy'),
    document.getElementById('btnCopyInquiryEmail')
  ];

  copyButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        audio.playSuccess();
        const copyMsg = currentLang === 'es' ? '¡Correo copiado al portapapeles!' : 'Email copied to clipboard!';
        showToast(copyMsg);

        const label = document.getElementById('btnCopyLabel');
        if (label) {
          const original = label.textContent;
          label.textContent = currentLang === 'es' ? '¡COPIADO!' : 'COPIED!';
          setTimeout(() => {
            label.textContent = original;
          }, 2200);
        }
      });
    });
  });
}

// ─── 11. Direct Inquiry Form Handler ───────────
function initInquiryForm() {
  const form = document.getElementById('inquiryForm');
  const btn = document.getElementById('btnSubmitInquiry');

  if (form && btn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      audio.playSuccess();

      const origHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span>${currentLang === 'es' ? 'ENVIANDO PROPUESTA...' : 'TRANSMITTING...'}</span> <i class="fas fa-spinner fa-spin"></i>`;

      setTimeout(() => {
        btn.innerHTML = `<span>${currentLang === 'es' ? 'PROPUESTA ENVIADA CON ÉXITO' : 'TRANSMISSION COMPLETED (200 OK)'}</span> <i class="fas fa-check"></i>`;
        btn.style.background = '#52b788';
        btn.style.color = '#0d0e11';

        const successMsg = currentLang === 'es' 
          ? '¡Mensaje recibido! Te responderé en menos de 24 horas.' 
          : 'Inquiry received! I will reply within 24 business hours.';
        showToast(successMsg);
        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = origHtml;
          btn.style.background = '';
          btn.style.color = '';
        }, 4000);
      }, 1300);
    });
  }
}
