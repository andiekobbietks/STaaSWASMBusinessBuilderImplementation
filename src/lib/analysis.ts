import type { AnalysisLang, AnalysisResult } from "./types";

interface IdeaContext {
  keywords: string[];
  isItalian: boolean;
  hasProduct: boolean;
  hasService: boolean;
  hasPlatform: boolean;
  hasLocal: boolean;
  hasOnline: boolean;
  hasSubscription: boolean;
  hasB2B: boolean;
  hasB2C: boolean;
  hasEco: boolean;
  hasTech: boolean;
  hasFood: boolean;
  hasHealth: boolean;
  hasEducation: boolean;
  hasRetail: boolean;
  hasCreative: boolean;
  wordCount: number;
  primaryDomain: string;
}

function detectContext(idea: string): IdeaContext {
  const lower = idea.toLowerCase();
  const keywords = lower.match(/\b[a-z]{3,}\b/g) ?? [];

  const isItalian = /\b(il|la|le|un|una|di|del|della|azienda|cliente|prodotto|mercato|idea|negozio|online|servizio|vendita|famiglia)\b/i.test(idea);

  return {
    keywords,
    isItalian,
    hasProduct: /\b(product|sell|selling|manufacture|make|craft|goods|prodotto|vendere|vendita|produrre|creare|merce)\b/i.test(idea),
    hasService: /\b(service|consult|agency|freelance|help|provide|advise|servizio|consulenza|agenzia|freelance|aiutare|fornire)\b/i.test(idea),
    hasPlatform: /\b(platform|app|marketplace|website|software|saas|piattaforma|applicazione|software|sito)\b/i.test(idea),
    hasLocal: /\b(local|community|city|neighborhood|store|shop|cafe|restaurant|locale|comunità|città|quartiere|negozio|bar|ristorante)\b/i.test(idea),
    hasOnline: /\b(online|digital|e-commerce|web|internet|digitale|ecommerce)\b/i.test(idea),
    hasSubscription: /\b(subscription|monthly|recurring|membership|abbonamento|mensile|ricorrente|iscrizione)\b/i.test(idea),
    hasB2B: /\b(business|enterprise|company|corporate|b2b|azienda|impresa|società|aziendale)\b/i.test(idea),
    hasB2C: /\b(consumer|customer|people|individuals|families|consumatore|cliente|persone|famiglie|individui)\b/i.test(idea),
    hasEco: /\b(eco|sustainable|green|organic|recycle|environmental|sostenibile|verde|biologico|riciclo|ambientale)\b/i.test(idea),
    hasTech: /\b(tech|ai|software|app|digital|automation|data|tecnologia|automazione|intelligenza)\b/i.test(idea),
    hasFood: /\b(food|restaurant|cafe|bakery|meal|organic|drink|cibo|ristorante|panetteria|pasto|bevanda)\b/i.test(idea),
    hasHealth: /\b(health|fitness|wellness|medical|therapy|care|salute|fitness|benessere|medico|terapia|cura)\b/i.test(idea),
    hasEducation: /\b(education|course|training|learn|school|teach|tutor|istruzione|corso|formazione|imparare|scuola|insegnare)\b/i.test(idea),
    hasRetail: /\b(retail|store|shop|fashion|clothing|buy|vendita|negozio|moda|abbigliamento|comprare)\b/i.test(idea),
    hasCreative: /\b(design|art|creative|music|content|media|studio|design|arte|creativo|musica|contenuto|studio)\b/i.test(idea),
    wordCount: idea.trim().split(/\s+/).length,
    primaryDomain: detectDomain(lower),
  };
}

function detectDomain(lower: string): string {
  if (/\b(health|fitness|wellness|medical|therapy|care|salute|fitness|benessere|medico|terapia|cura)\b/.test(lower)) return "health";
  if (/\b(food|restaurant|cafe|bakery|meal|cibo|ristorante|panetteria|pasto)\b/.test(lower)) return "food";
  if (/\b(education|course|training|learn|school|teach|istruzione|corso|formazione|scuola)\b/.test(lower)) return "education";
  if (/\b(tech|ai|software|app|digital|automation|data|tecnologia|automazione)\b/.test(lower)) return "tech";
  if (/\b(retail|store|shop|fashion|clothing|vendita|negozio|moda|abbigliamento)\b/.test(lower)) return "retail";
  if (/\b(design|art|creative|music|content|media|arte|creativo|musica)\b/.test(lower)) return "creative";
  if (/\b(eco|sustainable|green|organic|recycle|sostenibile|verde|biologico|riciclo)\b/.test(lower)) return "sustainability";
  return "general";
}

function t(ctx: IdeaContext, en: string, it: string): string {
  return ctx.isItalian || ctx === undefined ? it : en;
}

function heading(ctx: IdeaContext, en: string, it: string): string {
  return `## ${t(ctx, en, it)}`;
}

