import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StopsPage from './pages/StopsPage'
import AboutPage from './pages/AboutPage'
import PricingPage from './pages/PricingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arrets" element={<StopsPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/tarifs" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
