import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const useAPI = () => {
	const axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_API_URL,
	});

	const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

	const getToken = async () => {
		if (!isLoading && isAuthenticated) {
			return await getAccessTokenSilently();
		} else {
			return null;
		}
	};

	const get = async (url) => {
		try {
			const token = await getToken();

			const response = await axiosInstance.get(url, {
				headers: { Authorization: "Bearer " + token },
			});
			if (response.status !== 200) {
				throw new Error(`Unexpected response status: ${response.status}`);
			}
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
	const getWithParams = async (url, params) => {
		try {
			const token = await getToken();
			const response = await axiosInstance.get(url, {
				headers: { Authorization: "Bearer " + token },
				params: params,
			});
			if (response.status !== 200) {
				throw new Error(`Unexpected response status: ${response.status}`);
			}
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const post = async (url, params) => {
		try {
			const token = await getToken();
			const response = await axiosInstance.post(url, {
				headers: { Authorization: "Bearer " + token },
				params: params,
			});
			if (response.status !== 200) {
				throw new Error(`Unexpected response status: ${response.status}`);
			}
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const put = (url, data) => {
		return axiosInstance.put(url, { data });
	};

	const patch = (url, data) => {
		return axiosInstance.patch(url, { data });
	};

	const del = (url, data) => {
		return axiosInstance.delete(url, { data });
	};

	return { get, post, put, patch, del, getWithParams };
};

export default useAPI;
