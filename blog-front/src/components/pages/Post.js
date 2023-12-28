import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { deepOrange } from "@mui/material/colors";
import Category from "../ui/Category";
import CommentSection from "../ui/CommentSection";
import { useNotification } from "../hooks/useNotification";
import useError from "../hooks/useError";
import useService from "../../services/posts/useService";
import PostBigImg from "../ui/PostBigImg";

export default function Post({ postData }) {
  if (postData === undefined || postData === null) return null;
  return (
    <div
      style={{
        backgroundColor: "var(--surface-card)",
        borderRadius: "var(--border-radius)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid grey",
          paddingBottom: ".5rem",
          marginBottom: ".5rem",
          width: "100%",
        }}
      >
        <Category category={postData?.category} />
        <div
          style={{
            fontWeight: "bolder",
            fontSize: "2rem",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {postData.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.2rem",
            alignItems: "center",
          }}
        >
          <Link
            style={{
              display: "flex",
              textDecoration: "none",
              color: "inherit",
            }}
            to={{
              pathname: `/author/${postData.authorId}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Stack direction="row" spacing={2}>
                {postData.authorAvatar ? (
                  <Avatar
                    src={postData.authorAvatar}
                    sx={{
                      width: 56,
                      height: 56,
                    }}
                  />
                ) : (
                  <Avatar>
                    {postData.authorName[0]}
                    {postData.authorSurname[0]}
                  </Avatar>
                )}
                <Typography
                  variant="h5"
                  display="flex"
                  alignItems="center"
                  fontWeight="bold"
                >
                  {`${postData.authorName} ${postData.authorSurname}`}
                </Typography>
              </Stack>
              &nbsp;
              <p style={{ marginLeft: "1rem" }}>
                {new Date(postData.createdAt).toLocaleDateString("en-EN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </p>
            </div>
          </Link>
          <p style={{ margin: "0", userSelect: "none" }}>
            Views: {postData.views}
          </p>
        </div>
      </div>
      <img
        src={postData.image}
        alt="zdjęcie"
        style={{
          objectFit: "cover",
          display: "block",
          borderRadius: "1.5rem",
          overflow: "hidden",
          lineHeight: "0",
          height: "480px",
          width: "110%",
        }}
      />
      <div
        style={{
          marginTop: "1rem",
          fontSize: "1.2rem",
          lineHeight: "1.5rem",
          whiteSpace: "pre-wrap",
          maxWidth: "calc(1180px )",

          textAlign: "justify",
        }}
      >
        {postData.content}
      </div>
    </div>
  );
}
