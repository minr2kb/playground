import React from "react";
import useDraggable from "../utils/hooks/useDraggable";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	dirMapRecoil,
	themeRecoil,
	windowFocusRecoil,
	windowStackRecoil,
} from "../recoil";
import { App, Theme, UUID } from "../types/interfaces";

interface AppIconProps {
	id: UUID;
	index: number;
	iconFocus: UUID | null;
	setIconFocus: React.Dispatch<React.SetStateAction<string | null>>;
	iconStack: string[];
	setIconStack: React.Dispatch<React.SetStateAction<string[]>>;
	parentNode: UUID | null;
}

const AppIcon: React.FC<AppIconProps> = ({
	id,
	index,
	iconFocus,
	setIconFocus,
	iconStack,
	setIconStack,
	parentNode,
}) => {
	const dirMap = useRecoilValue(dirMapRecoil);
	const data = dirMap[id] as App;
	const [draggerableProps, offset] = useDraggable();
	const [windowFocus, setWindowFocus] = useRecoilState(windowFocusRecoil);
	const [windowStack, setWindowStack] = useRecoilState(windowStackRecoil);

	const theme = useRecoilValue(themeRecoil);

	const isFocused = iconFocus === id;
	const isHalfFocused = isFocused && windowFocus !== parentNode;

	const onFocus = () => {
		console.log("dlick");
		setIconStack(prev => [...prev.filter(iconId => iconId !== id), id]);
		setIconFocus(id);
		setWindowFocus(parentNode);
	};

	const openApp = () => {
		setWindowStack([
			...windowStack.filter(windowId => windowId !== id),
			id,
		]);
		setWindowFocus(id);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				flexShrink: 0,
				width: 100,
				height: 100,
				position: "absolute",
				top: 20,
				left: 20 + index * 110,
				marginLeft: offset.x,
				marginTop: offset.y,
				zIndex: iconStack.indexOf(id),
			}}
			onClick={e => {
				e.stopPropagation();
				onFocus();
			}}
			onDoubleClick={openApp}
			{...draggerableProps}
			onDragStart={e => {
				draggerableProps.onDragStart(e);
				onFocus();
			}}
		>
			<div
				style={{
					padding: 10,

					...(isFocused
						? {
								backgroundColor: `rgba(200,200,200,${
									theme === Theme.DARK ? 0.2 : 0.4
								})`,
								// border: "solid 1.5px rgba(200,200,200,0.4)",
								borderRadius: 5,
						  }
						: {
								// border: "solid 1.5px rgba(200,200,200,0)",
						  }),
				}}
			>
				<img
					src={data.icon}
					alt="app-icon"
					width={55}
					height={55}
					style={{
						borderRadius: "15px",
						boxShadow: "0px 0.5px 0.5px 0.5px rgba(0,0,0,0.2)",
						objectFit: "cover",
					}}
				/>
			</div>

			<div
				style={{
					marginTop: 3,
					textAlign: "center",
					fontSize: 13,
					fontWeight: 500,
					textShadow: "0px 0px 2px rgba(0,0,0,0.1)",

					paddingBottom: 1,
					paddingLeft: 5,
					paddingRight: 5,
					borderRadius: 3,
					color: isHalfFocused
						? "#666"
						: theme === Theme.DARK || isFocused
						? "white"
						: "#333333",
					backgroundColor: isHalfFocused
						? "#DDD"
						: isFocused
						? "#0158D0"
						: "transparent",
				}}
			>
				{data.name}
			</div>
		</div>
	);
};

export default AppIcon;
