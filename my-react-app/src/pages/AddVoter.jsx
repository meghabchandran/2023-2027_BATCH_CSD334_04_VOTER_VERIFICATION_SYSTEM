import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    } 
    else if (name === "dob") {
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
    } 
    else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eligible)
      return setMessage("Ineligible to vote (Must be 18+)");

    if (!agreed)
      return setMessage("Please confirm details.");

    if (userCaptcha !== captcha)
      return setMessage("Incorrect captcha.");

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

  const inputStyle =
    "w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#B9D6F2]/20 p-6">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-8 rounded-2xl shadow-xl">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#061A40]">
            Add Voter
          </h2>
          <button
            type="button"
            onClick={() => navigate("/add-details")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/50 backdrop-blur text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
          >
            Add Details
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="voter_id"
            placeholder="VOTER ID"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <input
            name="name"
            placeholder="NAME"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          {/* DOB Calendar */}
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          {/* Age Auto-filled */}
          <input
            name="age"
            value={form.age}
            readOnly
            placeholder="AGE (Auto Calculated)"
            className={`${inputStyle} bg-gray-100`}
          />

          {/* Ineligible Message */}
          {!eligible && (
            <p className="text-red-600 text-sm">
              Ineligible to vote (Must be 18+)
            </p>
          )}

          <input
            name="fathers_name"
            placeholder="FATHER'S NAME"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          {/* Optional Spouse */}
          <input
            name="spouse_name"
            placeholder="SPOUSE NAME (Optional)"
            onChange={handleChange}
            className={inputStyle}
          />

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

          <input
            name="address"
            placeholder="ADDRESS"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <input
            name="booth_id"
            placeholder="BOOTH ID"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <input
            name="aadhaar_id"
            placeholder="AADHAAR ID"
            pattern="\d{12}"
            title="Aadhaar must be 12 digits"
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <input
            type="file"
            name="file"
            onChange={handleChange}
            required
            className="w-full text-sm"
          />

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
              required
              className={`${inputStyle} mt-1`}
            />
          </div>

          <button
            type="submit"
            disabled={!eligible}
            className={`w-full mt-4 py-2.5 rounded-lg transition ${
              eligible
                ? "bg-[#0353A4] hover:bg-[#003559] text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
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