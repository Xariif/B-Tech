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

export default function PostSmallImg({ post, options = null, link = false }) {
  const LinkOrDiv = link ? Link : "div";

  return (
    <Paper style={{ borderRadius: "1rem", overflow: "hidden" }}>
      <LinkOrDiv
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
      </LinkOrDiv>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0.5rem",
        }}
      >
        <div style={{ width: "100%" }}>
          {post.category && <Category category={post.category} />}

          <LinkOrDiv
            to={{
              pathname: `/post/${post.id}`,
            }}
            style={{
              fontWeight: "bolder",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <p
              style={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                minHeight: "2.5em", // Adjust this value based on your line-height
                maxHeight: "2.5em", // Adjust this value based on your line-height
                lineHeight: "1.25em", // Adjust this value based on your design
              }}
            >
              {post.title}
            </p>
          </LinkOrDiv>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {options}
        </div>
      </div>
    </Paper>
  );
}
