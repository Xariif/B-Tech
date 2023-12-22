import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const useAPI = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  const getToken = () => {
    if (!isLoading && isAuthenticated) {
      return getAccessTokenSilently();
    }

    return null;
  };

  const get = async (url, params = null) => {
    const token = await getToken();

    const response = await axiosInstance
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .catch((error) => {
        throw error;
      });
    console.log(response);
    return response.data;
  };

  const post = async (url, data = null, params = null) => {
    const token = await getToken();
    const response = await axiosInstance
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        params,
      })
      .catch((error) => {
        throw error;
      });

    return response.data;
  };

  const put = async (url, data = null, params = null) => {
    const token = await getToken();
    const response = await axiosInstance
      .put(url, data, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .catch((error) => {
        throw error;
      });
    return response.data;
  };

  const patch = async (url, data = null, params = null) => {
    const token = await getToken();
    const response = await axiosInstance
      .patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .catch((error) => {
        throw error;
      });

    return response.data;
  };

  const del = async (url, data = null, params = null) => {
    const token = await getToken();
    const response = await axiosInstance
      .delete(url, data, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .catch((error) => {
        throw error;
      });
    return response.data;
  };

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};

export default useAPI;
