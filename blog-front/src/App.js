import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import NotFound from "./components/pages/NotFound";
import Top from "./components/pages/Top";
import Home from "./components/pages//Home";
import Newest from "./components/pages/Newest";
import Contact from "./components/pages/Contact";
import Unauthorized from "./components/pages/Unathorized";
import PostWrapper from "./components/wrappers/PostWrapper";
import AuthorWrapper from "./components/wrappers/AuthorWrapper";
import Search from "./components/pages/Search";
import { useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorage from "./components/hooks/useLocalStorage";
import { useUser } from "./components/hooks/useUser";
import Admin from "./components/pages/Admin";
function App() {
	const [token, setToken] = useLocalStorage("token", null);

	return (
		<Routes>
			<Route path="/" element={<Layout content={<Outlet />} />}>
				<Route path="/" element={<Home />} />
				<Route path="/top" element={<Top />} />
				<Route path="/newest" element={<Newest />} />
				<Route path="/contact" element={<Contact />} />
				<Route
					path="/admin"
					element={
						<ProtectedRoute permissions={["admin"]}>
							<Admin />
						</ProtectedRoute>
					}
				></Route>

				<Route path="/post/:id" element={<PostWrapper />} />
				<Route path="/author/:id" element={<AuthorWrapper />} />
				<Route path="/search/:term" element={<Search />} />
				<Route path="*" exact={true} element={<NotFound />} />
			</Route>
		</Routes>
	);
}

const ProtectedRoute = ({ children, permissions }) => {
	const { user, isLoading } = useUser();
	const { isAuthenticated } = useAuth0();

	const navigate = useNavigate();

	if (isLoading || !isAuthenticated) return navigate("/");

	if (!user) return <Unauthorized />;

	if (permissions.some((permission) => user.permissions.includes(permission)))
		return children;
	else return <Unauthorized />;
};

export default App;
