export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";
export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";
export const UPDATE_POST = "UPDATE_POST";
export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";
export const DELETE_POST = "DELETE_POST";
export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";
export const GET_POST = "GET_POST";
export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILURE = "GET_POST_FAILURE";
export const CLEAR_POST = "CLEAR_POST";
export const CLEAR_POST_REQUEST = "CLEAR_POST_REQUEST";
export const CLEAR_POST_SUCCESS = "CLEAR_POST_SUCCESS";
export const CLEAR_POST_FAILURE = "CLEAR_POST_FAILURE";
export const GET_POSTS_BY_AUTHOR = "GET_POSTS_BY_AUTHOR";

const getPostsRequest = () => {
	return {
		type: GET_POSTS_REQUEST,
	};
};

const getPostsSuccess = (posts) => {
	return {
		type: GET_POSTS_SUCCESS,
		payload: posts,
	};
};

const getPostsFailure = (error) => {
	return {
		type: GET_POSTS_FAILURE,
		payload: error,
	};
};

export { getPostsRequest, getPostsSuccess, getPostsFailure };
