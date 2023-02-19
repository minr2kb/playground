import React, { useState, useEffect, useRef } from "react";
import { AppInfo, Coordinate } from "../../types/interfaces";
import useInterval from "../../utils/hooks/useInterval";

interface RainDropProps {}

const RainDrop: React.FC<RainDropProps> = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [offsetLeft, setOffsetLeft] = useState(0);
	const [offsetTop, setOffsetTop] = useState(0);
	const [position, setPosition] = useState<Coordinate>({ x: 0, y: 0 });
	const [scale, setScale] = useState<number>(0.1);
	const [transition, setTransition] = useState("");
	const [opacity, setOpacity] = useState(1);

	useEffect(() => {
		const grandPar = containerRef.current?.parentElement?.parentElement;
		setOffsetLeft(grandPar?.offsetLeft || 0);
		setOffsetTop(grandPar?.offsetTop || 0);
	}, [containerRef.current?.clientWidth, position]);

	useInterval(
		//TODO: random event
		() => {},
		null
	);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(200,200,200)",
			}}
			onClick={e => {
				const newPosition = {
					x: e.pageX - (offsetLeft || 0),
					y: e.pageY - (offsetTop || 0),
				};
				setTransition("");
				setPosition(newPosition);
				setScale(0.01);
				setOpacity(1);
				setTimeout(() => {
					setTransition(
						"transform ease-out 1.5s, opacity ease-out 0.8s"
					);
					setScale(5);
					setOpacity(0);
				}, 50);
			}}
			ref={containerRef}
		>
			<div
				style={{
					position: "absolute",
					top: position.y - 100,
					left: position.x - 100,
					width: "200px",
					height: "200px",
					opacity: opacity,
					borderRadius: "50%",
					boxShadow:
						"4px 4px 10px 5px rgba(0,0,0,0.3), -4px -4px 10px 5px rgba(255,255,255,0.8), inset 4px 4px 10px 5px rgba(0,0,0,0.2), inset -4px -4px 10px 5px rgba(255,255,255,0.7)",
					transform: `scale(${scale})`,
					transition: transition,
				}}
			></div>
		</div>
	);
};

export const config: AppInfo = {
	name: "Rainbow Rotate",
	icon: "images/graphics/graphics-rainbow-rotate.png",
};

export default RainDrop;
