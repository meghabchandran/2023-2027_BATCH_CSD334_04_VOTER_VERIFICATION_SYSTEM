import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import VerifyVoter from "./pages/VerifyVoter";
import Result from "./pages/Result";
import DataEntryLogin from "./pages/DataEntryLogin"; // new data entry login page

// ✅ Newly Added Pages
import AddDetails from "./pages/AddDetails";
import AddBooth from "./pages/AddBooth";
import AddVoter from "./pages/AddVoter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/login-data-entry" element={<DataEntryLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Voter Flow */}
        <Route path="/search" element={<Search />} />
        <Route path="/verify/:voterId" element={<VerifyVoter />} />
        <Route path="/result" element={<Result />} />

        {/* ✅ Admin / Add Flow */}
        <Route path="/add-details" element={<AddDetails />} />
        <Route path="/add-booth" element={<AddBooth />} />
        <Route path="/add-voter" element={<AddVoter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;