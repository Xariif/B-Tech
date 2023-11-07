import { createTheme, responsiveFontSizes } from "@mui/material";
import { orange, red, grey, lime } from "@mui/material/colors";
export const theme = createTheme({
	palette: {
		primary: {
			main: lime[900],
		},
		secondary: {
			main: "#15c630",
		},
		otherColor: {
			main: "#999",
		},
	},
});

export default responsiveFontSizes(theme);
