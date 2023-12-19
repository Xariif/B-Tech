import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Paper,
  styled,
} from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base";
import Category from "./Category";

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  z-index: 1;
  `,
);

export default function PostSmallImg({ post, isAuthor = false }) {
  return (
    <Paper style={{ borderRadius: "1rem", overflow: "hidden" }}>
      <Link
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        to={{
          pathname: `/post/${post.id}`,
        }}
      >
        <img
          src={post.image}
          alt="zdjęcie"
          style={{
            objectFit: "cover",
            verticalAlign: "top",
            height: "280px",
            width: "100%",
          }}
        />
      </Link>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ margin: "1rem" }}>
          <Category category={post.category} />

          <Link
            to={{
              pathname: `/post/${post.id}`,
            }}
            style={{
              fontWeight: "bolder",
              fontSize: "1.5rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {post.title}
          </Link>
        </div>
        <div style={{ marginRight: "1.5rem" }}>
          <Dropdown>
            <MenuButton>My account</MenuButton>
            <Menu slots={{ listbox: Listbox }}>
              <MenuItem>Log out</MenuItem>
              <MenuItem>Log coś</MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </div>
    </Paper>
  );
}
