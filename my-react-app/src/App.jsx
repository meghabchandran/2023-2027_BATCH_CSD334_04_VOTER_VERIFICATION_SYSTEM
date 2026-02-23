import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import VerifyVoter from "./pages/VerifyVoter";
import Result from "./pages/Result";
import About from "./pages/About";
import VoterProfile from "./pages/VoterProfile"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* App pages */}
        <Route path="/search" element={<Search />} />

        {/* ✅ NEW: Voter Profile Route */}
        <Route path="/voter/:voterId" element={<VoterProfile />} />

        <Route path="/verify/:voterId" element={<VerifyVoter />} />
        <Route path="/result" element={<Result />} />

        {/* About */}
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;