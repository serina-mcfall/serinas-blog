// Create a function called Footer that returns a <footer>
// Inside <footer>:
//   1. A <p> with text: © {year} Serina McFall · All rights reserved.
//      - year = new Date().getFullYear(), interpolated as {year} in the JSX
//   2. Inside that same <p>, an <a> with href="/feed.xml" and text "RSS"
// Default-export the function so other files can import it.

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <p>
        © {year} Serina McFall · All rights reserved.{' '}
        <a href="/feed.xml">RSS</a>
      </p>
    </footer>
  )
}

export default Footer
