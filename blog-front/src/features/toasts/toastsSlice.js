const initialState = {
	open: false,
	autoHideDuration: 6000,
	onClose: () => {},
	anchorOrigin: { vertical: "bottom", horizontal: "center" },
	message: "",
	color: "",
	severity: "",
	variant: "",
};

export default function toastReducer(state = initialState, action) {
	switch (action.type) {
		case "toasts/openToast":
			return {
				...state,
				open: true,
				message: action.payload.message,
				color: action.payload.color,
				severity: action.payload.severity,
				variant: action.payload.variant,
			};
		case "toasts/closeToast":
			return {
				...state,
				open: false,
			};

		default:
			return state;
	}
}
