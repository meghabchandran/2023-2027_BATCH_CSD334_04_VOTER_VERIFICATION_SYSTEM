import { Link } from "react-router-dom";
import homeImage from "../mocks/image/login.jpg";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#B9D6F2]/20">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#061A40] text-white px-8 py-4 flex justify-between items-center shadow-md">

        <h1 className="text-xl font-semibold tracking-wide">
          Smart Digital Vote
        </h1>

        <div className="space-x-6 text-sm font-medium">

          <Link
            to="/login"
            className="hover:text-[#B9D6F2] transition"
          >
            Login
          </Link>

          <Link
            to="/search"
            className="hover:text-[#B9D6F2] transition"
          >
            Search
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-[#B9D6F2] transition"
          >
            Dashboard
          </Link>

          {/* Opens in New Tab */}
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B9D6F2] transition"
          >
            About
          </a>

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


      {/* ================= HERO SECTION ================= */}
      <div className="flex-1 grid md:grid-cols-2">

        {/* LEFT SIDE IMAGE PANEL */}
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

            <p className="mt-6 text-gray-200 text-sm leading-relaxed">
              A secure and transparent digital voting platform designed
              to prevent duplicate voting and ensure electoral integrity
              through real-time authentication.
            </p>

          </div>
        </div>


        {/* RIGHT SIDE CARD */}
        <div className="flex items-center justify-center p-8">

          <div className="
            w-full
            max-w-md
            bg-white
            rounded-2xl
            border border-[#006DAA]/30
            shadow-sm
            p-8
            hover:bg-[#eef4fb]
            hover:shadow-md
            transition-all duration-300
          ">

            {/* Accent Header */}
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-[#0353A4] rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-[#061A40]">
                Welcome
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Access the Smart Digital Voting platform to manage booth
              operations, verify voter records, and maintain secure
              election procedures.
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

    </div>
  );
}

export default Home;