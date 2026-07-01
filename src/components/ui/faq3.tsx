import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Faq3Props {
  heading?: string
  description?: string
  items?: FaqItem[]
}

const defaultItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is a FAQ?',
    answer:
      'A list of frequently asked questions and their answers on a particular topic.',
  },
]

export function Faq3({
  heading = 'Frequently asked questions',
  description = 'Find answers to common questions.',
  items = defaultItems,
}: Faq3Props) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl space-y-10 px-4">
        <div className="flex flex-col text-left md:text-center">
          <h2 className="mb-3 font-semibold">{heading}</h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>
                <span className="font-medium lg:text-lg">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent>
                <span className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </span>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
