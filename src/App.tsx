import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import NotFound from "./NotFound";
import HoverLogo from "./interactive/HoverLogo";
import RainbowRotate from "./graphics/RainbowRotate";
import Legorize from "./graphics/Legorize";
import CoffeeCup from "./3d/CoffeeCup";
import TMRlogo from "./3d/TMRlogo";
import LightBulbs from "./interactive/LightBulbs";
import Home from "./home/Home";

function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/image">
						<Route path="legorize" element={<Legorize />} />
					</Route>
					<Route path="/interactive">
						<Route path="hover-logo" element={<HoverLogo />} />
						<Route path="rainbow" element={<RainbowRotate />} />
						<Route path="lightbulbs" element={<LightBulbs />} />
					</Route>
					<Route path="/3d">
						<Route path="tmr-logo" element={<TMRlogo />} />
						<Route path="coffee" element={<CoffeeCup />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
