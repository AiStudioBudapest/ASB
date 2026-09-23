import { img } from './images'

export interface GalleryItem {
  id: string
  image: string
  wide?: boolean
}

// Captions live in src/i18n/content/*.ts (`gallery.captions`), indexed by
// this array's position.
export const GALLERY: GalleryItem[] = [
  { id: 'g1', image: img('photo-1517248135467-4c7edcad34c4', 1800), wide: true },
  { id: 'g2', image: img('photo-1663530761401-15eefb544889', 1400) },
  { id: 'g3', image: img('photo-1703849293013-5430be487639', 1400) },
  { id: 'g4', image: img('photo-1469234496837-d0101f54be3e', 1800), wide: true },
  { id: 'g5', image: img('photo-1650288016253-c1ec87f7c0ea', 1400) },
  { id: 'g6', image: img('photo-1666600638841-4fe4a01ae260', 1400) },
  { id: 'g7', image: img('photo-1707995546402-5057206e5161', 1800), wide: true },
  { id: 'g8', image: img('photo-1657593088889-5105c637f2a8', 1400) },
]
