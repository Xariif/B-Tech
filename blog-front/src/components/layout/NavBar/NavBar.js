import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  styled,
  alpha,
  Stack,
  SvgIcon,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import BoltIcon from "@mui/icons-material/Bolt";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { CribSharp, PowerSettingsNew } from "@mui/icons-material";
import { useState } from "react";
import useUser from "../../hooks/useUser";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledLink = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  color: "inherit",
  alignItems: "center",
}));

const StyledIcon = styled(SvgIcon)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

function NavBar() {
  const { isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <StyledToolBar variant="dense">
          <StyledLink
            underline="none"
            style={{ display: "flex" }}
            onClick={() => navigate("/", { replace: true })}
          >
            <BoltIcon fontSize="large" />
            <Typography variant="h6">B-TECH</Typography>
          </StyledLink>
          <SearchBar />
          <Stack direction="row" gap="1rem">
            <MenuBar />
          </Stack>
        </StyledToolBar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

function MenuBar({ user = null }) {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  return (
    <>
      {user && user.permissions.includes("admin") && (
        <StyledLink
          underline="none"
          onClick={() => navigate("./admin", { replace: true })}
        >
          Admin
        </StyledLink>
      )}
      {user && user.permissions.includes("write:posts") && (
        <StyledLink
          underline="none"
          onClick={() => navigate("./post/menager", { replace: true })}
        >
          Post Menager
        </StyledLink>
      )}

      <BasicMenuBar isAuthenticated={isAuthenticated} />
    </>
  );
}

function BasicMenuBar({ isAuthenticated }) {
  const navigate = useNavigate();
  const { logout, loginWithRedirect } = useAuth0();

  return (
    <>
      <StyledLink
        underline="none"
        onClick={() => navigate("./top", { replace: true })}
      >
        Top
      </StyledLink>
      <StyledLink
        underline="none"
        onClick={() => navigate("./newest", { replace: true })}
      >
        Newest
      </StyledLink>
      {!isAuthenticated ? (
        <StyledLink
          underline="none"
          onClick={(e) => {
            e.preventDefault();
            loginWithRedirect();
          }}
        >
          Login
        </StyledLink>
      ) : (
        <StyledLink
          underline="none"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          <StyledIcon sx={{ justifyContent: "center", display: "flex" }}>
            <PowerSettingsNew />
          </StyledIcon>
        </StyledLink>
      )}
      {}
    </>
  );
}

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            window.location.href = `/search/${searchTerm}`;
          }
        }}
      />
    </Search>
  );
}
