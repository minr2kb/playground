import React, { useRef, useEffect, useState } from "react";
import { Size } from "../../types/interfaces";

const useLayoutSize = (): [Size, React.RefObject<HTMLDivElement>] => {
	const layoutRef = useRef<HTMLDivElement>(null);
	const [layoutSize, setLayoutSize] = useState<Size>({ width: 0, height: 0 });
	const { current } = layoutRef;

	const getLayoutSize = () => {
		if (layoutRef.current !== null) {
			setLayoutSize({
				width: layoutRef.current.clientWidth,
				height: layoutRef.current.clientHeight,
			});
		}
	};

	useEffect(() => {
		window.addEventListener("resize", getLayoutSize);
		return () => {
			window.removeEventListener("resize", getLayoutSize);
		};
	}, []);

	useEffect(() => {
		getLayoutSize();
	}, [current]);

	return [layoutSize, layoutRef];
};

export default useLayoutSize;
