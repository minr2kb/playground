import { useState } from "react";
import useSequence from "../../utils/hooks/useSequence";
import { AppInfo } from "../../types/interfaces";

interface HoverLogoProps {
	onClick?: () => void;
}

const HoverLogo: React.FC<HoverLogoProps> = ({ onClick }) => {
	const MAX = 30;
	const [direction, setDirection] = useState<"up" | "down">("down");
	// const hoverCount = useSequence(100, 10);
	// const count = useSequence(
	// 	MAX,
	// 	1,
	// 	hoverCount < 30 ? "down" : hoverCount > 70 ? "up" : "up"
	// );
	const count = useSequence(MAX, 2, direction);

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
				background: "black",
				width: "150vw",
				marginLeft: "-25vw",
			}}
		>
			<div
				style={{
					width: direction === "up" ? "150vw" : 0,
					height: direction === "up" ? "150vw" : 0,
					borderRadius: "50%",
					backgroundColor: "#EEE",
					transition: "all ease-in-out 0.5s",
					WebkitTransition: "all ease-in-out 0.5s",
				}}
			></div>
			<div>
				{[...Array(MAX)].map((v, i: number) => (
					<div
						key={`logo-${i}`}
						onMouseOver={() => setDirection("up")}
						onMouseLeave={() => setDirection("down")}
						onClick={onClick}
						style={{
							cursor: "pointer",
							position: "absolute",
							fontSize: 100,
							fontWeight: 900,
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
							marginTop: `-${i}px`,
							marginLeft: `${i}px`,
							color: i === count - 1 ? "black" : `#1ECCA2`,
							// color: i === count - 1 ? "black" : `tomato`,
							// filter: `hue-rotate(${i * (360 / count)}deg)`,

							opacity: i > count - 1 ? 0 : 1 - 0.01 * (MAX - i),
						}}
					>
						TMR
						<br />
						FOUNDERS
					</div>
				))}
			</div>
		</div>
	);
};

export const config: AppInfo = {
	name: "Hover Logo",
	icon: "images/interactive/interactive-hover-logo.png",
};

export default HoverLogo;
