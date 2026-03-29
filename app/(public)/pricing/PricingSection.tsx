'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ── Plans ──────────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    yearly: 0,
    description: 'For aspirants just getting started.',
    cta: 'Get Started',
    ctaHref: '/signup',
    highlight: false,
    features: [
      { label: '100 PYQs per day', included: true },
      { label: '2 Mock Tests per month', included: true },
      { label: 'Basic performance analytics', included: true },
      { label: 'Chapter-wise filtering', included: true },
      { label: 'AI-powered explanations', included: false },
      { label: 'Unlimited PYQs', included: false },
      { label: 'Video solutions', included: false },
      { label: 'Priority support', included: false },
      { label: 'Offline access', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 299,
    yearly: 1999,
    description: 'For serious aspirants preparing full-time.',
    cta: 'Start Pro',
    ctaHref: '/signup?plan=pro',
    highlight: true,
    features: [
      { label: '100 PYQs per day', included: true },
      { label: '2 Mock Tests per month', included: true },
      { label: 'Basic performance analytics', included: true },
      { label: 'Chapter-wise filtering', included: true },
      { label: 'AI-powered explanations', included: true },
      { label: 'Unlimited PYQs', included: true },
      { label: 'Video solutions', included: false },
      { label: 'Priority support', included: false },
      { label: 'Offline access', included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthly: 599,
    yearly: 3999,
    description: 'For toppers who want every edge.',
    cta: 'Start Elite',
    ctaHref: '/signup?plan=elite',
    highlight: false,
    features: [
      { label: '100 PYQs per day', included: true },
      { label: '2 Mock Tests per month', included: true },
      { label: 'Basic performance analytics', included: true },
      { label: 'Chapter-wise filtering', included: true },
      { label: 'AI-powered explanations', included: true },
      { label: 'Unlimited PYQs', included: true },
      { label: 'Video solutions', included: true },
      { label: 'Priority support', included: true },
      { label: 'Offline access', included: true },
    ],
  },
]

/* ── FAQ ────────────────────────────────────────────────────────────── */
const FAQ = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. You can upgrade, downgrade or cancel at any time from your account settings. Changes take effect at the next billing cycle.',
  },
  {
    q: 'Is there a student discount?',
    a: 'We offer a 20% discount for students with a valid .edu email or a Digilocker-verified ID. Apply during signup.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'UPI, Debit/Credit card, Netbanking, and Wallets (Paytm, PhonePe) — all via Cashfree.',
  },
  {
    q: 'Do unused mock tests roll over?',
    a: 'Mock test credits on the Pro plan reset monthly. On the Elite plan, up to 10 unused tests roll over to the next month.',
  },
  {
    q: 'Is the Free plan really free forever?',
    a: 'Yes. The Free plan has no time limit. You get 100 PYQs per day and 2 mock tests per month, forever.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border py-4">
      <button
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-medium text-text">{q}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
      )}
    </div>
  )
}

/* ── Main section ───────────────────────────────────────────────────── */
export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  return (
    <>
      {/* Billing toggle */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <span className={cn('text-sm font-medium', !yearly ? 'text-text' : 'text-muted')}>Monthly</span>
        <button
          onClick={() => setYearly((v) => !v)}
          className={cn(
            'relative h-6 w-11 rounded-full transition-colors duration-200',
            yearly ? 'bg-accent' : 'bg-border2'
          )}
          aria-label="Toggle yearly billing"
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200',
              yearly && 'translate-x-5'
            )}
          />
        </button>
        <span className={cn('text-sm font-medium', yearly ? 'text-text' : 'text-muted')}>
          Yearly{' '}
          <span className="rounded-full bg-green/15 px-2 py-0.5 text-[10px] font-bold text-green">
            Save 40%
          </span>
        </span>
      </div>

      {/* Plan cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly
          const perMonth = yearly && plan.yearly > 0
            ? Math.round(plan.yearly / 12)
            : plan.monthly

          return (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col rounded-2xl border p-6',
                plan.highlight
                  ? 'border-accent bg-accent/5 shadow-[0_0_40px_rgba(109,86,250,0.15)]'
                  : 'border-border bg-bg2'
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}

              <p className="text-base font-bold text-text">{plan.name}</p>
              <p className="mt-0.5 text-xs text-muted">{plan.description}</p>

              <div className="mt-4">
                {price === 0 ? (
                  <p className="text-3xl font-extrabold text-text">₹0</p>
                ) : (
                  <>
                    <p className="text-3xl font-extrabold text-text">
                      ₹{perMonth.toLocaleString('en-IN')}
                      <span className="text-sm font-normal text-muted">/mo</span>
                    </p>
                    {yearly && (
                      <p className="mt-0.5 text-xs text-muted">
                        ₹{price.toLocaleString('en-IN')} billed annually
                      </p>
                    )}
                  </>
                )}
              </div>

              <Link
                href={plan.ctaHref}
                className={cn(
                  'mt-5 block rounded-full py-2.5 text-center text-sm font-semibold transition-colors',
                  plan.highlight
                    ? 'bg-accent text-white hover:bg-accent2'
                    : 'border border-border2 text-text hover:border-accent hover:text-accent'
                )}
              >
                {plan.cta}
              </Link>

              <ul className="mt-5 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2.5 text-sm">
                    {f.included ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green" />
                    ) : (
                      <X className="h-4 w-4 shrink-0 text-border2" />
                    )}
                    <span className={f.included ? 'text-text' : 'text-muted'}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Feature comparison table */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-text">Full feature comparison</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted w-1/2">Feature</th>
                {PLANS.map((p) => (
                  <th key={p.id} className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { label: 'Daily PYQ limit',          values: ['100/day', 'Unlimited', 'Unlimited'] },
                { label: 'Monthly mock tests',        values: ['2', '50', 'Unlimited'] },
                { label: 'AI explanations',           values: [false, true, true] },
                { label: 'Video solutions',           values: [false, false, true] },
                { label: 'Analytics dashboard',       values: ['Basic', 'Advanced', 'Advanced'] },
                { label: 'Bookmarks & notes',         values: [true, true, true] },
                { label: 'Download questions (PDF)',  values: [false, true, true] },
                { label: 'Priority support',          values: [false, false, true] },
                { label: 'Offline mode',              values: [false, false, true] },
                { label: 'Custom test builder',       values: [false, true, true] },
              ].map(({ label, values }) => (
                <tr key={label} className="hover:bg-bg2/50">
                  <td className="py-3 text-muted">{label}</td>
                  {values.map((v, i) => (
                    <td key={i} className="py-3 text-center">
                      {typeof v === 'boolean' ? (
                        v ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-green" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-border2" />
                        )
                      ) : (
                        <span className="font-medium text-text">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-text">Frequently asked questions</h2>
        <div className="mt-4">
          {FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </>
  )
}
