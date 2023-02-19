import { useState } from "react";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { AppInfo } from "../../types/interfaces";

interface LightBulbProps {
	width: number;
	height: number;
}
const LightBulb: React.FC<LightBulbProps> = ({ width, height }) => {
	const [isHovering, setIsHovering] = useState(false);
	const [_switchOn, setSwitchOn] = useState(false);

	return (
		<div
			onMouseOver={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={() => setSwitchOn(prev => !prev)}
			style={{
				width: width,
				height: height,
				backgroundRepeat: "no-repeat",
				backgroundSize: `${width}px ${height}px`,
				objectFit: "cover",
				opacity: isHovering ? 1 : isHovering ? 0.7 : 0.4,
				backgroundImage: `url("${
					isHovering
						? "/images/interactive/lightbulb_on.jpg"
						: "/images/interactive/lightbulb_off.jpg"
				}")`,
				transition: "all ease-in-out 0.2s",
				WebkitTransition: "all ease-in-out 0.2s",
				cursor: "grab",
			}}
		/>
	);
};

const LightBulbs: React.FC = () => {
	const windowDimensions = useWindowDimensions();
	const w = 110;
	const h = 170;

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexWrap: "wrap",
				overflow: "hidden",
				justifyContent: "space-around",
			}}
		>
			{[
				...Array(
					Math.ceil(windowDimensions.viewportWidth / w) *
						Math.ceil(windowDimensions.viewportHeight / h)
				),
			].map((n, i) => (
				<LightBulb key={`bulb-${i}`} width={w} height={h} />
			))}
		</div>
	);
};

export const config: AppInfo = {
	name: "Light Bulbs",
	icon: "images/interactive/interactive-light-bulbs.png",
};

export default LightBulbs;
