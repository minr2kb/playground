import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	dirMapRecoil,
	themeRecoil,
	windowFocusRecoil,
	windowStackRecoil,
} from "../recoil";
import { BsChevronLeft, BsChevronRight, BsSearch } from "react-icons/bs";
import { CgMoreO, CgChevronDown } from "react-icons/cg";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import AppIcon from "./AppIcon";
import FolderIcon from "./FolderIcon";
import CloseButtons from "./CloseButtons";
import { DirType, Folder, Theme, UUID } from "../types/interfaces";
import useDragResizable from "../utils/hooks/useDragResizable";
import ResizeHandles from "./ResizeHandles";
import { Grid } from "@mui/material";

interface FolderWindowProps {
	id: UUID;
}

const FolderWindow: React.FC<FolderWindowProps> = ({ id }) => {
	const dirMap = useRecoilValue(dirMapRecoil);
	const data = dirMap[id] as Folder;
	// const [draggerableProps, offset, isDragging] = useDraggable();
	const [
		position,
		size,
		draggableProps,
		isDragging,
		draggingEdge,
		handleMouseDown,
	] = useDragResizable(
		{
			width: 900,
			height: 500,
		},
		{ x: 300, y: 150 }
	);

	const theme = useRecoilValue(themeRecoil);

	const [iconFocus, setIconFocus] = useState<UUID | null>(null);
	const [iconStack, setIconStack] = useState<UUID[]>(data.childrenNodes);

	const [windowStack, setWindowStack] = useRecoilState(windowStackRecoil);
	const [windowFocus, setWindowFocus] = useRecoilState(windowFocusRecoil);

	const [isFullSize, setIsFullSize] = useState<boolean>(false);
	const [isStaged, setIsStaged] = useState(false);

	const isFocused = windowFocus === id;

	const iconColor = theme === Theme.DARK ? "#FFFFFF" : "#4A4A4A";

	const onFocus: React.MouseEventHandler<HTMLDivElement> = e => {
		e.stopPropagation();
		setWindowStack(prev => [
			...prev.filter(windowId => windowId !== id),
			id,
		]);
		setWindowFocus(id);
		if (isFocused) {
			setIconFocus(null);
		}
	};

	const onClose: React.MouseEventHandler<HTMLDivElement> = e => {
		e.stopPropagation();
		setIsFullSize(false);
		if (windowStack.length > 1) {
			setWindowFocus(windowStack[windowStack.length - 2]);
		}
		setWindowStack(prev => [...prev.filter(windowId => windowId !== id)]);
	};

	const onStage: React.MouseEventHandler<HTMLDivElement> = e => {
		e.stopPropagation();
		setIsFullSize(false);
		setIsStaged(true);
		if (windowStack.length > 1) {
			setWindowFocus(windowStack[windowStack.length - 1]);
		}
	};

	useEffect(() => {
		if (windowStack[windowStack.length - 1] === id) setIsStaged(false);
	}, [windowStack, id]);

	return (
		<Grid
			sx={{
				transition: `background-color ease-in-out 0.5s${
					isDragging
						? ""
						: ", width ease-in-out 0.2s, height ease-in-out 0.2s, top ease-in-out 0.2s, left ease-in-out 0.2s"
				}`,
				WebkitTransition: `background-color ease-in-out 0.5s${
					isDragging
						? ""
						: ", width ease-in-out 0.2s, height ease-in-out 0.2s, top ease-in-out 0.2s, left ease-in-out 0.2s"
				}`,
				position: "absolute",
				top: isStaged ? "100%" : isFullSize ? 0 : `${position.y}px`,
				left: isStaged ? "10%" : isFullSize ? 0 : `${position.x}px`,
				width: isStaged ? 100 : isFullSize ? "100%" : `${size.width}px`,
				height: isStaged
					? 100
					: isFullSize
					? "100vh"
					: `${size.height}px`,
				// overflow: "hidden",
				bgcolor: theme === Theme.DARK ? "#221D27" : "#FFFFFF",
				borderRadius: isFullSize ? 0 : "12px",
				border: isFullSize
					? "none"
					: `solid 1px ${
							theme === Theme.DARK
								? "rgba(255,255,255,0.3)"
								: "rgba(0,0,0,0.3)"
					  }`,
				boxShadow: `5px 10px 30px 10px rgba(0,0,0,${
					isFocused ? 0.3 : 0.2
				})`,
				// marginLeft: isStaged || isFullSize ? 0 : offset.x,
				// marginTop: isStaged || isFullSize ? 0 : offset.y,
				zIndex: 100 + windowStack.indexOf(id),
			}}
		>
			{/* Header */}
			<Grid
				container
				sx={{
					alignItems: "center",
					justifyContent: "space-between",
					height: 50,

					bgcolor: theme === Theme.DARK ? "#37333C" : "#F5F1F8",
					borderBottom: `solid 0.5px rgba(0,0,0,${
						theme === Theme.DARK ? "1" : "0.2"
					})`,
					pl: "20px",
					transition: "background-color ease-in-out 0.5s",
					WebkitTransition: "background-color ease-in-out 0.5s",
					opacity: isFocused ? 1 : 0.6,
					filter:
						!isFocused && theme === Theme.LIGHT
							? "brightness(0.9)"
							: "brightness(1)",
					borderRadius: "12px 12px 0px 0px",
					flexWrap: "nowrap",
				}}
				onClick={onFocus}
				{...draggableProps}
			>
				<Grid
					container
					sx={{
						width: "fit-content",
						alignItems: "center",
						height: 50,
					}}
				>
					<CloseButtons
						onClose={onClose}
						onStage={onStage}
						setIsFullSize={setIsFullSize}
						isFocused={isFocused}
					/>
					<Grid sx={{ fontWeight: 800 }}>
						<BsChevronLeft
							size={19}
							color={iconColor}
							style={{
								marginTop: 5,
								marginLeft: 30,
								opacity: isFocused ? 0.6 : 0.4,
							}}
						/>
						<BsChevronRight
							size={19}
							color={iconColor}
							style={{
								marginTop: 5,
								marginLeft: 20,
								opacity: isFocused ? 0.6 : 0.4,
							}}
						/>
					</Grid>
					<Grid
						sx={{
							fontWeight: 800,
							ml: "15px",
							color: iconColor,
							opacity: isFocused ? 1 : 0.5,
						}}
					>
						{data.name}
					</Grid>
				</Grid>
				<Grid
					container
					sx={{
						width: "fit-content",
						alignItems: "center",
						height: 50,
						mr: "20px",
					}}
				>
					<CgMoreO
						size={18}
						color={iconColor}
						style={{
							marginLeft: 20,
							opacity: isFocused ? 0.8 : 0.5,
						}}
					/>
					<CgChevronDown
						size={15}
						color={iconColor}
						style={{ marginLeft: 5 }}
					/>
					<HiOutlineChevronDoubleRight
						size={18}
						color={iconColor}
						style={{
							marginLeft: 35,
							opacity: isFocused ? 0.8 : 0.5,
						}}
					/>
					<BsSearch
						size={17}
						color={iconColor}
						style={{
							marginLeft: 20,
							opacity: isFocused ? 0.8 : 0.5,
						}}
					/>
				</Grid>
			</Grid>

			{/* Contents */}
			<Grid
				container
				sx={{
					position: "relative",
					flexWrap: "wrap",
					width: "100%",
					height: "100%",
				}}
				onClick={onFocus}
			>
				{data.childrenNodes.map((childrenNodeId: UUID, idx: number) =>
					dirMap[childrenNodeId].type === DirType.FOLDER ? (
						<FolderIcon
							key={childrenNodeId}
							id={childrenNodeId}
							index={idx}
							parentNode={id}
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
							parentNode={id}
							iconFocus={iconFocus}
							setIconFocus={setIconFocus}
							iconStack={iconStack}
							setIconStack={setIconStack}
						/>
					)
				)}
			</Grid>
			{!isFullSize && (
				<ResizeHandles
					size={size}
					position={position}
					onMouseDown={handleMouseDown}
					draggingEdge={draggingEdge}
				/>
			)}
		</Grid>
	);
};

export default FolderWindow;
