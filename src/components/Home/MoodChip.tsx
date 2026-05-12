//Import the Mood type
// Define an interface called Props with one field: mood: Mood
// The function take the decunstructed {mood}: Props
// Return a <div> with aria-label="Today's mood" which contains
// 1. <span> with aria-hidden="true" that shows {mood.emoji}
// 2. <span> showing {mood.word}
// Export so other files can use it

import type { Mood } from '../../lib/types'

interface Props {
  mood: Mood
}

function MoodChip({ mood }: Props) {
  return (
    <div aria-label="Today's mood">
      <span aria-hidden="true">{mood.emoji}</span>
      <span>{mood.word}</span>
    </div>
  )
}

export default MoodChip
