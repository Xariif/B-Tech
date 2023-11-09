//generate toast actions

const CREATE_TOAST = "CREATE_TOAST";
const HIDE_TOAST = "HIDE_TOAST";

export const createToast = (payload) => {
	return {
		type: CREATE_TOAST,
		payload: payload,
	};
};

export const hideToast = () => {
	return {
		type: HIDE_TOAST,
	};
};

export { CREATE_TOAST, HIDE_TOAST };
