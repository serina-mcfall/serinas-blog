//import three types Mood,Quote and ListeningItem all from '../../lib/types', all types only all on one set of curly brackets.
//import three child components MoodChip,QuoteOfTheWeek and CurrentlyListening (default imports from './...')
// Define Props Interface with three fields: mood:Mood | null, quote: Quote | null, listening: ListeningItem | null
//function ThisWeek decunstructing {mood, quote, listening }: Props
// Return a <section> with aria-label="This week" that contains
//1. {mood && <MoodChip mood={mood} />}
//2. {quote && <QuoteOfTheWeek quote={quote} />}
//3. {listening && <CurrentlyListening listening={listening} />}
//export so other files can use it

import type { Mood, Quote, ListeningItem } from '../../lib/types'
import MoodChip from './MoodChip'
import QuoteOfTheWeek from './QuoteOfTheWeek'
import CurrentlyListening from './CurrentlyListening'
import { GlassCard } from '../ui/glass-card'

interface Props {
  mood: Mood | null
  quote: Quote | null
  listening: ListeningItem | null
}

function ThisWeek({ mood, quote, listening }: Props) {
  return (
    <section aria-label="This Week">
      <GlassCard className="p-6">
        {mood && <MoodChip mood={mood} />}
        {quote && <QuoteOfTheWeek quote={quote} />}
        {listening && <CurrentlyListening listening={listening} />}
      </GlassCard>
    </section>
  )
}

export default ThisWeek
