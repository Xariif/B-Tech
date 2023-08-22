import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";
import PrimeReact, { PrimeReactContext } from "primereact/api";

export const ThemeContext = createContext();

function ThemeProvider(props) {
	const [darkMode, setDarkMode] = useState(false);
	const [themeStorage, setThemeStorage] = useLocalStorage("theme");

	const [currentTheme, setCurrentTheme] = useState("");
	const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

	const themes = ["light-blue", "dark-blue"];
	useEffect(() => {
		if (themeStorage) {
			setCurrentThemeIndex((prev) => themes.indexOf(themeStorage));
			setCurrentTheme(themeStorage);
		}
	}, []);

	useEffect(() => {
		document
			.getElementById("theme-link")
			.setAttribute("href", "/resources/themes/" + currentTheme + "/theme.css");
	}, [currentTheme]);

	const nextTheme = () => {
		const newIndex =
			currentThemeIndex >= themes.length - 1 ? 0 : currentThemeIndex + 1;

		setCurrentThemeIndex(newIndex);

		setCurrentTheme(themes[newIndex]);
		setThemeStorage(themes[newIndex]);
	};
	return (
		<ThemeContext.Provider value={nextTheme}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
