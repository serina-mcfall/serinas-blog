import type { ListeningItem } from '../../lib/types'

interface Props {
  listening: ListeningItem
}

function CurrentlyListening({ listening }: Props) {
  return (
    <div aria-label="Currently listening">
      <span>Listening: </span>
      <a href={listening.url} rel="noopener noreferrer">
        {listening.title}
      </a>
      <span> · {listening.artist}</span>
    </div>
  )
}

export default CurrentlyListening
