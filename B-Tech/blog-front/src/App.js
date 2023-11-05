import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import NotFound from "./components/pages/NotFound";
import Top from "./components/pages/Top";
import Home from "./components/pages//Home";
import Newest from "./components/pages/Newest";
import Contact from "./components/pages/Contact";

import PostWrapper from "./components/wrappers/PostWrapper";
import AuthorWrapper from "./components/wrappers/AuthorWrapper";
import Search from "./components/pages/Search";
import SmallScreen from "./components/ui/SmallScreen";

function App() {
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 800);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (isSmallScreen) {
		return <SmallScreen />;
	} else {
		return (
			<>
				<Routes>
					<Route path="/" element={<Layout content={<Outlet />} />}>
						<Route path="/" element={<Home />} />
						<Route path="/top" element={<Top />} />
						<Route path="/newest" element={<Newest />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/post/:id" element={<PostWrapper />} />
						<Route path="/author/:id" element={<AuthorWrapper />} />
						<Route path="/search/:term" element={<Search />} />
						<Route path="*" exact={true} element={<NotFound />} />
					</Route>
				</Routes>
			</>
		);
	}
}

export default App;
