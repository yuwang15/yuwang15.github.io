import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { ScrollToTop } from './components/ScrollToTop'
import { Brand } from './pages/Brand'
import { CollectionDetail } from './pages/CollectionDetail'
import { Collections } from './pages/Collections'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { StoreDetail } from './pages/StoreDetail'
import { Stores } from './pages/Stores'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site">
        <Nav />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:slug" element={<CollectionDetail />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:slug" element={<StoreDetail />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/campaign" element={<Navigate to="/brand#film" replace />} />
            <Route path="/media" element={<Navigate to="/brand#film" replace />} />
            <Route path="/about" element={<Navigate to="/brand" replace />} />
            <Route path="/story" element={<Navigate to="/brand" replace />} />
            <Route path="/wechat" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
