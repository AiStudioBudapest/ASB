export type LangCode = 'hu' | 'en' | 'es' | 'de' | 'fr'

export interface Course {
  title: string
  description: string
  ingredients: string[]
}

export interface JournalEntry {
  title: string
  readTime: string
  date: string
}

export interface Stat {
  value: string
  label: string
}

export interface SiteContent {
  htmlLang: string
  dateLocale: string
  meta: {
    title: string
    description: string
  }
  back: {
    label: string
    aria: string
  }
  nav: {
    maison: string
    menu: string
    chef: string
    galerie: string
    reserver: string
  }
  loading: {
    label: string
    words: string[]
  }
  hero: {
    eyebrow: string
    roles: string[]
    descPrefix: string
    descSuffix: string
    ctaMenu: string
    ctaReserve: string
    scroll: string
  }
  cuisine: {
    eyebrow: string
    headingPre: string
    headingEm: string
    subtext: string
    viewMenu: string
    view: string
    items: { name: string; description: string }[]
  }
  menu: {
    eyebrow: string
    title: string
    subtitle: string
    priceSuffix: string
    courseOf: string
    courses: Course[]
  }
  chef: {
    eyebrow: string
    name: string
    role: string
    quote: string
    bio: string
  }
  gallery: {
    eyebrow: string
    headingPre: string
    headingEm: string
    subtext: string
    instagram: string
    close: string
    prev: string
    next: string
    captions: string[]
  }
  journal: {
    eyebrow: string
    headingPre: string
    headingEm: string
    subtext: string
    readAll: string
    entries: JournalEntry[]
  }
  stats: Stat[]
  reservation: {
    eyebrow: string
    heading: string
    dateLabel: string
    heureLabel: string
    personnesLabel: string
    fewer: string
    more: string
    submit: string
    confirmTitle: string
    confirmTableFor: string
    confirmAt: string
    confirmNote: string
  }
  location: {
    eyebrow: string
    addressLine1: string
    addressLine2: string
    dinnerHours: string
    lunchHours: string
  }
  footer: {
    tagline: string
    city: string
    contactEyebrow: string
    contactHeading: string
    status: string
    copyright: string
  }
}
