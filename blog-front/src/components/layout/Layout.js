import React, { useReducer } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Box,
  Card,
  Container,
  CssBaseline,
  Grid,
  Link,
  Slide,
  Snackbar,
  Stack,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import pageTheme from "../../theme";
import NavBar from "./NavBar/NavBar";

import Footer from "./Footer/Footer";
import useUser from "../hooks/useUser";

export default function Layout({ content }) {
  const user = useUser();
  return (
    <ThemeProvider theme={pageTheme}>
      <CssBaseline />

      <NavBar />

      <Container maxWidth="lg">
        <Box sx={{ my: 2, p: 0 }}>{content}</Box>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}
