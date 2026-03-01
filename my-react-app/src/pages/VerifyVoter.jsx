import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVoterById, verifyVoterFace, markVoterAsVoted } from "../api/voterApi";

function VerifyVoter() {
  const { voterId } = useParams();
  const [voter, setVoter] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVoter() {
      try {
        const data = await getVoterById(voterId);
        // Force display status to "No" for initial view
        setVoter({ ...data, has_voted: false });
      } catch (err) {
        console.error("Error fetching voter details", err);
      }
    }
    fetchVoter();
  }, [voterId]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsCameraActive(true);
        };
      }
    } catch (err) {
      console.error("Camera access denied or not available", err);
      alert("Please allow camera access to proceed.");
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || video.readyState !== 4) {
      alert("Camera not ready. Please open the camera first.");
      return;
    }

    // Set canvas dimensions to match video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    // Mirror the context so the saved image matches the mirrored preview
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to Blob asynchronously
    canvas.toBlob((blob) => {
      if (blob) {
        setCapturedImage(blob);
        alert("✅ Image captured successfully! Click Verify to proceed.");
      }
    }, "image/jpeg", 0.95);
  };

  const handleVerify = async () => {
    if (!capturedImage) {
      alert("Please capture an image first.");
      return;
    }
    try {
      const result = await verifyVoterFace(voterId, capturedImage);
      if (result.verified) {
        await markVoterAsVoted(voterId);
        setVoter((prev) => ({ ...prev, has_voted: true }));
        alert("Verification Successful!");
        setTimeout(() => navigate("/search"), 2500);
      } else {
        alert("Verification failed. Face does not match.");
      }
    } catch (err) {
      console.error("Error during verification", err);
    }
  };

  if (!voter) return (
    <div className="min-h-screen bg-[#DDECF9] flex items-center justify-center font-bold text-[#1D3557]">
      Loading records...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#DDECF9] p-4 md:p-12 font-serif">
      
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-10 bg-[#1D3557] rounded-lg p-5 shadow-lg flex items-center gap-4">
        <div className="w-1.5 h-10 bg-[#3482F6] rounded-full ml-4"></div>
        <h1 className="text-3xl font-bold text-white tracking-wide">Voter Verification</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Card: Voter Profile */}
        <div className="bg-white rounded-[3rem] shadow-xl p-10 relative overflow-hidden text-black">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#3482F6] rounded-full"></div>
              <h2 className="text-2xl font-bold">Voter Profile</h2>
            </div>
            <img 
              src={voter.photo_url || "https://via.placeholder.com/100"} 
              alt="Profile" 
              className="w-24 h-24 rounded-2xl object-cover border-4 border-[#DDECF9] shadow-md"
            />
          </div>

          <div className="space-y-2 text-lg">
            <p><span className="font-bold">ID:</span> {voter.voter_id}</p>
            <p><span className="font-bold text-[#3482F6]">Name:</span> {voter.name}</p>
            <p><span className="font-bold">Father's Name:</span> {voter.father_name || "Biji Chandran"}</p>
            <p><span className="font-bold">Spouse Name:</span> {voter.spouse_name || "N/A"}</p>
            <p><span className="font-bold">Gender:</span> {voter.gender}</p>
            <p><span className="font-bold text-sm md:text-lg">Address:</span> {voter.address}</p>
            <p><span className="font-bold">Booth ID:</span> {voter.booth_id}</p>
            <p><span className="font-bold">Aadhaar ID:</span> {voter.aadhaar_id}</p>
            
            {/* Logic: "Has Voted" is Black, "No" is Red */}
            <p>
              <span className="font-bold text-black">Has Voted: </span>
              <span className={`${voter.has_voted ? 'text-green-600' : 'text-red-600'} font-bold ml-1`}>
                {voter.has_voted ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>

        {/* Right Card: Face Verification */}
        <div className="bg-white rounded-[3rem] shadow-xl p-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 self-start text-[#1D3557]">Face Verification</h2>

          {/* Camera Viewport */}
          <div className="w-full aspect-video bg-black rounded-3xl mb-8 border-[6px] border-[#3482F6] relative overflow-hidden flex items-center justify-center shadow-inner">
             <video 
               ref={videoRef} 
               className="w-full h-full object-cover scale-x-[-1]"
               playsInline
             ></video>
             <canvas ref={canvasRef} className="hidden"></canvas>
             
             {/* Circular UI Reticle */}
             <div className="absolute w-32 h-32 border-2 border-white/30 rounded-full flex items-center justify-center pointer-events-none">
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
             </div>
          </div>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={startCamera} 
                className="py-3 bg-[#E1F0FF] text-[#3482F6] border-2 border-[#3482F6] rounded-xl font-bold hover:bg-[#3482F6] hover:text-white transition-all"
              >
                Open Camera
              </button>
              <button 
                onClick={captureImage} 
                className="py-3 bg-[#CFE2F3] text-[#1D3557] rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Capture Image
              </button>
            </div>
            
            <button 
              onClick={handleVerify} 
              className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all active:scale-95 ${capturedImage ? 'bg-[#0081D5] text-white hover:bg-[#005FA3]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyVoter;