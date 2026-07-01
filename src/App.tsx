import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Room from './pages/Room'
import Post from './pages/Post'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Lab from './pages/Lab' // ← NEW

function App() {
  return (
    <Routes>
      {import.meta.env.DEV && <Route path="/lab" element={<Lab />} />}{' '}
      {/* ← NEW */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/:room" element={<Room />} />
        <Route path="/:room/:slug" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
