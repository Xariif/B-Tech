import { createTheme, responsiveFontSizes } from "@mui/material";
import { orange, red, grey, lime } from "@mui/material/colors";
export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: lime[900],
		},
		secondary: {
			main: "#15c630",
		},
	},
});

export default responsiveFontSizes(theme);
