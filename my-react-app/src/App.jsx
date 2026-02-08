import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Verify from "./pages/Verify";
import Result from "./pages/Result";
// import Login from "./pages/Login"; //i need to delete it
// import Dashboard from "./pages/Dashboard"; //i need to delete it

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/result" element={<Result />} />
        {/* <Route path="/login" element={<Login />} /> //need to delete it
        <Route path="/dashboard" element={<Dashboard />} /> //need to delete it */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
