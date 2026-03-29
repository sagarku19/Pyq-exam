import type { Metadata } from 'next'
import { PricingSection } from './PricingSection'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for PYQ Platform. Free plan available. Pro and Elite plans unlock unlimited PYQs, AI explanations, mock tests and more.',
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-text sm:text-4xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-3 text-muted">
          Start free. Upgrade when you need more power.
        </p>
      </div>

      <PricingSection />
    </div>
  )
}
