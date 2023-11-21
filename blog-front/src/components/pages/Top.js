import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";
import { ConstructionOutlined } from "@mui/icons-material";
import { useNotification } from "../hooks/useNotification";

export default function Top() {
	const toastActions = useNotification();
	console.log(toastActions);
	return (
		<>
			<Button
				onClick={() => {
					toastActions.showToast("Success", "success");
				}}
			>
				succes
			</Button>
			<Button
				onClick={() => {
					toastActions.showToast("info", "info");
				}}
			>
				info
			</Button>
			<Button
				onClick={() => {
					toastActions.setLoader(true);
				}}
			>
				warning
			</Button>
		</>
	);
}
