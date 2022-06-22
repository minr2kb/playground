import CoffeeCup from "../../3d/CoffeeCup";
import TMRlogo from "../../3d/TMRlogo";
import Legorize from "../../graphics/Legorize";
import HoverLogo from "../../interactive/HoverLogo";
import LightBulbs from "../../interactive/LightBulbs";
import RainbowRotate from "../../graphics/RainbowRotate";
import { dirMapType, UUID } from "./interfaces";
import RoundFrog from "../../interactive/RoundFrog";

export const homeDir: UUID[] = [
	"6e7d1a0d-f7f1-49f7-a550-1648e34aa12a",
	"10610fe7-27c9-4247-9a33-dd4c473a6356",
	"629c0a66-f8dd-4222-b9d8-171bf17091d8",
];

export const dirMap: dirMapType = {
	"6e7d1a0d-f7f1-49f7-a550-1648e34aa12a": {
		type: "folder",
		id: "6e7d1a0d-f7f1-49f7-a550-1648e34aa12a",
		name: "3d",
		childrenNodes: [
			"cb14b249-edf6-4228-9f38-3f8ee3ba0eda",
			"164f215f-2a3b-494d-bd0d-ac1f341eb15b",
		],
	},
	"10610fe7-27c9-4247-9a33-dd4c473a6356": {
		type: "folder",
		id: "10610fe7-27c9-4247-9a33-dd4c473a6356",
		name: "interactive",
		childrenNodes: [
			"3cd49c3b-842f-4800-86e2-15a652065bf5",
			"5cda1cd9-4b9e-4c6b-a54c-0db711274845",
			"a9413d35-5226-4898-bf4d-481c2431d15c",
		],
	},
	"629c0a66-f8dd-4222-b9d8-171bf17091d8": {
		type: "folder",
		id: "629c0a66-f8dd-4222-b9d8-171bf17091d8",
		name: "graphics",
		childrenNodes: [
			"92632210-7f7e-424c-9dda-f51f5c6a785b",
			"8a6f3e69-9854-4deb-932c-be23044f2585",
		],
	},
	"cb14b249-edf6-4228-9f38-3f8ee3ba0eda": {
		type: "app",
		id: "cb14b249-edf6-4228-9f38-3f8ee3ba0eda",
		name: "TMR Logo",
		icon: "images/3d/3d-tmr-logo.png",
		component: TMRlogo,
	},
	"164f215f-2a3b-494d-bd0d-ac1f341eb15b": {
		type: "app",
		id: "164f215f-2a3b-494d-bd0d-ac1f341eb15b",
		name: "Coffee Cup",
		icon: "images/3d/3d-coffee-cup.png",
		component: CoffeeCup,
	},
	"3cd49c3b-842f-4800-86e2-15a652065bf5": {
		type: "app",
		id: "3cd49c3b-842f-4800-86e2-15a652065bf5",
		name: "Hover Logo",
		icon: "images/interactive/interactive-hover-logo.png",
		component: HoverLogo,
	},
	"5cda1cd9-4b9e-4c6b-a54c-0db711274845": {
		type: "app",
		id: "5cda1cd9-4b9e-4c6b-a54c-0db711274845",
		name: "Light Bulbs",
		icon: "images/interactive/interactive-light-bulbs.png",
		component: LightBulbs,
	},
	"8a6f3e69-9854-4deb-932c-be23044f2585": {
		type: "app",
		id: "8a6f3e69-9854-4deb-932c-be23044f2585",
		name: "Rainbow Rotate",
		icon: "images/graphics/graphics-rainbow-rotate.png",
		component: RainbowRotate,
	},
	"92632210-7f7e-424c-9dda-f51f5c6a785b": {
		type: "app",
		id: "92632210-7f7e-424c-9dda-f51f5c6a785b",
		name: "Legorize",
		icon: "images/graphics/graphics-legorize_light.png",
		component: Legorize,
	},
	"a9413d35-5226-4898-bf4d-481c2431d15c": {
		type: "app",
		id: "a9413d35-5226-4898-bf4d-481c2431d15c",
		name: "Round Frog",
		icon: "images/interactive/interactive-round-frog.jpg",
		component: RoundFrog,
	},
};
