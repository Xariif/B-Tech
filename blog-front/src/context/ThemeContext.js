import { createContext } from "react";
import useLocalStorage from "../components/hooks/useLocalStorage";

export const ThemeContext = createContext();

function ThemeProvider(props) {
	const [darkMode, setDarkMode] = useLocalStorage("darkMode");

	const isDarkMode = Boolean(darkMode);

	console.log(darkMode);
	function toggleDarkMode() {
		setDarkMode((prevDarkMode) => {
			if (prevDarkMode === undefined) {
				return true;
			} else return undefined;
		});

		PrimeReact.changeTheme(
			isDarkMode ? "lara-light-blue" : "lara-dark-blue",
			isDarkMode ? "lara-dark-blue" : "lara-light-blue",
			"theme-link",
			() => {}
		);
	}

	return (
		<ThemeContext.Provider value={toggleDarkMode}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export default ThemeProvider;
