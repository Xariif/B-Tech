import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonBase,
  ButtonGroup,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
} from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import { Dropdown } from "@mui/base/Dropdown";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Category from "./Category";

export default function PostSmallImg({ post }) {
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
        {post.image ? (
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
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "280px",
              width: "100%",
              backgroundColor: grey[400],
            }}
          >
            <EditIcon style={{ fontSize: "5rem" }} />
          </div>
        )}
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0.5rem",
        }}
      >
        <div>
          {post.category && <Category category={post.category} />}

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
            <p>{post.title}</p>
          </Link>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </Paper>
  );
}
