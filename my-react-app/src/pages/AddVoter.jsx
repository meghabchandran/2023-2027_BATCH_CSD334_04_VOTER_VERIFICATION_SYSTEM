import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddVoter() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");

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
    has_voted: false,
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
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox")
      setForm({ ...form, [name]: checked });
    else if (type === "file")
      setForm({ ...form, file: files[0] });
    else
      setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) return setMessage("Please confirm details.");
    if (userCaptcha !== captcha) return setMessage("Incorrect captcha.");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    const res = await fetch("http://127.0.0.1:8000/api/voters/add", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message || data.detail);

    if (res.ok) {
      setTimeout(() => navigate("/add-details"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#B9D6F2]/20 p-6">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-8 rounded-2xl shadow-xl">

        {/* Header row with title and back button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#061A40]">
            Add Voter
          </h2>
          <button
            type="button"
            onClick={() => navigate("/add-details")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/50 backdrop-blur text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0353A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Details
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          {Object.keys(form).map((key) =>
            key !== "file" && key !== "has_voted" ? (
              <input
                key={key}
                name={key}
                placeholder={key.replace("_", " ").toUpperCase()}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
                required
              />
            ) : null
          )}

          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full text-sm"
            required
          />

          <label className="flex items-center gap-2 text-sm text-[#061A40]">
            <input type="checkbox" name="has_voted" onChange={handleChange} />
            Has Voted
          </label>

          <label className="flex items-center gap-2 text-sm text-[#061A40]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            All details are correct
          </label>

          <div className="mt-3">
            <p className="font-semibold text-[#061A40]">
              Captcha: {captcha}
            </p>

            <input
              placeholder="Enter Captcha"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#0353A4] hover:bg-[#003559] text-white py-2.5 rounded-lg transition"
          >
            Submit
          </button>

          {message && (
            <p className="text-center text-sm mt-2 text-[#061A40]">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddVoter;