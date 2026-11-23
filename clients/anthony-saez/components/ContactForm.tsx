'use client'
import { useState, type FormEvent } from 'react'
import type { Dict } from '@/lib/i18n'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

/**
 * Formulaire de contact. Envoi vers `formEndpoint` (content/site.json) : tout service qui accepte
 * un POST JSON (FormSubmit, Formspree, Web3Forms…). Vide = mode aperçu, rien n'est envoyé.
 */
export default function ContactForm({ c, endpoint, lang }: { c: Dict['contact']; endpoint: string; lang: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('website')) return // champ piège pour les robots
    const v = (k: string) => String(fd.get(k) || '').trim()
    const errs: Record<string, string> = {}
    if (!v('name')) errs.name = c.required
    if (!v('email')) errs.email = c.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) errs.email = c.invalidEmail
    if (!v('message')) errs.message = c.required
    setErrors(errs)
    if (Object.keys(errs).length) { (form.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus(); return }
    if (!endpoint) { setStatus('unconfigured'); return }
    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: v('name'), email: v('email'), category: v('category'), location: v('location'), message: v('message'), language: lang, _subject: `Website enquiry — ${v('name')}`, _replyto: v('email') }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success'); form.reset()
    } catch { setStatus('error') }
  }

  const err = (k: string) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-[#e0a98f]">{errors[k]}</p>
  const a = (k: string) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `${k}-err` : undefined } as const)
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div><label htmlFor="f-name" className="eyebrow">{c.name}</label><input id="f-name" name="name" autoComplete="name" required className="field" {...a('name')} />{err('name')}</div>
        <div><label htmlFor="f-email" className="eyebrow">{c.email}</label><input id="f-email" name="email" type="email" autoComplete="email" required className="field" {...a('email')} />{err('email')}</div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div><label htmlFor="f-cat" className="eyebrow">{c.category}</label>
          <select id="f-cat" name="category" defaultValue="" className="field"><option value="" disabled>{c.choose}</option>{c.categories.map(x => <option key={x} value={x}>{x}</option>)}</select></div>
        <div><label htmlFor="f-loc" className="eyebrow">{c.location}</label><input id="f-loc" name="location" placeholder={c.locationHint} autoComplete="address-level2" className="field" /></div>
      </div>
      <div><label htmlFor="f-msg" className="eyebrow">{c.message}</label><textarea id="f-msg" name="message" rows={5} required className="field resize-y" {...a('message')} />{err('message')}</div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === 'sending'} className="btn btn-solid disabled:opacity-60">{status === 'sending' ? c.sending : c.send}</button>
        <p className="text-xs text-stone">{c.privacy}</p>
      </div>
      <div role="status" aria-live="polite">
        {status === 'success' && <p className="border border-bone/30 p-4 text-sand">{c.success}</p>}
        {status === 'unconfigured' && <p className="border border-beige/50 p-4 text-sand">{c.unconfigured}</p>}
        {status === 'error' && <p className="border border-[#e0a98f]/60 p-4 text-[#f0c4ae]">{c.error}</p>}
      </div>
    </form>
  )
}
