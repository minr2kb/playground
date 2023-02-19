import { useState, useEffect } from "react";
interface Dimension {
	viewportWidth: number;
	viewportHeight: number;
}

function getWindowDimensions() {
	const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
	return {
		viewportWidth,
		viewportHeight,
	};
}

const useWindowDimensions = (): Dimension => {
	const [windowDimensions, setWindowDimensions] = useState<Dimension>({
		viewportWidth: 0,
		viewportHeight: 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
