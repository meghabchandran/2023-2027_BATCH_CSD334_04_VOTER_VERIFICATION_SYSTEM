import { useState } from "react";
import { Link } from "react-router-dom";
import homeImage from "../mocks/image/login.jpg";

function Home() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#B9D6F2]/20">

      {/* ================= NAVBAR ================= */}
      <nav className="w-full bg-[#061A40] text-white px-8 py-4 flex justify-between items-center shadow-md">
        
        <h1 className="text-xl font-semibold tracking-wide">
          Smart Digital Vote
        </h1>

        <div className="space-x-6 text-sm font-medium">

          <Link to="/login" className="hover:text-[#B9D6F2] transition">
            Login
          </Link>

          <Link to="/search" className="hover:text-[#B9D6F2] transition">
            Search
          </Link>

          <Link to="/dashboard" className="hover:text-[#B9D6F2] transition">
            Dashboard
          </Link>

          <button
            onClick={() => setShowAbout(!showAbout)}
            className="hover:text-[#B9D6F2] transition"
          >
            About
          </button>

          <a
            href="https://support.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B9D6F2] transition"
          >
            Help
          </a>

        </div>
      </nav>

      {/* ================= MAIN SECTION ================= */}
      <div className="flex-1 grid md:grid-cols-2">

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex relative items-center justify-center bg-[#003559] text-white overflow-hidden">

          <img
            src={homeImage}
            alt="Smart Voting"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />

          <div className="absolute inset-0 bg-[#061A40]/70"></div>

          <div className="relative z-10 max-w-md px-12">
            <h1 className="text-4xl font-bold tracking-tight">
              Smart Voting System
            </h1>

            <p className="mt-4 text-[#B9D6F2] text-xl font-semibold">
              One Vote • One Person
            </p>

            <p className="mt-4 text-gray-200 text-sm leading-relaxed">
              A secure and transparent digital voting platform designed
              to ensure fairness, authenticity, and reliability in every election.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN SECTION */}
        <div className="flex items-center justify-center p-6">

          <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-10 rounded-2xl shadow-xl">

            <h2 className="text-3xl font-semibold text-[#061A40]">
              Welcome to Smart Vote
            </h2>

            <p className="text-sm text-gray-600 mt-3">
              Ensuring democracy through secure digital verification.
            </p>

            <Link to="/login">
              <button
                className="
                w-full
                mt-8
                bg-[#0353A4]
                hover:bg-[#003559]
                text-white
                font-medium
                rounded-lg
                py-3
                transition
                "
              >
                Login to Continue
              </button>
            </Link>

          </div>
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      {showAbout && (
        <div className="bg-white p-8 shadow-inner border-t border-gray-300">
          <h2 className="text-2xl font-semibold text-[#061A40] mb-4">
            About Smart Digital Voting System
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm">
            The Smart Digital Voting System is designed to uphold the principle of 
            <strong> "One Vote • One Person"</strong>. It ensures that each registered 
            voter can cast their vote only once through secure authentication and 
            digital verification mechanisms.
          </p>

          <p className="mt-3 text-gray-700 text-sm leading-relaxed">
            The system enhances transparency, prevents duplication, and maintains 
            integrity in the electoral process using modern digital technologies.
          </p>
        </div>
      )}

    </div>
  );
}

export default Home;