function generateClarity(ctx: IdeaContext, idea: string): string {
  const sections: string[] = [];

  sections.push(heading(ctx, "Clarity Analysis", "Analisi di Chiarezza"));
  sections.push("");

  // 1. Core Business Concept
  sections.push(heading(ctx, "1. Core Business Concept", "1. Concetto di Business di Base"));
  sections.push("");
  const offering = ctx.hasProduct && ctx.hasService
    ? t(ctx, "a combined product and service offering", "un'offerta combinata di prodotto e servizio")
    : ctx.hasProduct
    ? t(ctx, "a product-based offering", "un'offerta basata su prodotto")
    : ctx.hasService
    ? t(ctx, "a service-based offering", "un'offerta basata su servizio")
    : ctx.hasPlatform
    ? t(ctx, "a platform/marketplace model", "un modello piattaforma/marketplace")
    : t(ctx, "a business offering", "un'offerta commerciale");

  const channel = ctx.hasOnline && ctx.hasLocal
    ? t(ctx, "both online and local physical channels", "canali sia online che fisici locali")
    : ctx.hasOnline
    ? t(ctx, "primarily online digital channels", "principalmente canali digitali online")
    : ctx.hasLocal
    ? t(ctx, "primarily local/community channels", "principalmente canali locali/di comunità")
    : t(ctx, "mixed distribution channels", "canali di distribuzione misti");

  sections.push(t(ctx,
    `Based on your idea, your business centers on **${offering}**. The concept can be defined as follows:`,
    `In base alla tua idea, il tuo business si concentra su **${offering}**. Il concetto può essere definito come segue:`));
  sections.push(t(ctx, `Your likely route to customers is through ${channel}.`, `Il tuo probabile canale per raggiungere i clienti è ${channel}.`));
  sections.push("");
  sections.push(`> ${idea.trim()}`);
  sections.push("");

  const audience = ctx.hasB2B
    ? t(ctx, "businesses and enterprises (B2B)", "aziende e imprese (B2B)")
    : ctx.hasB2C
    ? t(ctx, "individual consumers and households (B2C)", "consumatori individuali e famiglie (B2C)")
    : t(ctx, "a mix of business and consumer clients", "un mix di clienti aziendali e privati");

  sections.push(t(ctx,
    `**Target market:** ${audience}. The value proposition centers on solving a specific problem within the ${ctx.primaryDomain} domain.`,
    `**Mercato di riferimento:** ${audience}. La proposta di valore si concentra sulla risoluzione di un problema specifico nel dominio ${ctx.primaryDomain}.`));
  sections.push("");

  // 2. Market Analysis
  sections.push(heading(ctx, "2. Market Analysis", "2. Analisi di Mercato"));
  sections.push("");
  const marketSize = ctx.hasOnline
    ? t(ctx, "potentially global with low geographic barriers", "potenzialmente globale con poche barriere geografiche")
    : t(ctx, "regionally focused with strong local network effects", " focalizzato a livello regionale con forti effetti di rete locali");
  sections.push(t(ctx,
    `**Market size & potential:** The ${ctx.primaryDomain} market is ${marketSize}. Early growth depends on capturing a defensible niche before expanding.`,
    `**Dimensione e potenziale del mercato:** Il mercato ${ctx.primaryDomain} è ${marketSize}. La crescita iniziale dipende dalla cattura di una nicchia difendibile prima di espandersi.`));
  sections.push("");
  sections.push(t(ctx,
    `**Competition landscape:** Expect both direct competitors (similar ${ctx.primaryDomain} offerings) and indirect competitors (alternative solutions to the same problem). Differentiation is essential.`,
    `**Panorama competitivo:** Prevedi sia concorrenti diretti (offerte ${ctx.primaryDomain} simili) che concorrenti indiretti (soluzioni alternative allo stesso problema). La differenziazione è essenziale.`));
  sections.push("");
  sections.push(t(ctx,
    `**Trends & opportunities:** Digital transformation, changing consumer preferences, and demand for ${ctx.hasEco ? "sustainable" : "convenient"} solutions create favorable conditions.`,
    `**Tendenze e opportunità:** La trasformazione digitale, il cambiamento delle preferenze dei consumatori e la domanda di soluzioni ${ctx.hasEco ? "sostenibili" : "convenienti"} creano condizioni favorevoli.`));
  sections.push("");

  // 3. Business Model
  sections.push(heading(ctx, "3. Business Model Evaluation", "3. Valutazione del Modello di Business"));
  sections.push("");
  const revenueModel = ctx.hasSubscription
    ? t(ctx, "recurring subscription revenue", "ricavi ricorrenti da abbonamento")
    : ctx.hasPlatform
    ? t(ctx, "transaction-based / commission revenue", "ricavi basati su transazioni / commissioni")
    : ctx.hasProduct
    ? t(ctx, "direct product sales revenue", "ricavi diretti dalla vendita di prodotti")
    : t(ctx, "project-based / hourly service revenue", "ricavi da progetto / tariffa oraria");

  sections.push(t(ctx, `**Revenue streams:** ${revenueModel}.`, `**Flussi di ricavo:** ${revenueModel}.`));
  sections.push("");
  sections.push(t(ctx,
    `**Cost structure:** Key costs include ${ctx.hasOnline ? "platform development, hosting, and digital marketing" : "initial setup, operations, and customer acquisition"}. Variable costs scale with growth.`,
    `**Struttura dei costi:** I costi principali includono ${ctx.hasOnline ? "sviluppo della piattaforma, hosting e marketing digitale" : "configurazione iniziale, operazioni e acquisizione clienti"}. I costi variabili scalano con la crescita.`));
  sections.push("");
  sections.push(t(ctx,
    `**Scalability:** ${ctx.hasOnline || ctx.hasPlatform ? "High scalability potential — digital delivery allows growth without proportional cost increases." : "Moderate scalability — growth requires proportional increases in resources and capacity."}`,
    `**Scalabilità:** ${ctx.hasOnline || ctx.hasPlatform ? "Elevato potenziale di scalabilità — la consegna digitale permette la crescita senza aumenti proporzionali dei costi." : "Scalabilità moderata — la crescita richiede aumenti proporzionali di risorse e capacità."}`));
  sections.push("");

  // 4. Implementation
  sections.push(heading(ctx, "4. Implementation Considerations", "4. Considerazioni sull'Implementazione"));
  sections.push("");
  sections.push(t(ctx,
    `**Required resources:** ${ctx.hasTech ? "Technical development capacity" : "Operational setup"}, initial capital for ${ctx.hasProduct ? "inventory and production" : "service delivery setup"}, and marketing budget for customer acquisition.`,
    `**Risorse necessarie:** ${ctx.hasTech ? "Capacità di sviluppo tecnico" : "Configurazione operativa"}, capitale iniziale per ${ctx.hasProduct ? "inventario e produzione" : "la configurazione della fornitura di servizi"}, e budget marketing per l'acquisizione clienti.`));
  sections.push("");
  sections.push(t(ctx,
    `**Key challenges:** Building brand awareness, establishing trust with early customers, and competing against established players in the ${ctx.primaryDomain} space.`,
    `**Sfide principali:** Creare consapevolezza del marchio, stabilire fiducia con i primi clienti e competere con operatori affermati nel settore ${ctx.primaryDomain}.`));
  sections.push("");
  sections.push(t(ctx,
    `**Critical success factors:** Clear differentiation, strong customer relationships, efficient operations, and adaptability to market feedback.`,
    `**Fattori critici di successo:** Differenziazione chiara, forti relazioni con i clienti, operazioni efficienti e adattabilità al feedback di mercato.`));
  sections.push("");

  // 5. Recommendations
  sections.push(heading(ctx, "5. Recommendations", "5. Raccomandazioni"));
  sections.push("");
  sections.push(t(ctx, "- **Focus on a narrow initial niche** before broadening your offering", "- **Concentrati prima su una nicchia ristretta** prima di ampliare l'offerta"));
  sections.push(t(ctx, "- **Validate demand** through a minimal viable version before full launch", "- **Convalida la domanda** attraverso una versione minima viable prima del lancio completo"));
  sections.push(t(ctx, "- **Prioritize customer feedback loops** to iterate quickly", "- **Dai priorità ai cicli di feedback dei clienti** per iterare rapidamente"));
  sections.push(t(ctx, "- **Build a distinctive brand identity** early to stand out", "- **Costruisci presto un'identità di marca distintiva** per distinguerti"));
  sections.push("");

  return sections.join("\n");
}

