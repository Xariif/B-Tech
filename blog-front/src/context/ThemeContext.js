import {
  createContext, useContext, useEffect, useState,
} from 'react';
import PrimeReact, { PrimeReactContext } from 'primereact/api';
import useLocalStorage from '../components/hooks/useLocalStorage';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [themeStorage, setThemeStorage] = useLocalStorage('theme');

  const [currentTheme, setCurrentTheme] = useState('light-blue');
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const themes = ['light-blue', 'dark-blue'];
  useEffect(() => {
    if (themeStorage) {
      setCurrentThemeIndex((prev) => themes.indexOf(themeStorage));
      setCurrentTheme(themeStorage);
    }
  }, []);

  useEffect(() => {
    document
      .getElementById('theme-link')
      .setAttribute('href', `/resources/themes/${currentTheme}/theme.css`);
  }, [currentTheme]);

  const nextTheme = () => {
    const newIndex =			currentThemeIndex >= themes.length - 1 ? 0 : currentThemeIndex + 1;

    setCurrentThemeIndex(newIndex);

    setCurrentTheme(themes[newIndex]);
    setThemeStorage(themes[newIndex]);
  };
  return (
    <ThemeContext.Provider value={nextTheme}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
