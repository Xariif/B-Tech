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

	const toggleDarkMode = () => {
		const newIndex =
			currentThemeIndex >= themes.length - 1 ? 0 : currentThemeIndex + 1;

		setCurrentThemeIndex(newIndex);

		setCurrentTheme(themes[newIndex]);
		setTheme(themes[newIndex]);
	};
	return (
		<ThemeContext.Provider value={toggleDarkMode}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
