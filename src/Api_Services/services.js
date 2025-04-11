import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendControlData = async (data, endpoint) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
