import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import PostSmallImg from "../ui/PostSmallImg";

function Author({ authorData, posts }) {
  return (
    <>
      <Box>
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "space-between",
            justifyItems: "center",
          }}
        >
          <Box sx={{ m: 1 }}>
            <Stack direction="row" spacing={2}>
              {authorData.authorAvatar ? (
                <Avatar
                  src={authorData.authorAvatar}
                  sx={{
                    width: 120,
                    height: 120,
                    fontWeight: "bold",
                  }}
                />
              ) : (
                <Avatar>
                  {authorData.authorName[0]}
                  {authorData.authorSurname[0]}
                </Avatar>
              )}

              <Typography
                variant="h4"
                display="flex"
                alignItems="center"
                fontWeight="bold"
              >
                {authorData.name} {authorData.surname}
              </Typography>
            </Stack>
          </Box>
          <Typography variant="subtitle1">
            Active from{" "}
            {new Date(authorData.activeFrom).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </div>
        <Typography
          sx={{
            textAlign: "justify",
          }}
        >
          {authorData.description}
        </Typography>
        <br />
        <div style={{ display: "flex", justifyContent: "right" }}>
          {authorData.socialMedia.facebook && (
            <Link
              to={authorData.socialMedia.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/48/000000/facebook-new.png"
                alt="facebook"
                style={{ marginRight: "1rem" }}
              />
            </Link>
          )}
          {authorData.socialMedia.twitter && (
            <Link
              to={authorData.socialMedia.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/48/000000/twitter.png"
                alt="twitter"
                style={{ marginRight: "1rem" }}
              />
            </Link>
          )}
          {authorData.socialMedia.instagram && (
            <Link
              to={authorData.socialMedia.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://img.icons8.com/fluent/48/000000/instagram-new.png"
                alt="instagram"
                style={{ marginRight: "1rem" }}
              />
            </Link>
          )}
        </div>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 4, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts?.map((post) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={post.id}>
                <PostSmallImg post={post} link />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}

export default Author;
