import Hello from '../components/Home/Hello'
import ThisWeek from '../components/Home/ThisWeek'
import FeaturedWindow from '../components/Home/FeaturedWindow'
import RoomGallerySection from '../components/Home/RoomGallerySection'
import { getMood, getQuote, getListening, getFeatured } from '../lib/content'

function Home() {
  const mood = getMood()
  const quote = getQuote()
  const listening = getListening()
  const featuredArt = getFeatured('art')
  const featuredWriting = getFeatured('writing')
  const featuredTravel = getFeatured('travel')

  return (
    <>
      <Hello />
      <ThisWeek mood={mood} quote={quote} listening={listening} />
      <section aria-label="Featured this week">
        <FeaturedWindow kind="art" item={featuredArt} />
        <FeaturedWindow kind="writing" item={featuredWriting} />
        <FeaturedWindow kind="travel" item={featuredTravel} />
      </section>
      <RoomGallerySection />
    </>
  )
}

export default Home
