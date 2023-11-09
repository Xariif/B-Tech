export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

const getUserRequest = () => {
	return {
		type: GET_USER_REQUEST,
	};
};

const getUserSuccess = (user) => {
	return {
		type: GET_USER_SUCCESS,
		payload: user,
	};
};

const getUserFailure = (error) => {
	return {
		type: GET_USER_FAILURE,
		payload: error,
	};
};
