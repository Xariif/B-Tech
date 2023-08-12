import React from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import NotFound from "./components/pages/NotFound";
import Top from "./components/pages/Top";
import Home from "./components/pages/Home";
import Newest from "./components/pages/Najnowsze";
import Contact from "./components/pages/Kontakt";
import AuthorWrapper from "./components/pages/AuthorWrapper";
import PostWrapper from "./components/pages/PostWrapper";

import { ThemeContext } from "./context/ThemeContext";
function App() {
	return (
		<>
			<ThemeContext.Provider value={false}>
				<Routes>
					<Route path="/" element={<Layout content={<Outlet />} />}>
						<Route path="/" element={<Home />} />
						<Route path="/top" element={<Top />} />
						<Route path="/newest" element={<Newest />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/post/:id" element={<PostWrapper />} />
						<Route path="/author/:id" element={<AuthorWrapper />} />
						<Route path="*" exact={true} element={<NotFound />} />
					</Route>
				</Routes>
			</ThemeContext.Provider>
		</>
	);
}

export default App;
