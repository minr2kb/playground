import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import NotFound from "./NotFound";
import Home from "./home/Home";

function App() {
	return (
		<RecoilRoot>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default App;
