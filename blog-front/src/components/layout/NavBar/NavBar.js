import {
	AppBar,
	Toolbar,
	Typography,
	Container,
	styled,
	alpha,
	Link,
	Stack,
	SvgIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import BoltIcon from "@mui/icons-material/Bolt";
import theme from "../../../theme";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
	Logout,
	Power,
	PowerInput,
	PowerSettingsNew,
} from "@mui/icons-material";

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

const StyledLink = styled(Link)(({ theme }) => ({
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

const NavBar = () => {
	const {
		user,
		isAuthenticated,
		isLoading,
		logout,
		loginWithRedirect,
		getAccessTokenSilently,
	} = useAuth0();

	const navigate = useNavigate();

	return (
		<AppBar position="sticky">
			<Container maxWidth="lg">
				<StyledToolBar variant="dense">
					<StyledLink href="/" underline="none" style={{ display: "flex" }}>
						<BoltIcon fontSize="large" />
						<Typography variant="h6">B-TECH</Typography>
					</StyledLink>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Stack direction={"row"} gap={"1rem"}>
						<StyledLink underline="none" href="/top">
							Top
						</StyledLink>
						<StyledLink underline="none" href="newest">
							Newest
						</StyledLink>
						{!isLoading && !isAuthenticated ? (
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
									logout({ returnTo: window.location.origin });
								}}
							>
								<StyledIcon sx={{ justifyContent: "center", display: "flex" }}>
									<PowerSettingsNew />
								</StyledIcon>
							</StyledLink>
						)}
					</Stack>
				</StyledToolBar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