function generateNiche(ctx: IdeaContext, idea: string): string {
  const sections: string[] = [];
  sections.push(heading(ctx, "Niche Strategy", "Strategia di Nicchia"));
  sections.push("");

  // 1. Target Market Segmentation
  sections.push(heading(ctx, "1. Target Market Segmentation", "1. Segmentazione del Mercato di Riferimento"));
  sections.push("");
  const persona1 = ctx.hasB2B
    ? t(ctx, "Small-to-medium business owners aged 30-55 who need efficient solutions and value ROI", "Proprietari di piccole e medie imprese dai 30 ai 55 anni che necessitano di soluzioni efficienti e valorizzano il ROI")
    : t(ctx, "Urban professionals aged 25-40 who value convenience, quality, and social responsibility", "Professionisti urbani dai 25 ai 40 anni che valorizzano comodità, qualità e responsabilità sociale");
  const persona2 = ctx.hasEco
    ? t(ctx, "Environmentally conscious consumers aged 20-45 who prioritize sustainability", "Consumatori consapevoli dell'ambiente dai 20 ai 45 anni che danno priorità alla sostenibilità")
    : t(ctx, "Budget-conscious early adopters aged 18-35 who seek value and innovation", "Primi adottatori attenti al budget dai 18 ai 35 anni che cercano valore e innovazione");

  sections.push(t(ctx, `**Primary persona:** ${persona1}.`, `**Persona principale:** ${persona1}.`));
  sections.push("");
  sections.push(t(ctx, `**Secondary persona:** ${persona2}.`, `**Persona secondaria:** ${persona2}.`));
  sections.push("");
  sections.push(t(ctx,
    `**Pain points:** Lack of tailored solutions in the ${ctx.primaryDomain} space, fragmented existing options, and difficulty finding trustworthy providers.`,
    `**Punti dolenti:** Mancanza di soluzioni su misura nel settore ${ctx.primaryDomain}, opzioni esistenti frammentate e difficoltà nel trovare fornitori affidabili.`));
  sections.push("");

  // 2. Competitive Landscape
  sections.push(heading(ctx, "2. Competitive Landscape Analysis", "2. Analisi del Panorama Competitivo"));
  sections.push("");
  sections.push(t(ctx,
    `**Direct competitors:** Established ${ctx.primaryDomain} businesses offering similar products/services. Study their pricing, customer reviews, and positioning gaps.`,
    `**Concorrenti diretti:** Aziende affermate nel settore ${ctx.primaryDomain} che offrono prodotti/servizi simili. Studiare i loro prezzi, le recensioni dei clienti e le lacune di posizionamento.`));
  sections.push("");
  sections.push(t(ctx,
    `**Indirect competitors:** Alternative solutions customers use to solve the same problem (including DIY approaches and substitutes).`,
    `**Concorrenti indiretti:** Soluzioni alternative che i clienti utilizzano per risolvere lo stesso problema (inclusi approcci fai-da-te e sostituti).`));
  sections.push("");
  sections.push(t(ctx,
    `**Market positioning:** Aim for a ${ctx.hasEco ? "sustainability-focused" : ctx.hasTech ? "technology-driven" : "quality-and-service-focused"} position that differentiates from price-only competitors.`,
    `**Posizionamento di mercato:** Punta a una posizione ${ctx.hasEco ? "focalizzata sulla sostenibilità" : ctx.hasTech ? "guidata dalla tecnologia" : "focalizzata su qualità e servizio"} che si differenzia dai concorrenti solo sul prezzo.`));
  sections.push("");

  // 3. Market Research
  sections.push(heading(ctx, "3. Market Research Insights", "3. Approfondimenti di Ricerca di Mercato"));
  sections.push("");
  sections.push(t(ctx,
    `- The ${ctx.primaryDomain} industry is experiencing ${ctx.hasTech ? "rapid digital transformation" : "steady growth"} driven by evolving customer expectations.`,
    `- L'industria ${ctx.primaryDomain} sta vivendo ${ctx.hasTech ? "una rapida trasformazione digitale" : "una crescita stabile"} guidata dall'evoluzione delle aspettative dei clienti.`));
  sections.push(t(ctx,
    `- Emerging trends: personalization, ${ctx.hasEco ? "sustainability mandates" : "automation"}, and community-driven commerce.`,
    `- Tendenze emergenti: personalizzazione, ${ctx.hasEco ? "obblighi di sostenibilità" : "automazione"}, e commercio guidato dalla comunità.`));
  sections.push(t(ctx,
    `- Regulatory considerations: ensure compliance with local business regulations, data privacy (GDPR), and ${ctx.hasFood ? "food safety" : ctx.hasHealth ? "health industry" : "consumer protection"} standards.`,
    `- Considerazioni normative: garantire la conformità alle normative commerciali locali, privacy dei dati (GDPR), e standard di ${ctx.hasFood ? "sicurezza alimentare" : ctx.hasHealth ? "industria sanitaria" : "tutela dei consumatori"}.`));
  sections.push("");

  // 4. Pricing Strategy
  sections.push(heading(ctx, "4. Pricing Strategy", "4. Strategia di Prezzo"));
  sections.push("");
  const pricingModel = ctx.hasSubscription
    ? t(ctx, "tiered subscription model (free trial → basic → premium)", "modello di abbonamento a livelli (prova gratuita → base → premium)")
    : ctx.hasProduct
    ? t(ctx, "value-based pricing with volume discounts", "prezzo basato sul valore con sconti volume")
    : t(ctx, "tiered service packages (starter → standard → premium)", "pacchetti di servizio a livelli (starter → standard → premium)");
  sections.push(t(ctx, `**Recommended model:** ${pricingModel}.`, `**Modello consigliato:** ${pricingModel}.`));
  sections.push("");
  sections.push(t(ctx,
    `**Competitive pricing analysis:** Position at a 10-20% premium to budget alternatives, justified by superior quality and service. Avoid racing to the bottom on price.`,
    `**Analisi dei prezzi competitivi:** Posizionati con un premium del 10-20% rispetto alle alternative economiche, giustificato da qualità e servizio superiori. Evita la guerra dei prezzi al ribasso.`));
  sections.push("");

  // 5. Lead Generation
  sections.push(heading(ctx, "5. Lead Generation Strategy", "5. Strategia di Generazione Lead"));
  sections.push("");
  const channels: string[] = [];
  if (ctx.hasOnline || ctx.hasPlatform) {
    channels.push(t(ctx, "Search engine optimization (SEO) for intent-based discovery", "Ottimizzazione dei motori di ricerca (SEO) per scoperta basata su intento"));
    channels.push(t(ctx, `Content marketing with educational ${ctx.primaryDomain} articles`, `Content marketing con articoli educativi su ${ctx.primaryDomain}`));
  }
  channels.push(ctx.hasB2B
    ? t(ctx, "LinkedIn outreach and industry networking events", "Outreach su LinkedIn ed eventi di networking del settore")
    : t(ctx, "Social media marketing (Instagram, TikTok) for visual storytelling", "Marketing sui social media (Instagram, TikTok) per storytelling visivo"));
  channels.push(t(ctx, "Referral program incentivizing existing customers", "Programma di referral che incentiva i clienti esistenti"));
  sections.push(t(ctx, "**Recommended channels:**", "**Canali consigliati:**"));
  channels.forEach(c => sections.push(`- ${c}`));
  sections.push("");

  // 6. Outreach templates
  sections.push(heading(ctx, "6. Outreach Email Templates", "6. Modelli di Email di Outreach"));
  sections.push("");
  sections.push(t(ctx, "**Initial contact template:**", "**Modello di contatto iniziale:**"));
  sections.push("```");
  sections.push(t(ctx,
    `Subject: A quick idea for [Company Name]\n\nHi [Name],\n\nI noticed [specific observation about their business]. I'm building [your offering] that helps with [specific benefit].\n\nWould you be open to a 15-minute chat next week?\n\nBest,\n[Your Name]`,
    `Oggetto: Un'idea rapida per [Nome Azienda]\n\nCiao [Nome],\n\nHo notato [osservazione specifica sulla loro attività]. Sto sviluppando [la tua offerta] che aiuta con [beneficio specifico].\n\nSaresti disponibile per una chat di 15 minuti la prossima settimana?\n\nCordiali saluti,\n[Il tuo Nome]`));
  sections.push("```");
  sections.push("");
  sections.push(t(ctx, "**Follow-up (Day 7):**", "**Follow-up (Giorno 7):**"));
  sections.push("```");
  sections.push(t(ctx,
    `Subject: Re: A quick idea for [Company Name]\n\nHi [Name],\n\nJust floating this back to the top of your inbox. Happy to share a quick demo or answer any questions.\n\nBest,\n[Your Name]`,
    `Oggetto: Re: Un'idea rapida per [Nome Azienda]\n\nCiao [Nome],\n\nRiporto questo in cima alla tua casella di posta. Felice di condividere una breve demo o rispondere a qualsiasi domanda.\n\nCordiali saluti,\n[Il tuo Nome]`));
  sections.push("```");
  sections.push("");

  void idea;
  return sections.join("\n");
}

