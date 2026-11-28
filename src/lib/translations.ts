export type LangCode = "en" | "it";

export interface UITranslations {
  appTitle: string;
  appTagline: string;
  // Auth
  login: string;
  signup: string;
  emailLabel: string;
  passwordLabel: string;
  nameLabel: string;
  loginButton: string;
  signupButton: string;
  switchToSignup: string;
  switchToLogin: string;
  invalidCredentials: string;
  signupSuccess: string;
  authError: string;
  loggingIn: string;
  demoAccount: string;
  demoDescription: string;
  // Main
  welcome: string;
  logout: string;
  navigation: string;
  analyzer: string;
  reportHistory: string;
  founderWorkspace: string;
  businessIdeaLabel: string;
  businessIdeaPlaceholder: string;
  analyzeButton: string;
  pleaseEnterIdea: string;
  processing: string;
  success: string;
  errorOccurred: string;
  downloadReport: string;
  reportSaved: string;
  errorSavingReport: string;
  // Agent names
  clarityAnalysis: string;
  nicheStrategy: string;
  actionPlan: string;
  businessStrategy: string;
  // Agent descriptions
  clarityDesc: string;
  nicheDesc: string;
  actionDesc: string;
  strategyDesc: string;
  // History
  noReports: string;
  viewReport: string;
  deleteReport: string;
  confirmDelete: string;
  backToAnalyzer: string;
  createdOn: string;
  // Misc
  selectLanguage: string;
  generating: string;
  agentComplete: string;
  newAnalysis: string;
  language: string;
  sampleIdeasLabel: string;
}

export const UI_TRANSLATIONS: Record<LangCode, UITranslations> = {
  en: {
    appTitle: "Business Builder",
    appTagline: "Transform your business idea into a comprehensive strategy",
    login: "Login",
    signup: "Sign Up",
    emailLabel: "Email",
    passwordLabel: "Password",
    nameLabel: "Name",
    loginButton: "Log In",
    signupButton: "Create Account",
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: "Already have an account? Log in",
    invalidCredentials: "Invalid email or password",
    signupSuccess: "Account created successfully",
    authError: "An error occurred during authentication",
    loggingIn: "Logging in...",
    demoAccount: "Try Demo Account",
    demoDescription: "Explore the full app without signing up",
    welcome: "Welcome",
    logout: "Log Out",
    navigation: "Navigation",
    analyzer: "Idea Analyzer",
    reportHistory: "Report History",
    founderWorkspace: "Founder Workspace",
    businessIdeaLabel: "Your Business Idea",
    businessIdeaPlaceholder: "Describe your business idea in detail. What product or service do you want to offer? Who are your customers? What problem are you solving?",
    analyzeButton: "Analyze Idea",
    pleaseEnterIdea: "Please enter your business idea first.",
    processing: "Processing...",
    success: "Done",
    errorOccurred: "An error occurred",
    downloadReport: "Download PDF Report",
    reportSaved: "Report saved to your history",
    errorSavingReport: "Could not save report",
    clarityAnalysis: "Clarity Analysis",
    nicheStrategy: "Niche Strategy",
    actionPlan: "Action Plan",
    businessStrategy: "Business Strategy",
    clarityDesc: "Analyzing your core concept, market, and model",
    nicheDesc: "Researching target segments and competitive landscape",
    actionDesc: "Building your implementation roadmap",
    strategyDesc: "Synthesizing a comprehensive business plan",
    noReports: "You haven't generated any reports yet.",
    viewReport: "View",
    deleteReport: "Delete",
    confirmDelete: "Delete this report? This cannot be undone.",
    backToAnalyzer: "Back to Analyzer",
    createdOn: "Created",
    selectLanguage: "Language",
    generating: "Generating",
    agentComplete: "Complete",
    newAnalysis: "New Analysis",
    language: "Language",
    sampleIdeasLabel: "Quick-start sample ideas",
  },
  it: {
    appTitle: "Business Builder",
    appTagline: "Trasforma la tua idea di business in una strategia completa",
    login: "Accedi",
    signup: "Registrati",
    emailLabel: "Email",
    passwordLabel: "Password",
    nameLabel: "Nome",
    loginButton: "Accedi",
    signupButton: "Crea Account",
    switchToSignup: "Non hai un account? Registrati",
    switchToLogin: "Hai già un account? Accedi",
    invalidCredentials: "Email o password non validi",
    signupSuccess: "Account creato con successo",
    authError: "Si è verificato un errore durante l'autenticazione",
    loggingIn: "Accesso in corso...",
    demoAccount: "Prova l'Account Demo",
    demoDescription: "Esplora l'intera app senza registrarti",
    welcome: "Benvenuto",
    logout: "Esci",
    navigation: "Navigazione",
    analyzer: "Analizzatore di Idee",
    reportHistory: "Cronologia Report",
    businessIdeaLabel: "La Tua Idea di Business",
    businessIdeaPlaceholder: "Descrivi la tua idea di business in dettaglio. Quale prodotto o servizio vuoi offrire? Chi sono i tuoi clienti? Quale problema stai risolvendo?",
    analyzeButton: "Analizza Idea",
    pleaseEnterIdea: "Inserisci prima la tua idea di business.",
    processing: "Elaborazione...",
    success: "Fatto",
    errorOccurred: "Si è verificato un errore",
    downloadReport: "Scarica Report PDF",
    reportSaved: "Report salvato nella cronologia",
    errorSavingReport: "Impossibile salvare il report",
    clarityAnalysis: "Analisi di Chiarezza",
    nicheStrategy: "Strategia di Nicchia",
    actionPlan: "Piano d'Azione",
    businessStrategy: "Strategia di Business",
    clarityDesc: "Analisi del concetto di base, mercato e modello",
    nicheDesc: "Ricerca dei segmenti target e panorama competitivo",
    actionDesc: "Costruzione della roadmap di implementazione",
    strategyDesc: "Sintesi di un business plan completo",
    noReports: "Non hai ancora generato alcun report.",
    viewReport: "Visualizza",
    deleteReport: "Elimina",
    confirmDelete: "Eliminare questo report? Questa operazione non può essere annullata.",
    backToAnalyzer: "Torna all'Analizzatore",
    createdOn: "Creato",
    selectLanguage: "Lingua",
    generating: "Generazione",
    agentComplete: "Completato",
    newAnalysis: "Nuova Analisi",
    language: "Lingua",
    sampleIdeasLabel: "Idee di esempio rapide",
  },
};

