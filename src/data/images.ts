/**
 * All photography sourced from Unsplash (royalty-free), referenced by their
 * canonical CDN ids. `img()` appends Unsplash's own resizing/format params.
 */
export function img(id: string, width = 1600, quality = 80): string {
  return `https://images.unsplash.com/${id}?q=${quality}&w=${width}&auto=format&fit=crop`
}

export const IMAGES = {
  heroFallback: 'photo-1583354608715-177553a4035e',
  chef: 'photo-1618847317359-39b7477285a1',
  experience: [
    'photo-1583354608715-177553a4035e',
    'photo-1531973968078-9bb02785f13d',
    'photo-1602232037779-30b01ac3c457',
  ],
}