function generateAction(ctx: IdeaContext, idea: string): string {
  const sections: string[] = [];
  sections.push(heading(ctx, "Action Plan", "Piano d'Azione"));
  sections.push("");

  // 1. Platform Selection
  sections.push(heading(ctx, "1. Strategic Platform Selection", "1. Selezione Strategica delle Piattaforme"));
  sections.push("");
  const platforms: string[] = [];
  if (ctx.hasB2B) {
    platforms.push(t(ctx, "**LinkedIn** — primary B2B network; ideal for thought leadership and direct outreach", "**LinkedIn** — principale rete B2B; ideale per thought leadership e outreach diretto"));
  }
  if (ctx.hasB2C || ctx.hasRetail || ctx.hasCreative || ctx.hasFood) {
    platforms.push(t(ctx, "**Instagram** — visual-first; ideal for showcasing products and building brand aesthetic", "**Instagram** — prima il visivo; ideale per mostrare prodotti e costruire l'estetica del marchio"));
  }
  if (ctx.hasB2C && (ctx.hasHealth || ctx.hasEducation || ctx.hasTech)) {
    platforms.push(t(ctx, "**TikTok** — high-reach short-form video; effective for younger demographics", "**TikTok** — video brevi ad alto reach; efficace per demografie più giovani"));
  }
  platforms.push(t(ctx, "**Website/Blog** — owned channel for SEO, credibility, and conversion", "**Sito/Blog** — canale proprietario per SEO, credibilità e conversione"));
  platforms.forEach(p => sections.push(`- ${p}`));
  sections.push("");

  // 2. Content Strategy
  sections.push(heading(ctx, "2. Content Strategy (6-Month Plan)", "2. Strategia di Contenuti (Piano di 6 Mesi)"));
  sections.push("");
  sections.push(t(ctx, "| Month | Theme | Focus |", "| Mese | Tema | Focus |"));
  sections.push(t(ctx, "|-------|-------|-------|", "|-------|-------|-------|"));
  sections.push(t(ctx, "| 1 | Brand Launch | Introduction, story, values |", "| 1 | Lancio del Marchio | Introduzione, storia, valori |"));
  sections.push(t(ctx, "| 2 | Education | How-to content, industry tips |", "| 2 | Istruzione | Contenuti how-to, consigli del settore |"));
  sections.push(t(ctx, "| 3 | Social Proof | Testimonials, case studies |", "| 3 | Prova Sociale | Testimonianze, case study |"));
  sections.push(t(ctx, "| 4 | Community | User-generated content, Q&A |", "| 4 | Comunità | Contenuti generati dagli utenti, Q&A |"));
  sections.push(t(ctx, "| 5 | Growth | Promotions, partnerships |", "| 5 | Crescita | Promozioni, partnership |"));
  sections.push(t(ctx, "| 6 | Retention | Loyalty, behind-the-scenes |", "| 6 | Fidelizzazione | Fedeltà, dietro le quinte |"));
  sections.push("");

  // 3. Roadmap
  sections.push(heading(ctx, "3. Business Implementation Roadmap", "3. Roadmap di Implementazione del Business"));
  sections.push("");
  sections.push(t(ctx, "**Month 1-2: Foundation Building**", "**Mese 1-2: Costruzione delle Fondamenta**"));
  sections.push(t(ctx, "- Week 1-2: Register business, set up legal structure, open bank account", "- Settimana 1-2: Registra l'azienda, configura la struttura legale, apri un conto bancario"));
  sections.push(t(ctx, `- Week 3-4: Build ${ctx.hasOnline ? 'MVP platform/website' : 'core offering'}, establish brand identity`, `- Settimana 3-4: Costruisci ${ctx.hasOnline ? 'piattaforma/sito MVP' : 'offerta di base'}, stabilisci l'identità del marchio`));
  sections.push(t(ctx, "- Week 5-6: Set up social media profiles, create initial content", "- Settimana 5-6: Configura i profili social media, crea contenuti iniziali"));
  sections.push(t(ctx, "- Week 7-8: Soft launch to network, gather early feedback", "- Settimana 7-8: Soft launch verso la rete, raccogli feedback iniziali"));
  sections.push("");
  sections.push(t(ctx, "**Month 3-4: Growth Phase**", "**Mese 3-4: Fase di Crescita**"));
  sections.push(t(ctx, "- Launch marketing campaigns across selected platforms", "- Lanciacampaign di marketing sulle piattaforme selezionate"));
  sections.push(t(ctx, "- Begin paid advertising (start small, scale what works)", "- Inizia la pubblicità a pagamento (iniziare in piccolo, scalare ciò che funziona)"));
  sections.push(t(ctx, "- Build partnerships with complementary businesses", "- Costruisci partnership con aziende complementari"));
  sections.push(t(ctx, "- Optimize sales funnel based on conversion data", "- Ottimizza il funnel di vendita basandoti sui dati di conversione"));
  sections.push("");
  sections.push(t(ctx, "**Month 5-6: Optimization & Scaling**", "**Mese 5-6: Ottimizzazione e Scalabilità**"));
  sections.push(t(ctx, "- Analyze performance data, double down on top channels", "- Analizza i dati di performance, punta sui canali migliori"));
  sections.push(t(ctx, "- Implement automation for repetitive tasks", "- Implementa automazione per attività ripetitive"));
  sections.push(t(ctx, "- Expand offering based on customer demand", "- Espandi l'offerta in base alla domanda dei clienti"));
  sections.push(t(ctx, "- Plan team expansion for next phase", "- Pianifica l'espansione del team per la fase successiva"));
  sections.push("");

  // 4. KPIs
  sections.push(heading(ctx, "4. Key Performance Indicators", "4. Indicatori Chiave di Prestazione"));
  sections.push("");
  sections.push(t(ctx, "| Metric | Target (6 months) |", "| Metrica | Obiettivo (6 mesi) |"));
  sections.push(t(ctx, "|--------|-------------------|", "|--------|-------------------|"));
  sections.push(t(ctx, "| Monthly revenue | Break-even |", "| Ricavi mensili | Punto di pareggio |"));
  sections.push(t(ctx, "| Customer count | 50-100 active |", "| Numero clienti | 50-100 attivi |"));
  sections.push(t(ctx, "| Social media followers | 2,000+ |", "| Follower social media | 2.000+ |"));
  sections.push(t(ctx, "| Email subscribers | 500+ |", "| Iscritti email | 500+ |"));
  sections.push(t(ctx, "| Customer satisfaction | 4.5+ / 5 |", "| Soddisfazione clienti | 4,5+ / 5 |"));
  sections.push("");

  // 5. Resources
  sections.push(heading(ctx, "5. Resource Requirements", "5. Requisiti di Risorse"));
  sections.push("");
  sections.push(t(ctx, `**Team:** Founder (full-time), freelance designer (part-time), ${ctx.hasTech ? 'developer' : 'virtual assistant'} (part-time)`, `**Team:** Fondatore (tempo pieno), designer freelance (part-time), ${ctx.hasTech ? 'sviluppatore' : 'assistente virtuale'} (part-time)`));
  sections.push(t(ctx, "**Tools:** Website builder, social media scheduler, email marketing tool, analytics platform, project management tool", "**Strumenti:** Website builder, scheduler social media, strumento email marketing, piattaforma analytics, strumento di project management"));
  sections.push(t(ctx, "**Budget:** Allocate 40% to product/operations, 30% to marketing, 20% to tools/infrastructure, 10% to contingency", "**Budget:** Assegna 40% a prodotto/operazioni, 30% a marketing, 20% a strumenti/infrastruttura, 10% a riserva"));
  sections.push("");

  // 6. Risk
  sections.push(heading(ctx, "6. Risk Mitigation", "6. Mitigazione dei Rischi"));
  sections.push("");
  sections.push(t(ctx, "- **Market risk:** Validate demand before significant investment", "- **Rischio di mercato:** Convalida la domanda prima di investimenti significativi"));
  sections.push(t(ctx, "- **Financial risk:** Maintain 3-month operating expense reserve", "- **Rischio finanziario:** Mantieni una riserva di spese operative di 3 mesi"));
  sections.push(t(ctx, "- **Operational risk:** Document processes early to enable delegation", "- **Rischio operativo:** Documenta i processi presto per abilitare la delega"));
  sections.push(t(ctx, "- **Competitive risk:** Continuously gather customer feedback to stay ahead", "- **Rischio competitivo:** Raccogli continuamente feedback dei clienti per restare avanti"));
  sections.push("");

  void idea;
  return sections.join("\n");
}

