import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarDemo from './components/NavbarDemo'
import { CanvasRevealEffectDemo } from './components/CanvasRevealEffectDemo'
import { ServicesSection } from './components/ServicesSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full min-h-screen">
      <NavbarDemo />
      <div className="w-full">
        <ServicesSection />
      </div>
    </div>
  )
}

export default App
