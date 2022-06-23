import React, { useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useInterval from "../utils/useInterval";
import { themeRecoil, windowFocusRecoil } from "../recoil";
import { dirMap } from "./const/appData";

interface HeaderProps {
	onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
	const menus = {
		finder: ["파일", "편집", "보기", "이동", "윈도우", "도움말"],
		app: ["보기", "윈도우", "도움말"],
	};
	const week = useMemo(() => ["일", "월", "화", "수", "목", "금", "토"], []);
	const [time, setTime] = useState<[number, number, string, number, number]>([
		0,
		0,
		"월",
		0,
		0,
	]);
	const windowFocus = useRecoilValue(windowFocusRecoil);
	const [theme, setTheme] = useRecoilState(themeRecoil);

	const getTime = () =>
		setTime([
			new Date().getMonth() + 1,
			new Date().getDate(),
			week[new Date().getDay()],
			new Date().getHours(),
			new Date().getMinutes(),
		]);

	useEffect(getTime, [week]);

	useInterval(getTime, 10000);
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				height: 30,
				backgroundColor:
					theme === "DARK"
						? "rgba(62,13,165,0.7)"
						: "rgba(232,195,255,0.7)",
				backdropFilter: "blur(50px)",
				fontSize: 13,
				fontWeight: 500,
				textShadow:
					theme === "DARK" ? "0px 0px 5px rgba(0,0,0,0.4)" : "none",
				color: theme === "DARK" ? "white" : "black",
				transition: "background-color ease-in-out 0.5s",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginLeft: 20,
				}}
			>
				<img
					src="images/home/apple_logo.png"
					alt="apple-logo"
					width={13}
					style={{
						filter: theme === "DARK" ? "invert(100%)" : "none",

						marginBottom: 1,
					}}
					onClick={onLogoClick}
				/>
				<div
					style={{
						marginLeft: 20,
						fontWeight: 800,
					}}
				>
					{windowFocus === null
						? "KBMIN's Playground"
						: dirMap[windowFocus].type === "folder"
						? "Finder"
						: dirMap[windowFocus].name}
				</div>
				{menus[
					windowFocus === null ||
					dirMap[windowFocus].type === "folder"
						? "finder"
						: "app"
				].map((menu: string, idx: number) => (
					<div
						key={`header-menu-${idx}`}
						style={{
							marginLeft: 20,
						}}
					>
						{menu}
					</div>
				))}
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginRight: 20,
				}}
			>
				<div
					style={{
						marginLeft: 20,
						backgroundColor: theme === "DARK" ? "white" : "black",
						fontWeight: 400,
						textShadow: "none",
						color: theme === "DARK" ? "black" : "white",
						borderRadius: 3,
					}}
				>
					&nbsp;A&nbsp;
				</div>
				<img
					src="images/home/bluetooth.png"
					alt="bluetooth"
					width={8}
					style={{
						filter: theme === "DARK" ? "invert(100%)" : "none",

						marginLeft: 20,
						marginBottom: 1,
					}}
				/>
				<img
					src="images/home/battery.png"
					alt="battery"
					width={28}
					style={{
						filter: theme === "DARK" ? "invert(100%)" : "none",

						marginLeft: 20,
						marginBottom: 1,
					}}
				/>
				<img
					src="images/home/control_center.webp"
					alt="control-center"
					width={16}
					style={{
						filter: theme === "DARK" ? "invert(100%)" : "none",

						marginLeft: 20,
						marginBottom: 1,
					}}
					onClick={() =>
						setTheme(prev => (prev === "DARK" ? "LIGHT" : "DARK"))
					}
				/>
				<div
					style={{
						marginLeft: 20,
					}}
				>
					{time[0]}월 {time[1]}일 ({time[2]}) &nbsp; {time[3]}:
					{time[4].toString().padStart(2, "0")}
				</div>
			</div>
		</div>
	);
};

export default Header;
