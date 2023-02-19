import Spline from "@splinetool/react-spline";
import { AppInfo } from "../../types/interfaces";

const TMRlogo: React.FC = () => {
	return (
		<>
			<div style={{ height: "100%", width: "100%" }}>
				<Spline scene="https://prod.spline.design/VV-ZisoWsquKkKOH/scene.splinecode" />
			</div>
		</>
	);
};

export const config: AppInfo = {
	name: "TMR Logo",
	icon: "images/3d/3d-tmr-logo.png",
};

export default TMRlogo;
