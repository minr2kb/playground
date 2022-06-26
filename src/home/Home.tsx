import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { themeRecoil, windowFocusRecoil, windowStackRecoil } from "../recoil";
import useFullScreen from "../utils/useFullScreen";
import AppIcon from "./AppIcon";
import FolderIcon from "./FolderIcon";
import Header from "./Header";
import FolderWindow from "./FolderWindow";
import AppWindow from "./AppWindow";
import { UUID } from "./const/interfaces";
import { dirMap, homeDir } from "./const/appData";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";

const Home: React.FC = () => {
	const { elem, triggerFull } = useFullScreen();
	const [iconFocus, setIconFocus] = useState<UUID | null>(null);
	const [iconStack, setIconStack] = useState<UUID[]>(homeDir);

	const theme = useRecoilValue(themeRecoil);
	const windowStack = useRecoilValue(windowStackRecoil);
	const [windowFocus, setWindowFocus] = useRecoilState(windowFocusRecoil);

	const focusOut = () => {
		setWindowFocus(null);
		if (!windowFocus) {
			setIconFocus(null);
		}
	};

	onMessage(messaging, payload => {
		console.log("Message received. ", payload);
		// ...
	});

	useEffect(() => {
		getToken(messaging, {
			vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
		})
			.then(currentToken => {
				if (currentToken) {
					// Send the token to your server and update the UI if necessary
					console.log("token:", currentToken);
					// ...
				} else {
					// Show permission request UI
					console.log(
						"No registration token available. Request permission to generate one."
					);
					// ...
				}
			})
			.catch(err => {
				console.log("An error occurred while retrieving token. ", err);
				// ...
			});
	}, []);

	return (
		<div
			ref={elem}
			style={{
				width: "100vw",
				height: "100vh",
				backgroundImage: `url('images/home/mac_desktop_bg${
					theme === "DARK" ? "_dark" : ""
				}.jpg')`,
				backgroundSize: "100%",
				backgroundPosition: "center center",
				transition: "all ease-in-out 0.5s",
				WebkitTransition: "all ease-in-out 0.5s",
			}}
			onClick={focusOut}
		>
			<Header onLogoClick={triggerFull} />
			<div
				style={{
					// display: "flex",
					// flexDirection: "column",
					// alignItems: "flex-end",
					// position: "relative",
					padding: 10,
				}}
			>
				{homeDir.map((childrenNodeId: UUID, idx: number) =>
					dirMap[childrenNodeId].type === "folder" ? (
						<FolderIcon
							key={childrenNodeId}
							id={childrenNodeId}
							index={idx}
							iconFocus={iconFocus}
							setIconFocus={setIconFocus}
							iconStack={iconStack}
							setIconStack={setIconStack}
							parentNode={null}
						/>
					) : (
						<AppIcon
							key={childrenNodeId}
							id={childrenNodeId}
							index={idx}
							iconFocus={iconFocus}
							setIconFocus={setIconFocus}
							iconStack={iconStack}
							setIconStack={setIconStack}
							parentNode={null}
						/>
					)
				)}
				{Object.keys(dirMap).map(
					(windowId: UUID) =>
						windowStack.includes(windowId) &&
						(dirMap[windowId].type === "folder" ? (
							<FolderWindow key={windowId} id={windowId} />
						) : (
							<AppWindow key={windowId} id={windowId} />
						))
				)}
			</div>
		</div>
	);
};

export default Home;
