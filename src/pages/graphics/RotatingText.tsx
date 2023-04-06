import React from "react";
import { AppInfo } from "../../types/interfaces";
import { Grid, Typography } from "@mui/material";

const RotatingText = () => {
	const words = ["Hello", "World"];

	return (
		<Grid
			sx={{
				perspective: "800px",
				textAlign: "center",
				mt: 4,
			}}
		>
			{words.map((word, index) => (
				<Grid
					key={index}
					sx={{
						position: "relative",
						display: "inline-block",
						transformStyle: "preserve-3d",
						animation: "rotate-text 4s infinite linear",
						animationDelay: `${index}s`,
						"@keyframes rotate-text": {
							"0%": {
								transform: "translateZ(0) rotateX(0deg)",
							},
							"100%": {
								transform: "translateZ(0) rotateX(360deg)",
							},
						},
					}}
				>
					<Typography
						sx={{ color: "#FFF", fontSize: 36, fontWeight: 700 }}
					>
						{word}
					</Typography>
				</Grid>
			))}
		</Grid>
	);
};

export const config: AppInfo = {
	name: "Rotating Text",
	// icon:
};

export default RotatingText;
