import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Loading from "../components/ui/Loading";
import Layout from "../components/layout/Layout";
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
import { useNotification } from "../components/hooks/useNotification";
import HomeWrapper from "../components/wrappers/HomeWrapper";
import AdminWrapper from "../components/wrappers/AdminWrapper";
import useUser from "../components/hooks/useUser";
import TopWrapper from "../components/wrappers/TopWrapper";
import { PostManagerProvider } from "../context/PostMenagerContext";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout content={<Outlet />} />}>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/top" element={<TopWrapper />} />
          <Route path="/newest" element={<Newest />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<ProtectedRoute allowedPermissions={["admin"]} />}>
            <Route path="/admin" element={<AdminWrapper />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedPermissions={["write:posts", "delete:posts"]}
              />
            }
          >
            <Route
              path="/post/menager"
              element={
                <PostManagerProvider>
                  <PostMenager />
                </PostManagerProvider>
              }
            />
          </Route>

          <Route path="/post/:id" element={<PostWrapper />} />
          <Route path="/author/:id" element={<AuthorWrapper />} />
          <Route path="/search/:term" element={<Search />} />
          <Route path="*" exact element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ allowedPermissions }) {
  const { user } = useUser();
  const { isLoading, isAuthenticated } = useAuth0();
  const location = useNavigate();
  const notification = useNotification();

  if (isLoading || !user) {
    return null;
  }

  if (!isAuthenticated) {
    location("/", { replace: true });
  }

  if (user?.permissions?.find((role) => allowedPermissions?.includes(role))) {
    return <Outlet />;
  }

  location("/", { replace: true });
}
