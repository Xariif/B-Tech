import { Copyright, Facebook, Instagram, Twitter } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  CssBaseline,
  Paper,
  Stack,
  SvgIcon,
  Typography,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { React } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const StyledIcon = styled(SvgIcon)(({ theme }) => ({
    "&:hover": {
      color: theme.palette.primary.main,
      cursor: "pointer",
    },
  }));

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="body2"
            justifyContent="center"
            display="flex"
            alignItems="center"
            sx={{
              opacity: "0.7",
            }}
          >
            B-TECH {new Date().getFullYear()} &nbsp;
            <Copyright fontSize="h1" />
          </Typography>
          <Stack direction="row" gap={1}>
            <StyledIcon>
              <TwitterIcon />
            </StyledIcon>
            <StyledIcon>
              <FacebookIcon />
            </StyledIcon>
            <StyledIcon>
              <InstagramIcon />
            </StyledIcon>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              opacity: "0.7",
            }}
          >
            Author: Jakub Filiks{" "}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
