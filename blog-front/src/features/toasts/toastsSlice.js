import { CREATE_TOAST, HIDE_TOAST } from "./toastsActions";

const initialState = {
	toasts: [],
	autoHideDuration: 5000,
	anchorOrigin: { vertical: "bottom", horizontal: "center" },
};

export default function toastReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_TOAST:
			return {
				...state,
				toasts: [...state.toasts, action.payload],
			};
		case HIDE_TOAST:
			return {
				...state,
				toasts: state.toasts.slice(1),
			};

		default:
			return state;
	}
}
