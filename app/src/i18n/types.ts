export type Language = 'en' | 'he';

export interface Translations {
  // Navigation
  'nav.dashboard': string;
  'nav.academy': string;
  'nav.valueChain': string;
  'nav.suppliers': string;
  'nav.meetings': string;
  'nav.utilities': string;
  'nav.licensing': string;
  'nav.acquisition': string;
  'nav.proposal': string;
  'nav.planner': string;
  'nav.installers': string;
  'nav.learn': string;
  'nav.operate': string;
  'nav.sell': string;

  // Common
  'common.search': string;
  'common.back': string;
  'common.next': string;
  'common.save': string;
  'common.cancel': string;
  'common.close': string;
  'common.loading': string;
  'common.viewAll': string;
  'common.delete': string;
  'common.edit': string;
  'common.add': string;
  'common.filter': string;
  'common.all': string;
  'common.none': string;
  'common.yes': string;
  'common.no': string;
  'common.comingSoon': string;
  'common.markComplete': string;
  'common.completed': string;
  'common.inProgress': string;
  'common.notStarted': string;
  'common.minutes': string;
  'common.hours': string;
  'common.days': string;
  'common.weeks': string;
  'common.collapse': string;
  'common.more': string;
  'common.tryAgain': string;
  'common.error': string;

  // Difficulty
  'difficulty.beginner': string;
  'difficulty.intermediate': string;
  'difficulty.advanced': string;

  // Categories
  'category.fundamentals': string;
  'category.technology': string;
  'category.economics': string;
  'category.regulatory': string;
  'category.operations': string;

  // Dashboard
  'dashboard.welcome': string;
  'dashboard.subtitle': string;
  'dashboard.gettingStarted': string;
  'dashboard.quickNav': string;
  'dashboard.marketMetrics': string;
  'dashboard.yourProgress': string;
  'dashboard.recentActivity': string;
  'dashboard.checklist.academy': string;
  'dashboard.checklist.suppliers': string;
  'dashboard.checklist.electrician': string;
  'dashboard.checklist.utility': string;
  'dashboard.checklist.proposal': string;
  'dashboard.checklist.project': string;
  'dashboard.metrics.irradiation': string;
  'dashboard.metrics.tariff': string;
  'dashboard.metrics.systemCost': string;
  'dashboard.metrics.payback': string;
  'dashboard.progress.academy': string;
  'dashboard.progress.projects': string;
  'dashboard.progress.installers': string;

  // Academy
  'academy.title': string;
  'academy.subtitle': string;
  'academy.topics': string;
  'academy.completed': string;
  'academy.bookmark': string;
  'academy.readTime': string;
  'academy.keyPoints': string;
  'academy.practicalTips': string;
  'academy.argentinaContext': string;
  'academy.prevTopic': string;
  'academy.nextTopic': string;

  // Value Chain
  'valueChain.title': string;
  'valueChain.subtitle': string;
  'valueChain.phase': string;
  'valueChain.duration': string;
  'valueChain.deliverables': string;
  'valueChain.risks': string;
  'valueChain.steps': string;
  'valueChain.tips': string;
  'valueChain.documents': string;

  // Suppliers
  'suppliers.title': string;
  'suppliers.subtitle': string;
  'suppliers.distributor': string;
  'suppliers.manufacturer': string;
  'suppliers.both': string;
  'suppliers.brands': string;
  'suppliers.products': string;
  'suppliers.delivery': string;
  'suppliers.payment': string;
  'suppliers.strengths': string;
  'suppliers.weaknesses': string;
  'suppliers.rating': string;
  'suppliers.priceRange': string;
  'suppliers.contact': string;

  // Meetings
  'meetings.title': string;
  'meetings.subtitle': string;
  'meetings.duration': string;
  'meetings.preparation': string;
  'meetings.agenda': string;
  'meetings.questions': string;
  'meetings.redFlags': string;
  'meetings.followUp': string;
  'meetings.script': string;
  'meetings.documents': string;
  'meetings.research': string;
  'meetings.materials': string;

  // Utilities
  'utilities.title': string;
  'utilities.subtitle': string;
  'utilities.selectProvince': string;
  'utilities.connectionProcess': string;
  'utilities.requiredDocs': string;
  'utilities.fees': string;
  'utilities.tips': string;
  'utilities.commonIssues': string;
  'utilities.status.active': string;
  'utilities.status.limited': string;
  'utilities.status.pending': string;

  // Licensing
  'licensing.title': string;
  'licensing.subtitle': string;
  'licensing.overview': string;
  'licensing.permitTypes': string;
  'licensing.provincialStatus': string;
  'licensing.checklist': string;
  'licensing.preInstallation': string;
  'licensing.installation': string;
  'licensing.postInstallation': string;

  // Acquisition
  'acquisition.title': string;
  'acquisition.subtitle': string;
  'acquisition.strategies': string;
  'acquisition.funnel': string;
  'acquisition.difficulty.easy': string;
  'acquisition.difficulty.medium': string;
  'acquisition.difficulty.hard': string;
  'acquisition.cost.free': string;
  'acquisition.cost.low': string;
  'acquisition.cost.medium': string;
  'acquisition.cost.high': string;
  'acquisition.expectedLeads': string;
  'acquisition.timeToLead': string;

  // Installers
  'installers.title': string;
  'installers.subtitle': string;
  'installers.qualification': string;
  'installers.contacts': string;
  'installers.addInstaller': string;
  'installers.noInstallers': string;

  // Planner
  'planner.title': string;
  'planner.subtitle': string;
  'planner.addProject': string;
  'planner.noProjects': string;
  'planner.customerName': string;
  'planner.systemSize': string;
  'planner.budgetTier': string;
  'planner.status': string;
  'planner.plannedCost': string;
  'planner.actualCost': string;
  'planner.notes': string;
  'planner.status.planning': string;
  'planner.status.proposed': string;
  'planner.status.approved': string;
  'planner.status.installing': string;
  'planner.status.completed': string;

  // Proposal
  'proposal.title': string;
  'proposal.subtitle': string;

  // Smart Proposal
  'nav.smartProposal': string;
  'smartProposal.title': string;
  'smartProposal.subtitle': string;
  'smartProposal.uploadBill': string;
  'smartProposal.dragDrop': string;
  'smartProposal.manualEntry': string;
  'smartProposal.analyzing': string;
  'smartProposal.extracted': string;
  'smartProposal.confirm': string;
  'smartProposal.selectLocation': string;
  'smartProposal.tapToPin': string;
  'smartProposal.generatePremium': string;
  'smartProposal.downloadPdf': string;
  'smartProposal.shareWhatsApp': string;
  'smartProposal.newProposal': string;
  'smartProposal.coverTitle': string;
  'smartProposal.executiveSummary': string;
  'smartProposal.billPhoto': string;
  'smartProposal.roofType': string;
  'smartProposal.orientation': string;
  'smartProposal.budget': string;
  'smartProposal.customerName': string;
  'smartProposal.monthlyBill': string;
  'smartProposal.consumption': string;
  'smartProposal.utility': string;
  'smartProposal.address': string;
  'smartProposal.province': string;
  'smartProposal.confidence.high': string;
  'smartProposal.confidence.medium': string;
  'smartProposal.confidence.low': string;

  // Errors
  'errors.somethingWentWrong': string;
  'errors.pageError': string;
}

export type TranslationKey = keyof Translations;
