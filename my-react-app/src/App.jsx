import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home now handles both the Hero view and the About view internally */}
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* REMOVE: <Route path="/about" element={<About />} /> 
           Because About is now a part of Home.jsx
        */}
      </Routes>
    </Router>
  );
}

export default App;