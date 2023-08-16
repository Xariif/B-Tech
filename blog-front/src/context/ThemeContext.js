import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";
import PrimeReact, { PrimeReactContext } from "primereact/api";

export const ThemeContext = createContext();

function ThemeProvider(props) {
	const [darkMode, setDarkMode] = useState(false);
	const [theme, setTheme] = useLocalStorage("theme");

	const [currentTheme, setCurrentTheme] = useState("");
	const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

	const themes = [
		"lara-light-blue",
		"lara-dark-blue",
		"arya-blue",
		"arya-green",
		"arya-orange",
		"arya-purple",
		"lara-dark-teal",
		"nano",
		"nova",
		"rhea",
	];
	useEffect(() => {
		if (theme) {
			setCurrentThemeIndex((prev) => themes.indexOf(theme));
			setCurrentTheme(theme);
		}
	}, []);

	useEffect(() => {
		document
			.getElementById("theme-link")
			.setAttribute("href", "/resources/themes/" + currentTheme + "/theme.css");
	}, [currentTheme]);

	useEffect(() => {
		setTheme(themes[currentThemeIndex]);
		setCurrentTheme(themes[currentThemeIndex]);
	}, [currentThemeIndex, currentTheme]);

	const toggleDarkMode = () => {
		setCurrentThemeIndex((prev) => {
			if (prev >= themes.length - 1) {
				return 0;
			} else {
				return prev + 1;
			}
		});
	};
	return (
		<ThemeContext.Provider value={toggleDarkMode}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
