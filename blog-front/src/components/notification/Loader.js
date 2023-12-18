import { Backdrop, CircularProgress } from "@mui/material";

function Loader({ isOpen, setLoader }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
