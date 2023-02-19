import { AppInfo } from "../../types/interfaces";
import useSequence from "../../utils/hooks/useSequence";

const RainbowRotate: React.FC = () => {
	const MAX = 50;
	const count = useSequence(MAX, 50);
	const transformList = (i: number) =>
		[
			`translate(-50%, -50%)`,
			`rotateZ(${i * (720 / MAX)}deg)`,
			`scale(${i / MAX})`,
			`rotate(${i - 20}deg)`,
		].join(" ");

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div>
				{[...Array(count)].map((v, i: number) => (
					<div
						key={`tmr-${i}`}
						style={{
							position: "absolute",
							fontSize: 100,
							fontWeight: 900,
							// top: -i * 1 + 200,
							// left: -i * 1 + 300,
							top: "50%",
							left: "50%",
							transform: transformList(i),
							// color: `#1ECCA2`,
							color: "tomato",
							// opacity: 0.1,
							filter: `hue-rotate(${i * (360 / count)}deg)`,
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
	name: "Rainbow Rotate",
	icon: "images/graphics/graphics-rainbow-rotate.png",
};

export default RainbowRotate;
