import { Alert, Snackbar } from "@mui/material";

const Toast = ({ state, hideToast }) => {
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		} else {
			hideToast();
		}
	};

	return (
		<>
			<Snackbar
				open={state.toast?.show}
				onClose={handleClose}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity={state.toast?.severity}
					sx={{ width: "100%" }}
				>
					{state.toast?.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Toast;
