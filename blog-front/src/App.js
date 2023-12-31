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
import PostMenager from "./components/pages/PostMenager/PostMenager";
import AppRoutes from "./routes/AppRoutes";

function App() {
	return <AppRoutes />;
}

export default App;
