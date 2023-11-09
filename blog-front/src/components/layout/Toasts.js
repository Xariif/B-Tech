import { Alert, Button, Slide, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createToast, hideToast } from "../../features/toasts/toastsActions";

function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}

const Toasts = () => {
	const toasts = useSelector((state) => state.toasts);
	const dispatch = useDispatch();

	const [open, setOpen] = useState(true);

	useEffect(() => {
		toasts.toasts.length > 0 ? setOpen(true) : setOpen(false);
	}, [toasts]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);

		setTimeout(() => {
			dispatch(hideToast());
		}, 500);
	};

	return (
		<>
			{toasts.toasts.length > 0 && (
				<Snackbar
					open={open}
					onClose={handleClose}
					autoHideDuration={toasts.autoHideDuration}
					TransitionComponent={SlideTransition}
					anchorOrigin={toasts.anchorOrigin}
				>
					<Alert
						onClose={handleClose}
						severity={toasts.toasts[0].severity}
						color={toasts.toasts[0].severity}
					>
						{toasts.toasts[0].message}
					</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default Toasts;
