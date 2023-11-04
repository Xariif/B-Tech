import axios from "axios";
// import { apiConfig } from "src/config";
const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});
export default axiosInstance;
