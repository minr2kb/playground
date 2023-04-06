import React from "react";
import useDraggable from "../utils/hooks/useDraggable";
import { useRecoilState, useRecoilValue } from "recoil";
import { dirMapRecoil, windowFocusRecoil, windowStackRecoil } from "../recoil";
import { Folder, UUID } from "../types/interfaces";
import { Grid } from "@mui/material";

interface FolderProps {
	id: UUID;
	index: number;
	iconFocus: UUID | null;
	setIconFocus: React.Dispatch<React.SetStateAction<string | null>>;
	iconStack: string[];
	setIconStack: React.Dispatch<React.SetStateAction<string[]>>;
	parentNode: UUID | null;
}

const FolderIcon: React.FC<FolderProps> = ({
	id,
	index,
	iconFocus,
	setIconFocus,
	iconStack,
	setIconStack,
	parentNode,
}) => {
	const dirMap = useRecoilValue(dirMapRecoil);
	const data = dirMap[id] as Folder;
	const [draggerableProps, offset] = useDraggable();
	const [windowFocus, setWindowFocus] = useRecoilState(windowFocusRecoil);
	const [windowStack, setWindowStack] = useRecoilState(windowStackRecoil);

	const isFocused = iconFocus === id;
	const isHalfFocused = isFocused && windowFocus !== parentNode;

	const onFocus = () => {
		setIconStack(prev => [...prev.filter(iconId => iconId !== id), id]);
		setIconFocus(id);
		setWindowFocus(parentNode);
	};

	const openFolder = () => {
		setWindowStack([
			...windowStack.filter(windowId => windowId !== id),
			id,
		]);
		setWindowFocus(id);
	};

	return (
		<Grid
			container
			sx={{
				flexDirection: "column",
				alignItems: "center",
				flexShrink: 0,
				width: 100,
				height: 100,
				position: "absolute",
				top: parentNode === null ? 50 + index * 110 : 20,
				left: parentNode === null ? 20 : 20 + index * 110,
				ml: `${offset.x}px`,
				mt: `${offset.y}px`,
				zIndex: iconStack.indexOf(id),
			}}
			onClick={e => {
				e.stopPropagation();
				onFocus();
			}}
			onDoubleClick={openFolder}
			{...draggerableProps}
			draggable
			onDragStart={e => {
				draggerableProps.onDragStart(e);
				onFocus();
			}}
		>
			<Grid
				sx={{
					p: "2px",

					...(isFocused
						? {
								bgcolor: "rgba(0,0,0,0.4)",
								border: "solid 1.5px rgba(200,200,200,0.4)",
								borderRadius: "4px",
						  }
						: {
								border: "solid 1.5px rgba(200,200,200,0)",
						  }),
				}}
			>
				<img
					src="images/home/folder.png"
					alt="folder"
					width={65}
					height={65}
					style={{ borderRadius: "7px" }}
					draggable={false}
				/>
			</Grid>
			<Grid
				sx={{
					mt: "3px",
					textAlign: "center",
					fontSize: 13,
					fontWeight: 500,
					textShadow: "0px 0px 2px rgba(0,0,0,0.1)",
					pb: "1px",
					px: "5px",
					borderRadius: "3px",
					color: isHalfFocused ? "#666" : "white",
					bgcolor: isHalfFocused
						? "#DDD"
						: isFocused
						? "#0158D0"
						: "transparent",
				}}
			>
				{data.name || "(이름없음)"}
			</Grid>
		</Grid>
	);
};

export default FolderIcon;
