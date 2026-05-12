import type { Room } from '../../lib/types'
import { ROOM_DISPLAY_NAMES } from '../../lib/types'

const DESCRIPTIONS: Record<Room, string> = {
  writing: 'Stories in progress, drafts, and notes from inside the work.',
  art: 'Resin, diamond art, digital, and the experiments in between.',
  code: 'What I am learning as a Dev Academy student — wins, stumbles, what surprised me.',
  travel: 'Places I have been, things I have eaten, and what stayed with me.',
  neurodivergent: 'Notes from an AuDHD brain. The hard days and the bright ones.',
}

interface Props {
  room: Room
}

function RoomHeader({ room }: Props) {
  return (
    <header>
      <h1>{ROOM_DISPLAY_NAMES[room]}</h1>
      <p>{DESCRIPTIONS[room]}</p>
    </header>
  )
}

export default RoomHeader
