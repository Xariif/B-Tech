import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Category from "./Category";

export default function PostBigImg({ post }) {
  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: "var(--surface-card)",
        borderRadius: "var(--border-radius)",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid grey",
          paddingBottom: ".5rem",

          maxWidth: "calc(1180px - 10rem)",
          margin: "0 auto .5rem auto",
        }}
      >
        <Category category={post.category} />
        <Link
          to={`post/${post.id}`}
          style={{
            fontWeight: "bolder",
            fontSize: "2rem",
            textDecoration: "none",
            color: "inherit",
            marginTop: "2rem",
          }}
        >
          {post.title}
        </Link>

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
              pathname: `/author/${post.authorId}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Stack direction="row" spacing={2}>
                {post.authorAvatar ? (
                  <Avatar
                    src={post.authorAvatar}
                    sx={{
                      width: 56,
                      height: 56,
                      fontWeight: "bold",
                    }}
                  />
                ) : (
                  <Avatar>
                    {post.authorName[0]}
                    {post.authorSurname[0]}
                  </Avatar>
                )}
                <Typography
                  variant="h5"
                  display="flex"
                  alignItems="center"
                  fontWeight="bold"
                >
                  {`${post.authorName} ${post.authorSurname}`}
                </Typography>
              </Stack>

              <p style={{ marginLeft: "1rem" }}>
                {new Date(post.createdAt).toLocaleDateString("en-EN", {
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
            Views:
            {post.views}
          </p>
        </div>
      </div>

      <Link
        to={{
          pathname: `post/${post.id}`,
          state: { postData: post },
        }}
        style={{
          display: "block",
          borderRadius: "1.5rem",
          overflow: "hidden",
          lineHeight: "0",
        }}
      >
        {" "}
        <Box
          component="img"
          src={post.image}
          alt="zdjęcie"
          sx={{
            width: "100%",
            objectFit: "cover",

            maxHeight: {
              lg: 400,
              md: 300,
              sm: 200,
              xs: 100,
            },
          }}
        />
      </Link>
    </Container>
  );
}
