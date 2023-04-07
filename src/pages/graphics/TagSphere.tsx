import React, { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import TagCloud, { TagCloudOptions } from "TagCloud";
import { AppInfo } from "../../types/interfaces";

const TagSphere = () => {
	const tagCloudRef = useRef<HTMLDivElement>(null!);
	useEffect(() => {
		const container = "#tagcloud";
		document.getElementById("tagcloud")!.innerHTML = "";
		const texts = [
			"HTML",
			"CSS",
			"JavaScript",
			"ReactJS",
			"TypeScript",
			"MUI",
			"NodeJS",
			"Yarn",
			"NX",
			"NextJS",
			"ThreeJS",
			"Recoil",
			"Firebase",
			"Github",
			"VSCode",
			"Flutter",
			"NPM",
		];

		const options: TagCloudOptions = {
			radius: 300,
			maxSpeed: "fast",
			initSpeed: "normal",
			keep: true,
		};

		TagCloud(container, texts, options);
	}, []);

	return (
		<Grid
			container
			justifyContent={"center"}
			width={"100%"}
			sx={{ overflow: "hidden" }}
		>
			<Box
				id="tagcloud"
				ref={tagCloudRef}
				sx={{
					fontSize: 32,
					zIndex: -1,
				}}
			/>
		</Grid>
	);
};
export const config: AppInfo = {
	name: "Tag Sphere",
	// icon: "images/graphics/graphics-rainbow-rotate.png",
};

export default TagSphere;
