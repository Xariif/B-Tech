import React from "react";
import Footer from "./Footer/Footer";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import theme from "../../theme";
import {
	Box,
	Card,
	Container,
	CssBaseline,
	Grid,
	Link,
	Stack,
} from "@mui/material";
import NavBar from "./NavBar/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const StyledFooter = styled(Footer)(({ theme }) => ({
	position: "fixed",
	bottom: 0,
	marginTop: "auto",
}));

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});
export function Layout(props) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<NavBar />
			<Paper sx={{ width: "1200px", margin: "auto" }}>
				<Stack direction="column" spacing={2} margin={"auto"}>
					{props.content}
				</Stack>
			</Paper>
			<Footer />
		</ThemeProvider>
	);
}
