import React, { useEffect, useState, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useInterval from "../utils/hooks/useInterval";
import { dirMapRecoil, themeRecoil, windowFocusRecoil } from "../recoil";

import { DirType, Theme } from "../types/interfaces";
import { Grid } from "@mui/material";

interface HeaderProps {
	onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
	const dirMap = useRecoilValue(dirMapRecoil);
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
		<Grid
			container
			sx={{
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				height: 30,
				flexWrap: "nowrap",
				bgcolor:
					theme === Theme.DARK
						? "rgba(0,0,0,0.2)"
						: "rgba(255,255,255,0.3)",
				backdropFilter: "blur(50px)",
				fontSize: 13,
				fontWeight: 500,
				textShadow:
					theme === Theme.DARK
						? "0px 0px 5px rgba(0,0,0,0.4)"
						: "none",
				color: theme === Theme.DARK ? "white" : "black",
				transition: "background-color ease-in-out 0.5s",
				WebkitTransition: "background-color ease-in-out 0.5s",
			}}
		>
			<Grid
				container
				sx={{
					alignItems: "center",
					ml: "20px",
					width: "fit-content",
				}}
			>
				<img
					src="images/home/apple_logo.png"
					alt="apple-logo"
					width={13}
					style={{
						filter: theme === Theme.DARK ? "invert(100%)" : "none",
						marginBottom: 1,
					}}
					onClick={onLogoClick}
				/>
				<Grid
					sx={{
						ml: "20px",
						fontWeight: 800,
					}}
				>
					{windowFocus === null
						? "KBMIN's Playground"
						: dirMap[windowFocus].type === DirType.FOLDER
						? "Finder"
						: dirMap[windowFocus].name}
				</Grid>
				{menus[
					windowFocus === null ||
					dirMap[windowFocus].type === DirType.FOLDER
						? "finder"
						: "app"
				].map((menu: string, idx: number) => (
					<Grid
						key={`header-menu-${idx}`}
						sx={{
							ml: "20px",
						}}
					>
						{menu}
					</Grid>
				))}
			</Grid>

			<Grid
				container
				sx={{
					alignItems: "center",
					mr: "20px",
					width: "fit-content",
				}}
			>
				<Grid
					sx={{
						ml: "20px",
						bgcolor: theme === Theme.DARK ? "white" : "black",
						fontWeight: 400,
						textShadow: "none",
						color: theme === Theme.DARK ? "black" : "white",
						borderRadius: 3,
					}}
				>
					&nbsp;A&nbsp;
				</Grid>
				<img
					src="images/home/bluetooth.png"
					alt="bluetooth"
					width={8}
					style={{
						filter: theme === Theme.DARK ? "invert(100%)" : "none",

						marginLeft: 20,
						marginBottom: 1,
					}}
				/>
				<img
					src="images/home/battery.png"
					alt="battery"
					width={28}
					style={{
						filter: theme === Theme.DARK ? "invert(100%)" : "none",

						marginLeft: 20,
						marginBottom: 1,
					}}
				/>
				<img
					src="images/home/control_center.webp"
					alt="control-center"
					width={16}
					style={{
						filter: theme === Theme.DARK ? "invert(100%)" : "none",

						marginLeft: 20,
						marginBottom: 1,
					}}
					onClick={() =>
						setTheme(prev =>
							prev === Theme.DARK ? Theme.LIGHT : Theme.DARK
						)
					}
				/>
				<Grid
					sx={{
						ml: "20px",
					}}
				>
					{time[0]}월 {time[1]}일 ({time[2]}) &nbsp; {time[3]}:
					{time[4].toString().padStart(2, "0")}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Header;
