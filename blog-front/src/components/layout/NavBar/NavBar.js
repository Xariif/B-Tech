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
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import useUser from "../../hooks/useUser";
import usePostService from "../../../services/posts/useService";

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
  display: "flex",
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
            onClick={() => navigate("/", { replace: false })}
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

function MenuBar() {
  const { user } = useUser();
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  return (
    <>
      {user && user.permissions.includes("admin") && (
        <StyledLink
          underline="none"
          onClick={() => navigate("./admin", { replace: false })}
        >
          Admin
        </StyledLink>
      )}
      {user && user.permissions.includes("write:posts") && (
        <StyledLink
          underline="none"
          onClick={() =>
            navigate("./post/menager/approved", { replace: false })
          }
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
        onClick={() => navigate("./top", { replace: false })}
      >
        Top
      </StyledLink>

      {isAuthenticated && (
        <StyledLink
          underline="none"
          onClick={() => navigate("./profile", { replace: false })}
        >
          <PersonIcon />
        </StyledLink>
      )}
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
  const navigate = useNavigate();

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
            navigate(`/search/${searchTerm}`, { replace: false });
          }
        }}
      />
    </Search>
  );
}
