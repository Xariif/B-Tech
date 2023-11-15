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
import { Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorage from "./components/hooks/useLocalStorage";
import { useUser } from "./components/hooks/useUser";
import Admin from "./components/pages/Admin";
import Loading from "./components/ui/Loading";
import PostMenager from "./components/pages/PostMenager/PostMenager";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout content={<Outlet />} />}>
				<Route path="/" element={<Home />} />
				<Route path="/top" element={<Top />} />
				<Route path="/newest" element={<Newest />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route element={<ProtectedRoute allowedPermissions={["admin"]} />}>
					<Route path="/admin" element={<Admin />} />
				</Route>
				<Route
					element={<ProtectedRoute allowedPermissions={["author", "admin"]} />}
				>
					<Route path="/post/menager" element={<PostMenager />} />
				</Route>

				<Route path="/post/:id" element={<PostWrapper />} />
				<Route path="/author/:id" element={<AuthorWrapper />} />
				<Route path="/search/:term" element={<Search />} />
				<Route path="*" exact={true} element={<NotFound />} />
			</Route>
		</Routes>
	);
}

const ProtectedRoute = ({ allowedPermissions }) => {
	const { user, isLoading } = useUser();
	const { isAuthenticated } = useAuth0();
	const location = useLocation();
	console.log(user);
	if (isLoading) {
		return <Loading />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	if (user?.permissions?.find((role) => allowedPermissions?.includes(role))) {
		return <Outlet />;
	} else {
		return <Navigate to="/unauthorized" state={{ from: location }} replace />;
	}
};

export default App;
