import { HashRouter as Router, Routes, Route } from "react-router-dom"

// Import page components
import HomePage from "./pages/HomePage"
import Work1Detail from "./pages/Work1Detail"
import Work2Detail from "./pages/Work2Detail"
import Work3Detail from "./pages/Work3Detail"
import AboutPage from "./pages/AboutPage"
import PlaygroundPage from "./pages/PlaygroundPage"
import ExpertisePage from "./pages/ExpertisePage"
import ImprintPage from "./pages/ImprintPage"

// Import transition context
import { TransitionProvider } from "./contexts/TransitionContext"

import "./index.css"

export default function App() {
  return (
    <TransitionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work1" element={<Work1Detail />} />
          <Route path="/work2" element={<Work2Detail />} />
          <Route path="/work3" element={<Work3Detail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/imprint" element={<ImprintPage />} />
        </Routes>
      </Router>
    </TransitionProvider>
  )
}
