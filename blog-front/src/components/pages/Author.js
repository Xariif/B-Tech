import { Avatar, Box, Stack, Typography } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import React from "react";

function Author({ authorData }) {
	console.log(authorData);
	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
					justifyContent: "space-between",
					justifyItems: "center",
				}}
			>
				<Box sx={{ m: 2 }}>
					<Stack direction="row" spacing={2}>
						<Avatar
							sx={{
								bgcolor: deepOrange[500],
								width: 56,
								height: 56,
								fontWeight: "bold",
							}}
						>
							{authorData.name[0]}
						</Avatar>

						<Typography variant="h4" display={"flex"} alignItems={"center"}>
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
		</>
	);
}

export default Author;
