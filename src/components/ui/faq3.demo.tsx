import { Faq3, type FaqItem } from './faq3'

// Demo data written in Serina's voice, mirroring the North Star — so this shows how
// an FAQ could genuinely serve the About page, not generic placeholder text.
const items: FaqItem[] = [
  {
    id: 'use-art',
    question: 'Can I use one of your pieces?',
    answer:
      'Please ask first. Every piece is © Serina McFall, all rights reserved. I decide case by case — free use, a paid licence, or no — nothing is granted by default.',
  },
  {
    id: 'comments',
    question: 'Is there a comments section?',
    answer:
      "No — and that's on purpose. This is a quiet place to read, not a place to argue in the margins.",
  },
  {
    id: 'follow',
    question: 'Can I subscribe or follow along?',
    answer:
      "There's no newsletter and no sign-up. If you'd like to come back, there's an RSS feed you can pull into your reader — no email, no tracking.",
  },
  {
    id: 'neurodivergent',
    question: "What's the Neurodivergent room?",
    answer:
      "It's where I write about being AuDHD — plainly, not euphemised. It sits alongside the art and travel because it's part of who I am, not a separate 'issues' box.",
  },
]

export default function Faq3Demo() {
  return (
    <Faq3
      heading="A few questions"
      description="Things people sometimes wonder about this place."
      items={items}
    />
  )
}
