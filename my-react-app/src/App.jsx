import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Imports
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
    <BrowserRouter>
      <Routes>
        {/* 1. Root Route: This fixes the blank page issue */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* 2. Standard Routes */}
        <Route path="/home" element={<Home />} />
        
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

        {/* 3. Catch-all Route: Shows if a user types a wrong URL */}
        <Route path="*" element={
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;