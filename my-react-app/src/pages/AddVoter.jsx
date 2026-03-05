import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function AddVoter() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [eligible, setEligible] = useState(true);

  const [form, setForm] = useState({
    voter_id: "",
    name: "",
    age: "",
    fathers_name: "",
    spouse_name: "",
    gender: "",
    address: "",
    dob: "",
    booth_id: "",
    aadhaar_id: "",
    file: null,
  });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const code = Math.random().toString(36).substring(2, 8);
    setCaptcha(code);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setForm({ ...form, file: files[0] });
    } else if (name === "dob") {
      const today = new Date();
      const birthDate = new Date(value);

      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      setForm({
        ...form,
        dob: value,
        age: calculatedAge,
      });

      // Check eligibility instantly
      if (calculatedAge < 18) {
        setEligible(false);
      } else {
        setEligible(true);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eligible) return setMessage("Ineligible to vote (Must be 18+)");

    if (!agreed) return setMessage("Please confirm details.");

    if (userCaptcha !== captcha) return setMessage("Incorrect captcha.");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await fetch("http://127.0.0.1:8000/api/voters/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || data.detail);

      if (res.ok) {
        setTimeout(() => navigate("/add-details"), 1500);
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/home", { replace: true });
    }
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  const inputStyle =
    "w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#B9D6F2]/20 p-6">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-8 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#061A40]">Add Voter</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/add-details")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/50 backdrop-blur text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
            >
              ← Add Details
            </button>
            <button
              onClick={() => logout(navigate)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Voter ID */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Voter ID <span className="text-red-500">*</span>
            </label>
            <input
              name="voter_id"
              placeholder="e.g. V00123456"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="As per official records"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* DOB + Age side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                required
                className={inputStyle}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Age</label>
              <input
                name="age"
                value={form.age}
                readOnly
                placeholder="Auto calculated"
                className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
              />
            </div>
          </div>

          {!eligible && (
            <p className="text-red-500 text-xs">❌ Voter must be 18 or older</p>
          )}

          {/* Father's Name */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Father's Name <span className="text-red-500">*</span>
            </label>
            <input
              name="fathers_name"
              placeholder="Father's full name"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Spouse */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Spouse Name <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              name="spouse_name"
              placeholder="Leave blank if not applicable"
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              onChange={handleChange}
              required
              className={inputStyle}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              name="address"
              placeholder="Full residential address"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Booth ID */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Booth ID <span className="text-red-500">*</span>
            </label>
            <input
              name="booth_id"
              placeholder="Assigned booth ID"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Aadhaar */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Aadhaar ID <span className="text-red-500">*</span>
            </label>
            <input
              name="aadhaar_id"
              placeholder="12-digit Aadhaar number"
              pattern="\d{12}"
              title="Aadhaar must be 12 digits"
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Voter Photo <span className="text-red-500">*</span>
            </label>
            <label
              htmlFor="photo-upload"
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition text-[#0353A4] font-medium text-xs">
                Choose Photo
              </span>
              <span className="text-gray-400 text-xs">
                {form.file ? form.file.name : "No file chosen"}
              </span>
            </label>
            <input
              id="photo-upload"
              type="file"
              name="file"
              onChange={handleChange}
              required
              className="hidden"
            />
          </div>

          {/* Confirm checkbox */}
          <label className="flex items-center gap-2 text-sm text-[#061A40] cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-[#0353A4]"
            />
            All details are correct and verified
          </label>

          {/* Captcha */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">
              Enter the captcha to confirm submission
            </p>
            <p className="font-mono font-bold text-[#0353A4] tracking-widest text-lg mb-2">
              {captcha}
            </p>
            <input
              placeholder="Type captcha here"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              required
              className={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={!eligible}
            className={`w-full mt-2 py-2.5 rounded-lg font-medium transition ${
              eligible
                ? "bg-[#0353A4] hover:bg-[#003559] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Voter Details
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-2 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddVoter;
