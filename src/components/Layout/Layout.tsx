// Import Header from ./Header
// Import Footer from ./Footer
// Import Outlet from react-router-dom
// Create a Function called Layout that returns
// 1. The Header at the top
// 2. A <main> element containing <Outlet/>
// 3. The Footer at the bottom
// Export so other files can use it.

import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
