import { CompareSharp } from "@mui/icons-material";
import { Alert, CircularProgress, Paper, Snackbar } from "@mui/material";
import { createContext, useContext, useReducer, useState } from "react";
import Toast from "../components/notification/Toast";
import Loading from "../components/ui/Loading";
import Loader from "../components/notification/Loader";

const initialState = {
	toast: {
		show: false,
		message: "",
		severity: "success",
	},
	loader: {
		show: false,
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SHOW_TOAST":
			return {
				...state,
				toast: {
					show: true,
					message: action.payload.message,
					severity: action.payload.severity,
				},
			};
		case "HIDE_TOAST":
			return {
				...state,
				toast: {
					...state.toast,
					show: false,
				},
			};

		case "SET_LOADER":
			return {
				...state,
				loader: {
					show: action.payload.show,
				},
			};
		default:
			return state;
	}
};

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
	};

	const showToast = (message, severity) => {
		if (state.toast.show) {
			dispatch({
				type: "HIDE_TOAST",
			});
			setTimeout(() => {
				dispatch({
					type: "SHOW_TOAST",
					payload: {
						message,
						severity,
					},
				});
			}, 500);
		} else {
			dispatch({
				type: "SHOW_TOAST",
				payload: {
					message,
					severity,
				},
			});
		}
	};

	const hideToast = () => {
		dispatch({
			type: "HIDE_TOAST",
		});
	};

	const setLoader = (show) => {
		dispatch({
			type: "SET_LOADER",
			payload: {
				show,
			},
		});
	};

	return (
		<ToastContext.Provider value={{ state, showToast, hideToast, setLoader }}>
			<Toast state={state} hideToast={hideToast} />
			<Loader state={state} />
			{children}
		</ToastContext.Provider>
	);
};
