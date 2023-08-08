import React from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import NotFound from "./components/pages/NotFound";
import Top from "./components/pages/Top";
import Home from "./components/pages/Home";
import Najnowsze from "./components/pages/Najnowsze";
import Kontakt from "./components/pages/Kontakt";
import Author from "./components/pages/Author";
import AuthorWrapper from "./components/pages/AuthorWrapper";
import Post from "./components/pages/Post";
import PostWrapper from "./components/pages/PostWrapper";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout content={<Outlet />} />}>
				<Route path="/" element={<Home />} />
				<Route path="/top" element={<Top />} />
				<Route path="/najnowsze" element={<Najnowsze />} />
				<Route path="/kontakt" element={<Kontakt />} />
				<Route path="/post/:id" element={<PostWrapper />} />
				<Route path="/author/:id" element={<AuthorWrapper />} />
				<Route path="*" exact={true} element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
