import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Backend URL

// Fetch voter by ID
export const getVoterById = async (voterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/voters/${voterId}`);
    return response.data; // returns voter object
  } catch (error) {
    console.error("Error fetching voter:", error);
    throw error; // let frontend handle it
  }
};

// Verify voter face
export const verifyVoterFace = async (voterId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.post(
      `${BASE_URL}/api/voters/${voterId}/verify-face`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data; // { verified: true/false, message? }
  } catch (error) {
    console.error("Error verifying face:", error);
    throw error;
  }
};

// Mark voter as voted
export const markVoterAsVoted = async (voterId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/voters/${voterId}/vote`);
    return response.data; // { message: "Voter marked as voted" }
  } catch (error) {
    console.error("Error marking voted:", error);
    throw error;
  }
};