export interface SampleIdea {
  label: string;
  text: string;
}

export const SAMPLE_IDEAS: Record<LangCode, SampleIdea[]> = {
  en: [
    {
      label: "Local Sustainable Bakery",
      text: "A local bakery that produces organic, sustainable bread and pastries using locally sourced ingredients. We sell directly to consumers through our shop and online ordering for pickup. Our customers are health-conscious families and environmentally aware professionals.",
    },
    {
      label: "B2B SaaS Project Manager",
      text: "A SaaS platform that helps small businesses manage their projects, tasks, and team collaboration. It's a subscription-based software with monthly recurring revenue. Target customers are small to medium enterprises that need an affordable project management solution.",
    },
    {
      label: "Eco-Friendly Fashion Brand",
      text: "An online sustainable fashion brand that creates clothing from recycled materials. We sell directly to consumers through our e-commerce website and social media. Our target market is environmentally conscious young adults aged 20-35 who value ethical fashion.",
    },
    {
      label: "Fitness Coaching App",
      text: "A mobile app that provides personalized fitness coaching and nutrition plans. Users pay a monthly subscription for access to customized workout routines and meal planning. Target customers are busy professionals who want to stay fit but can't afford a personal trainer.",
    },
  ],
  it: [
    {
      label: "Panetteria Sostenibile Locale",
      text: "Una panetteria locale che produce pane e pasticcini biologici e sostenibili utilizzando ingredienti provenienti da fornitori locali. Vendiamo direttamente ai consumatori attraverso il nostro negozio e tramite ordinazioni online per il ritiro. I nostri clienti sono famiglie attente alla salute e professionisti consapevoli dell'ambiente.",
    },
    {
      label: "Piattaforma SaaS B2B",
      text: "Una piattaforma SaaS che aiuta le piccole imprese a gestire i loro progetti, le attività e la collaborazione del team. È un software basato su abbonamento con ricavi mensili ricorrenti. I clienti target sono piccole e medie imprese che hanno bisogno di una soluzione economica per la gestione dei progetti.",
    },
    {
      label: "Brand di Moda Eco-Sostenibile",
      text: "Un brand di moda sostenibile online che crea abbigliamento da materiali riciclati. Vendiamo direttamente ai consumatori attraverso il nostro sito e-commerce e i social media. Il nostro mercato di riferimento sono giovani adulti consapevoli dell'ambiente dai 20 ai 35 anni che valorizzano la moda etica.",
    },
    {
      label: "App di Coaching Fitness",
      text: "Un'app mobile che fornisce coaching fitness personalizzato e piani nutrizionali. Gli utenti pagano un abbonamento mensile per accedere a routine di allenamento personalizzate e pianificazione dei pasti. I clienti target sono professionisti impegnati che vogliono mantenersi in forma ma non possono permettersi un personal trainer.",
    },
  ],
};
