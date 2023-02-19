import Spline from "@splinetool/react-spline";
import { AppInfo } from "../../types/interfaces";

const CoffeeCup: React.FC = () => {
	return (
		<>
			<div style={{ height: "100%", width: "100%" }}>
				<Spline scene="https://prod.spline.design/E5X4cGoF0OUjylvg/scene.splinecode" />
			</div>
		</>
	);
};

export const config: AppInfo = {
	name: "Coffee Cup",
	icon: "images/3d/3d-coffee-cup.png",
};

export default CoffeeCup;
