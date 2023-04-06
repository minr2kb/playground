import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { AppInfo } from "../../types/interfaces";
import "../../styles/TextShpere.css";

// Importing TagCloud package
import TagCloud, { TagCloudOptions } from "TagCloud";

const TagCloudSphere = () => {
	useEffect(() => {
		return () => {
			const container = ".tagcloud";
			const texts = [
				"HTML",
				"CSS",
				"SASS",
				"JavaScript",
				"React",
				"Vue",
				"Nuxt",
				"NodeJS",
				"Babel",
				"Jquery",
				"ES6",
				"GIT",
				"GITHUB",
			];

			const options: TagCloudOptions = {
				radius: 200,
				maxSpeed: "normal",
				initSpeed: "normal",
				keep: true,
			};

			// TagCloud(container, texts, options);
			TagCloud(container, texts, options);
		};
	}, []);

	// useEffect(() => {
	// 	let rootEl = document.querySelector(".content");
	// 	if (rootEl === null) return;
	// 	rootEl.addEventListener("click", (e)=> {
	// 		if (e.target. === "tagcloud--item") {
	// 			window.open(
	// 				`https://www.google.com/search?q=${e.target.innerText}`,
	// 				"_blank"
	// 			);
	// 			// your code here
	// 		}
	// 	});
	// }, []);

	return (
		<Grid className="text-shpere">
			<Box className="tagcloud" />
		</Grid>
	);
};

export const config: AppInfo = {
	name: "Tag Cloud Sphere",
	// icon: "images/graphics/graphics-rainbow-rotate.png",
};

export default TagCloudSphere;
