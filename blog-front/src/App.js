import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/layout/Layout";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout content={<Outlet />} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;
