import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    /*
		setTimeout(() => {
			navigate("/");
		}, 3000);
		*/
  }, []);

  return (
    <Typography variant="h6" sx={{ textAlign: "center" }}>
      Oops! Page Not Found
    </Typography>
  );
}
