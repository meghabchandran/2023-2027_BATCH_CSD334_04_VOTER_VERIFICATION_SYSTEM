import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Verify from "./pages/Verify"
import Result from "./pages/Result"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
