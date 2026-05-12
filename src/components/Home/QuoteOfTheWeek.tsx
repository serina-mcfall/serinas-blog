import ReactMarkdown from 'react-markdown'
import type { Quote } from '../../lib/types'

interface Props {
  quote: Quote
}

function QuoteOfTheWeek({ quote }: Props) {
  return (
    <figure aria-label="Quote of the week">
      <blockquote>
        <ReactMarkdown>{quote.body}</ReactMarkdown>
      </blockquote>
      <figcaption>
        — {quote.author}
        {quote.source && <span>, {quote.source}</span>}
      </figcaption>
    </figure>
  )
}

export default QuoteOfTheWeek
