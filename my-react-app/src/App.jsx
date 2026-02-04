import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import VoterProfile from "./pages/VoterProfile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/voter-profile" element={<VoterProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
