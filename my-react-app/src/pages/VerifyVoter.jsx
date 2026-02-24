import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVoterById, verifyVoterFace, markVoterAsVoted } from "../api/voterApi";

function VerifyVoter() {
  const { voterId } = useParams();
  const [voter, setVoter] = useState(null);
  const [message, setMessage] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVoter() {
      try {
        const data = await getVoterById(voterId);
        setVoter(data);
      } catch (err) {
        console.error("Error fetching voter details", err);
      }
    }
    fetchVoter();
  }, [voterId]);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => setCapturedImage(blob), "image/jpeg");
  };

  const handleVerify = async () => {
    if (!capturedImage) return;
    try {
      const result = await verifyVoterFace(voterId, capturedImage);
      if (result.verified) {
        setMessage("✅ Verified successfully!");
        await markVoterAsVoted(voterId);
        setVoter({ ...voter, has_voted: true });
        setTimeout(() => navigate("/search"), 2000);
      }
      // Red box logic removed as per request
    } catch (err) {
      console.error("Error verifying face", err);
    }
  };

  if (!voter) return (
    <div className="min-h-screen bg-[#B9D6F2]/30 flex items-center justify-center font-bold text-[#0353A4]">
      Loading records...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#B9D6F2]/30 p-4 md:p-8 font-sans text-[#061A40]">
      
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center gap-3">
        <div className="w-2 h-8 bg-[#0353A4] rounded-full"></div>
        <h1 className="text-3xl font-bold tracking-tight">Voter Verification</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Voter Profile Card */}
        <div className="bg-white rounded-2xl border border-[#006DAA]/30 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">Voter Profile</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <img src={voter.photo_url || "/default-avatar.png"} alt="Voter" className="w-20 h-20 rounded-lg object-cover border" />
               <p className="text-lg font-medium text-gray-500">Full Name: <span className="text-[#061A40] font-bold">{voter.name}</span></p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <p className="text-gray-500 font-medium">Voter ID: <span className="font-bold text-[#0353A4]">[{voter.voter_id}]</span></p>
              <p className="text-gray-500 font-medium">Aadhaar ID: <span className="font-bold">[{voter.aadhaar_id}]</span></p>
              <p className="text-gray-500 font-medium">Gender: <span className="font-bold">{voter.gender}</span></p>
              <p className="text-gray-500 font-medium">Booth ID: <span className="font-bold">{voter.booth_id}</span></p>
              
              <div className="flex gap-2 pt-2">
                <span className="px-4 py-2 bg-gray-100 rounded text-gray-400 font-bold">Age</span>
                <span className="px-4 py-2 bg-gray-50 border rounded font-bold">{voter.age}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Face Verification Card */}
        <div className="bg-white rounded-2xl border border-[#006DAA]/30 shadow-sm p-8 flex flex-col items-center">
          <div className="w-full mb-6">
            <h2 className="text-2xl font-bold">Face Verification</h2>
          </div>

          {/* Camera Viewport */}
          <div className="w-full aspect-video bg-[#061A40] rounded-xl mb-8 flex items-center justify-center border-4 border-[#B9D6F2] relative overflow-hidden shadow-[0_0_20px_rgba(3,83,164,0.2)]">
             <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]"></video>
             <canvas ref={canvasRef} className="hidden"></canvas>
             <div className="absolute w-16 h-16 border-2 border-white/30 rounded-full"></div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-4">
              <button onClick={startCamera} className="py-3 border-2 border-[#0353A4] text-[#0353A4] rounded-lg font-bold hover:bg-[#B9D6F2]/20 transition-all">
                Open Camera
              </button>
              <button onClick={captureImage} className="py-3 bg-[#B9D6F2] text-[#0353A4] rounded-lg font-bold hover:bg-[#0353A4] hover:text-white transition-all">
                Capture Image
              </button>
            </div>
            <button onClick={handleVerify} className="w-full bg-[#0353A4] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#003559] shadow-md transition-all">
              Verify
            </button>
          </div>

          {/* Verification Success message only (Red box removed) */}
          {message && (
            <div className="mt-6 w-full p-4 bg-green-100 text-green-700 rounded-xl text-center font-bold">
              {message}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default VerifyVoter;