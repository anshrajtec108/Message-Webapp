import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MessageDisplay from './components/messageDisplay/MessageDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MessageDisplay/>
    </>
  )
}

export default App