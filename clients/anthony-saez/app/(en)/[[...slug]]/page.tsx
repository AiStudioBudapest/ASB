import { renderPage, pageMetadata, staticSlugs } from '@/lib/pages'
type P = { params: Promise<{ slug?: string[] }> }
export const dynamicParams = false
export const generateStaticParams = staticSlugs
export async function generateMetadata({ params }: P) { return pageMetadata('en', (await params).slug) }
export default async function Page({ params }: P) { return renderPage('en', (await params).slug) }