function generateStrategy(ctx: IdeaContext, idea: string): string {
  const sections: string[] = [];
  sections.push(heading(ctx, "Business Strategy", "Strategia di Business"));
  sections.push("");

  // 1. Executive Summary
  sections.push(heading(ctx, "1. Executive Summary", "1. Riepilogo Esecutivo"));
  sections.push("");
  sections.push(t(ctx,
    `This business plan synthesizes the Clarity, Niche, and Action analyses into a cohesive strategy for launching and growing your ${ctx.primaryDomain} business. The core concept — ${idea.trim().substring(0, 120)}${idea.length > 120 ? "..." : ""} — targets ${ctx.hasB2B ? "business clients" : "consumers"} through ${ctx.hasOnline ? "digital" : "local"} channels with a ${ctx.hasSubscription ? "subscription" : ctx.hasProduct ? "product sales" : "service-based"} revenue model.`,
    `Questo business plan sintetizza le analisi di Chiarezza, Nicchia e Azione in una strategia coerente per lanciare e far crescere il tuo business ${ctx.primaryDomain}. Il concetto di base — ${idea.trim().substring(0, 120)}${idea.length > 120 ? "..." : ""} — si rivolge a ${ctx.hasB2B ? "clienti aziendali" : "consumatori"} attraverso canali ${ctx.hasOnline ? "digitali" : "locali"} con un modello di ricavo ${ctx.hasSubscription ? "ad abbonamento" : ctx.hasProduct ? "di vendità di prodotti" : "basato su servizi"}.`));
  sections.push("");

  // 2. SWOT
  sections.push(heading(ctx, "2. SWOT Analysis", "2. Analisi SWOT"));
  sections.push("");
  sections.push(t(ctx, "| Strengths | Weaknesses |", "| Punti di Forza | Punti di Debolezza |"));
  sections.push(t(ctx, "|-----------|------------|", "|-----------|---------|"));
  sections.push(t(ctx, `| ${ctx.hasEco ? "Sustainable differentiation" : "Fresh market perspective"} | Limited brand recognition |`, `| ${ctx.hasEco ? "Differenziazione sostenibile" : "Prospettiva di mercato fresca"} | Reconoscimento del marchio limitato |`));
  sections.push(t(ctx, "| Agile, customer-focused | Resource constraints |", "| Agile, focalizzato sul cliente | Vincoli di risorse |"));
  sections.push(t(ctx, "| Niche expertise | Dependency on founder |", "| Competenza di nicchia | Dipendenza dal fondatore |"));
  sections.push("");
  sections.push(t(ctx, "| Opportunities | Threats |", "| Opportunità | Minacce |"));
  sections.push(t(ctx, "|--------------|---------|", "|---------|------------|"));
  sections.push(t(ctx, "| Growing market demand | Established competitors |", "| Crescita della domanda di mercato | Concorrenti affermati |"));
  sections.push(t(ctx, `| ${ctx.hasTech ? "Technology adoption trends" : "Changing consumer behavior"} | Economic uncertainty |`, `| ${ctx.hasTech ? "Tendenze di adozione tecnologica" : "Comportamento dei consumatori in cambiamento"} | Incertezza economica |`));
  sections.push(t(ctx, "| Partnership potential | New market entrants |", "| Potenziale di partnership | Nuovi entranti nel mercato |"));
  sections.push("");

  // 3. Business Model Canvas
  sections.push(heading(ctx, "3. Business Model Canvas", "3. Business Model Canvas"));
  sections.push("");
  sections.push(t(ctx, `**Value Proposition:** A tailored ${ctx.primaryDomain} solution that addresses an unmet need with ${ctx.hasEco ? "sustainability" : ctx.hasTech ? "technology" : "quality and personalization"} at its core.`, `**Proposta di Valore:** Una soluzione ${ctx.primaryDomain} su misura che affronta un bisogno non soddisfatto con ${ctx.hasEco ? "sostenibilità" : ctx.hasTech ? "tecnologia" : "qualità e personalizzazione"} al centro.`));
  sections.push(t(ctx, `**Revenue Streams:** ${ctx.hasSubscription ? "Monthly subscriptions with tiered pricing" : ctx.hasProduct ? "Direct product sales" : "Service contracts and project fees"}.`, `**Flussi di Ricavo:** ${ctx.hasSubscription ? "Abbonamenti mensili con prezzi a livelli" : ctx.hasProduct ? "Vendita diretta di prodotti" : "Contratti di servizio e compensi di progetto"}.`));
  sections.push(t(ctx, `**Customer Segments:** ${ctx.hasB2B ? "SMEs and enterprises" : "Individual consumers"}, starting with early adopters in the ${ctx.primaryDomain} niche.`, `**Segmenti di Clienti:** ${ctx.hasB2B ? "PMI e imprese" : "Consumatori individuali"}, a partire dai primi adottatori nella nicchia ${ctx.primaryDomain}.`));
  sections.push(t(ctx, `**Channels:** ${ctx.hasOnline ? "Online (website, social, email)" : "Direct (local, referrals, events)"}.`, `**Canali:** ${ctx.hasOnline ? "Online (sito, social, email)" : "Diretti (locale, referenze, eventi)"}.`));
  sections.push(t(ctx, "**Key Activities:** Product/service delivery, marketing, customer support, continuous improvement.", "**Attività Chiave:** Consegna prodotto/servizio, marketing, supporto clienti, miglioramento continuo."));
  sections.push(t(ctx, `**Key Resources:** Founder expertise, ${ctx.hasTech ? 'technology infrastructure' : 'operational systems'}, brand, customer relationships.`, `**Risorse Chiave:** Competenza del fondatore, ${ctx.hasTech ? 'infrastruttura tecnologica' : 'sistemi operativi'}, marchio, relazioni con i clienti.`));
  sections.push("");

  // 4. Financial Projections
  sections.push(heading(ctx, "4. Financial Projections", "4. Proiezioni Finanziarie"));
  sections.push("");
  sections.push(t(ctx, "| Period | Revenue | Costs | Net |", "| Periodo | Ricavi | Costi | Netto |"));
  sections.push(t(ctx, "|--------|---------|-------|-----|", "|---------|--------|-------|-------|"));
  sections.push(t(ctx, "| Month 1-3 | Low | High | Negative |", "| Mese 1-3 | Basso | Alto | Negativo |"));
  sections.push(t(ctx, "| Month 4-6 | Growing | Moderate | Approaching break-even |", "| Mese 4-6 | In crescita | Moderato | Verso il pareggio |"));
  sections.push(t(ctx, "| Month 7-12 | Scaling | Controlled | Profitable |", "| Mese 7-12 | In scalata | Controllato | Profittevole |"));
  sections.push("");
  sections.push(t(ctx, "**Break-even estimate:** 6-9 months with disciplined execution.", "**Stima punto di pareggio:** 6-9 mesi con esecuzione disciplinata."));
  sections.push(t(ctx, "**Initial capital needed:** Depends on scope — budget for 6 months of operations minimum.", "**Capitale iniziale necessario:** Dipende dalla portata — budget per almeno 6 mesi di operazioni."));
  sections.push("");

  // 5. Timeline
  sections.push(heading(ctx, "5. Implementation Timeline", "5. Cronologia di Implementazione"));
  sections.push("");
  sections.push(t(ctx, "**30 days:** Legal setup, brand identity, MVP launch", "**30 giorni:** Configurazione legale, identità del marchio, lancio MVP"));
  sections.push(t(ctx, "**90 days:** First paying customers, marketing engine running", "**90 giorni:** Primi clienti paganti, motore di marketing in funzione"));
  sections.push(t(ctx, "**6 months:** Break-even approaching, team expansion planned", "**6 mesi:** Punto di pareggio in arrivo, espansione del team pianificata"));
  sections.push(t(ctx, "**1 year:** Profitable, exploring expansion opportunities", "**1 anno:** Profittevole, esplorazione di opportunità di espansione"));
  sections.push(t(ctx, "**3 years:** Market leader in niche, diversifying offerings", "**3 anni:** Leader di mercato nella nicchia, diversificazione dell'offerta"));
  sections.push("");

  // 6. Prioritized To-Do
  sections.push(heading(ctx, "6. Prioritized To-Do List", "6. Lista di Cose da Fare Prioritizzata"));
  sections.push("");
  sections.push(t(ctx, "**Immediate (Next 30 Days):**", "**Immediato (Prossimi 30 Giorni):**"));
  sections.push(t(ctx, "- [ ] Register business and obtain necessary licenses", "- [ ] Registra l'azienda e ottieni le licenze necessarie"));
  sections.push(t(ctx, "- [ ] Set up business bank account", "- [ ] Apri un conto bancario aziendale"));
  sections.push(t(ctx, `- [ ] Build ${ctx.hasOnline ? "website/MVP" : "core offering"}`, `- [ ] Costruisci ${ctx.hasOnline ? "sito/MVP" : "offerta di base"}`));
  sections.push(t(ctx, "- [ ] Create brand identity (logo, colors, voice)", "- [ ] Crea l'identità del marchio (logo, colori, tono)"));
  sections.push(t(ctx, "- [ ] Set up social media profiles", "- [ ] Configura i profili social media"));
  sections.push(t(ctx, "- [ ] Reach out to 20 potential customers for feedback", "- [ ] Contatta 20 potenziali clienti per feedback"));
  sections.push("");
  sections.push(t(ctx, "**Short-Term (60-90 Days):**", "**Breve Termine (60-90 Giorni):**"));
  sections.push(t(ctx, "- [ ] Launch marketing campaigns", "- [ ] Lancia campagne di marketing"));
  sections.push(t(ctx, "- [ ] Onboard first 10 paying customers", "- [ ] Onboarda i primi 10 clienti paganti"));
  sections.push(t(ctx, "- [ ] Establish feedback collection system", "- [ ] Stabilisci un sistema di raccolta feedback"));
  sections.push(t(ctx, "- [ ] Refine offering based on early data", "- [ ] Affina l'offerta in base ai dati iniziali"));
  sections.push("");
  sections.push(t(ctx, "**Medium-Term (90-180 Days):**", "**Medio Termine (90-180 Giorni):**"));
  sections.push(t(ctx, "- [ ] Scale marketing to profitable channels", "- [ ] Scala il marketing verso canali profittevoli"));
  sections.push(t(ctx, "- [ ] Hire first team member", "- [ ] Assumi il primo membro del team"));
  sections.push(t(ctx, "- [ ] Explore partnership opportunities", "- [ ] Esplora opportunità di partnership"));
  sections.push(t(ctx, "- [ ] Reach break-even", "- [ ] Raggiungi il punto di pareggio"));
  sections.push("");

  void idea;
  return sections.join("\n");
}

export async function runAnalysis(
  idea: string,
  lang: AnalysisLang,
  onProgress: (step: "clarity" | "niche" | "action" | "strategy") => void
): Promise<AnalysisResult> {
  const ctx = detectContext(idea);

  onProgress("clarity");
  await delay(400);
  const clarity = generateClarity(ctx, idea);

  onProgress("niche");
  await delay(500);
  const niche = generateNiche(ctx, idea);

  onProgress("action");
  await delay(500);
  const action = generateAction(ctx, idea);

  onProgress("strategy");
  await delay(600);
  const strategy = generateStrategy(ctx, idea);

  return { clarity, niche, action, strategy };
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
