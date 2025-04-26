import { useState } from "react"
import Navbar from "./components/Navbar"

function App() {
  const [darkmode, setDarkmode] = useState(true);

  return (
    <div>
      <Navbar darkmode={darkmode} setDarkmode={setDarkmode}/>
    </div>
  )
}

export default App
