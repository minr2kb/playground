import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	dirMapRecoil,
	rootDirRecoil,
	themeRecoil,
	windowFocusRecoil,
	windowStackRecoil,
} from "../recoil";
import useFullScreen from "../utils/hooks/useFullScreen";
import AppIcon from "./AppIcon";
import FolderIcon from "./FolderIcon";
import Header from "./Header";
import FolderWindow from "./FolderWindow";
import AppWindow from "./AppWindow";
import { DirType, Theme, UUID } from "../types/interfaces";
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { getComponentTree } from "../utils/dirUtils";

const Home: React.FC = () => {
	const theme = useRecoilValue(themeRecoil);
	const [iconFocus, setIconFocus] = useState<UUID | null>(null);
	const [iconStack, setIconStack] = useState<UUID[]>([]);

	const windowStack = useRecoilValue(windowStackRecoil);
	const [windowFocus, setWindowFocus] = useRecoilState(windowFocusRecoil);
	const [rootDir, setRootDir] = useRecoilState(rootDirRecoil);
	const [dirMap, setDirMap] = useRecoilState(dirMapRecoil);
	const { elem, triggerFull } = useFullScreen();

	const focusOut = () => {
		setWindowFocus(null);
		if (!windowFocus) {
			setIconFocus(null);
		}
	};

	onMessage(messaging, payload => {
		console.log("Message received. ", payload);
		if (payload.notification) {
			const { title, ...options } = payload.notification;
			new Notification(title || "알림", options);
		}
		// ...
	});

	useEffect(() => {
		const componentContext = require.context("../pages/", true, /\.tsx$/);
		getComponentTree(componentContext).then(res => {
			const { rootDir: rd, dirMap: dm } = res;
			setIconStack(rd);
			setRootDir(rd);
			setDirMap(dm);
		});
	}, []);

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
				backgroundImage: `url('images/home/mike-yukhtenko-${
					theme === Theme.DARK ? "dark" : "light"
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
				{rootDir.map((childrenNodeId: UUID, idx: number) =>
					dirMap[childrenNodeId].type === DirType.FOLDER ? (
						<FolderIcon
							key={childrenNodeId}
							id={childrenNodeId}
							index={idx}
							parentNode={null}
							iconFocus={iconFocus}
							setIconFocus={setIconFocus}
							iconStack={iconStack}
							setIconStack={setIconStack}
						/>
					) : (
						<AppIcon
							key={childrenNodeId}
							id={childrenNodeId}
							index={idx}
							parentNode={null}
							iconFocus={iconFocus}
							setIconFocus={setIconFocus}
							iconStack={iconStack}
							setIconStack={setIconStack}
						/>
					)
				)}
				{Object.keys(dirMap).map(
					(windowId: UUID) =>
						windowStack.includes(windowId) &&
						(dirMap[windowId].type === DirType.FOLDER ? (
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
