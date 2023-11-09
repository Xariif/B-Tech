import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createToast, hideToast } from "../../features/toasts/toastsActions";

export default function Top() {
	const dispatch = useDispatch();

	return <>top</>;
}
