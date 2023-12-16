import {
	BrowserRouter,
	Outlet,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Loading from "../components/ui/Loading";
import { Layout } from "../components/layout/Layout";
import Home from "../components/pages/Home";
import Top from "../components/pages/Top";
import Contact from "../components/pages/Contact";
import Unauthorized from "../components/pages/Unathorized";
import Admin from "../components/pages/Admin";
import PostMenager from "../components/pages/PostMenager/PostMenager";
import PostWrapper from "../components/wrappers/PostWrapper";
import AuthorWrapper from "../components/wrappers/AuthorWrapper";
import Search from "../components/pages/Search";
import NotFound from "../components/pages/NotFound";
import Newest from "../components/pages/Newest";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../components/hooks/useUser";
import { useNotification } from "../components/hooks/useNotification";
import HomeWrapper from "../components/wrappers/HomeWrapper";
import { useEffect } from "react";

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout content={<Outlet />} />}>
					<Route path="/" element={<HomeWrapper />} />
					<Route path="/top" element={<Top />} />
					<Route path="/newest" element={<Newest />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route element={<ProtectedRoute allowedPermissions={["admin"]} />}>
						<Route path="/admin" element={<Admin />} />
					</Route>
					<Route
						element={
							<ProtectedRoute
								allowedPermissions={["write:posts", "delete:posts"]}
							/>
						}
					>
						<Route path="/post/menager" element={<PostMenager />} />
					</Route>

					<Route path="/post/:id" element={<PostWrapper />} />
					<Route path="/author/:id" element={<AuthorWrapper />} />
					<Route path="/search/:term" element={<Search />} />
					<Route path="*" exact={true} element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

const ProtectedRoute = ({ allowedPermissions }) => {
	const { user, isLoading } = useUser();
	const location = useLocation();
	const notification = useNotification();

	if (isLoading || !user) {
		return null;
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
