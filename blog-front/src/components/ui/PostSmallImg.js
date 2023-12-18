import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Paper } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Category from "./Category";

export default function PostSmallImg({ post }) {
  console.log(post);
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
        <div style={{ padding: "1.5rem" }}>
          <Category category={post.category} />

          <Link
            to={`post/${post.id}`}
            style={{
              fontWeight: "bolder",
              fontSize: "1.5rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {post.title}
          </Link>

          <Link
            style={{
              display: "flex",
              textDecoration: "none",
              color: "inherit",
              alignItems: "center",
            }}
            to={{
              pathname: `/author/${post.authorId}`,
            }}
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 28,
                height: 28,
                fontSize: ".8rem",
                fontWeight: "bold",
                marginRight: ".5rem",
              }}
            >
              {post.authorName[0]}
            </Avatar>
            <div>
              <div style={{ fontSize: ".8rem", fontWeight: "bolder" }}>
                {post.authorName}
                {post.authorSurname}
                &nbsp;
              </div>

              <div style={{ fontSize: ".7rem", fontWeight: "lighter" }}>
                {new Date(post.createdAt).toLocaleDateString("en-EN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </Link>
        </div>
      </Link>
    </Paper>
  );
}
