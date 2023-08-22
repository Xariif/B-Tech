import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import NotFound from "./components/pages/NotFound";
import Top from "./components/pages/Top";
import Home from "./components/pages//Home";
import Newest from "./components/pages/Newest";
import Contact from "./components/pages/Contact";

import { PrimeReactContext } from "primereact/api";
import PostWrapper from "./components/wrappers/PostWrapper";
import AuthorWrapper from "./components/wrappers/AuthorWrapper";

function App() {
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
					<Route path="*" exact={true} element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
