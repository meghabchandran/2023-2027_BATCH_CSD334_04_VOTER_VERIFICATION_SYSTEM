import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import VerifyVoter from "./pages/VerifyVoter"; // updated page name
import Result from "./pages/Result";
import DataEntryLogin from "./pages/DataEntryLogin"; // new data entry login page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home as the default route */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/login-data-entry" element={<DataEntryLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* App pages */}
        <Route path="/search" element={<Search />} />
        <Route path="/verify/:voterId" element={<VerifyVoter />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
