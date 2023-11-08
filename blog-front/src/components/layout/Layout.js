import React, { useReducer } from "react";
import Footer from "./Footer/Footer";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import theme from "../../theme";
import {
	Alert,
	Box,
	Card,
	Container,
	CssBaseline,
	Grid,
	Link,
	Snackbar,
	Stack,
} from "@mui/material";
import NavBar from "./NavBar/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import rootReducer from "../../reducer";
export function Layout(props) {
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<NavBar />
			<Container maxWidth="lg">
				<Paper sx={{ my: 2, p: 0 }}>{props.content}</Paper>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert
						onClose={handleClose}
						severity="success"
						sx={{ width: "100%" }}
					>
						This is a success message!
					</Alert>
				</Snackbar>
			</Container>

			<Footer />
		</ThemeProvider>
	);
}
