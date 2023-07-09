import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "./App.css";
import { Layout } from "./components/layout/Layout";
import NotFound from "./components/pages/NotFound";
import Top from "./components/pages/Top";
import Home from "./components/pages/Home";
import Najnowsze from "./components/pages/Najnowsze";
import Kontakt from "./components/pages/Kontakt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout content={<Outlet />} />}>
        <Route path="/" element={<Home />} />
        <Route path="/top" element={<Top />} />
        <Route path="/najnowsze" element={<Najnowsze />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Route>

      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  );
}

export default App;
