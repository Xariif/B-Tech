import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import { React } from "react";

export default function Footer() {
	//wykonawcy i dane dot projektu
	// ikonki do social mediów
	// nazwa firmy + znak zastrzezony + rok (aktualny z js)

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			spacing={2}
			maxWidth={"1180px"}
			margin={"auto"}
		>
			<Typography variant="body2">
				{" "}
				B-TECH {new Date().getFullYear()}&copy;
			</Typography>

			<Typography variant="body2">Author: Jakub Filiks</Typography>
		</Stack>
	);
}
