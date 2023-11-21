import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ state, setLoader }) => {
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={state.loader?.show}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loader;
