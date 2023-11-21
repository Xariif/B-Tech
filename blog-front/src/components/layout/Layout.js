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
	Slide,
	Snackbar,
	Stack,
} from "@mui/material";
import NavBar from "./NavBar/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export function Layout(props) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<NavBar />

			<Container maxWidth="lg">
				<Box sx={{ my: 2, p: 0 }}>{props.content}</Box>
			</Container>

			<Footer />
		</ThemeProvider>
	);
}
