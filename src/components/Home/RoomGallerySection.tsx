import { RoomGallery, type RoomCard } from "../ui/room-gallery";
import { ROOMS, ROOM_DISPLAY_NAMES, ROOM_META } from '../../lib/types'


const items: RoomCard[] = ROOMS.map((room) => ({
  id: room, 
  title: ROOM_DISPLAY_NAMES[room],
  description: ROOM_META[room].description,
  to: `/${room}`,
  cta: ROOM_META[room].cta,
}))

function RoomGallerySection() {
  return (
    <RoomGallery
      title='The Rooms'
      description='Five spaces to wander - pick whichever calls to you.'
      items={items}
      />
  )
}

export default RoomGallerySection