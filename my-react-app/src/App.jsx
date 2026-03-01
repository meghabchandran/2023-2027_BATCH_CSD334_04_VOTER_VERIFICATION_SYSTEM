import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import VerifyVoter from "./pages/VerifyVoter";
import Result from "./pages/Result";
import DataEntryLogin from "./pages/DataEntryLogin"; 

// Newly Added Pages
import AddDetails from "./pages/AddDetails";
import AddBooth from "./pages/AddBooth";
import AddVoter from "./pages/AddVoter";

function App() {
  return (
    /* Changed <Router> to <BrowserRouter> to match your import */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Booth Officer Flow */}
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify/:voterId" element={<VerifyVoter />} />
        <Route path="/result" element={<Result />} />

        {/* Data Entry Officer Flow */}
        <Route path="/login-data-entry" element={<DataEntryLogin />} />
        <Route path="/add-voter" element={<AddVoter />} />
        <Route path="/add-details" element={<AddDetails />} />
        <Route path="/add-booth" element={<AddBooth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;