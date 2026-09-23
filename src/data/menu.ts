import { img } from './images'

// Titles, descriptions and ingredient lists live in src/i18n/content/*.ts
// (`menu.courses`); this file only holds the images and the price, in the
// same order as each language's course list.
export const TASTING_MENU = { price: '185' }

export const COURSES: { image: string }[] = [
  { image: img('photo-1663320405065-fc9de2fed661') },
  { image: img('photo-1627900429100-3ed333915540') },
  { image: img('photo-1707995546451-26652656d51c') },
  { image: img('photo-1625489326375-a22b495e5989') },
  { image: img('photo-1743591141131-3471669f3862') },
  { image: img('photo-1731941465921-eb4285693713') },
  { image: img('photo-1784897218356-28a44cbca9b9') },
]
