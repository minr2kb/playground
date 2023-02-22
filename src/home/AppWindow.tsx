import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dirMapRecoil, windowFocusRecoil, windowStackRecoil } from "../recoil";
import useDraggable from "../utils/hooks/useDraggable";
import CloseButtons from "./CloseButtons";
import { App, UUID } from "../types/interfaces";
import useDragResizable from "../utils/hooks/useDragResizable";
import ResizeHandles from "./ResizeHandles";

interface AppWindowProps {
	id: UUID;
}

const AppWindow: React.FC<AppWindowProps> = ({ id }) => {
	const dirMap = useRecoilValue(dirMapRecoil);
	const data = dirMap[id] as App;
	console.log(data);
	const Content = data.component;
	const [
		position,
		size,
		draggableProps,
		isDragging,
		draggingEdge,
		handleMouseDown,
	] = useDragResizable(
		{
			width: 800,
			height: 600,
		},
		{ x: 300, y: 150 }
	);

	const [windowStack, setWindowStack] = useRecoilState(windowStackRecoil);
	const [windowFocus, setWindowFocus] = useRecoilState(windowFocusRecoil);

	const [isFullSize, setIsFullSize] = useState<boolean>(false);
	const [isStaged, setIsStaged] = useState(false);

	const isFocused = windowFocus === id;

	const onFocus: React.MouseEventHandler<HTMLDivElement> = e => {
		e.stopPropagation();
		setWindowStack(prev => [
			...prev.filter(windowId => windowId !== id),
			id,
		]);
		setWindowFocus(id);
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
		<div
			style={{
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
				backgroundColor: "#000",
				borderRadius: isFullSize ? 0 : "12px",
				// border: isFullSize
				// 	? "none"
				// 	: "solid 1.5px rgba(255,255,255,0.3)",
				boxShadow: "5px 10px 30px 7px rgba(0,0,0,0.5)",
				// marginLeft: isStaged || isFullSize ? 0 : offset.x,
				// marginTop: isStaged || isFullSize ? 0 : offset.y,
				zIndex: 100 + windowStack.indexOf(id),
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					height: 50,
					width: "100%",
					paddingLeft: 20,
					position: "absolute",
					zIndex: 10,
				}}
				onClick={onFocus}
				{...draggableProps}
			>
				<div
					style={{
						display: "flex",
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
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					width: "100%",
					height: "100%",
					overflow: "auto",
					borderRadius: "12px",
				}}
				onClick={onFocus}
			>
				{<Content />}
			</div>
			{!isFullSize && (
				<ResizeHandles
					size={size}
					position={position}
					onMouseDown={handleMouseDown}
					draggingEdge={draggingEdge}
				/>
			)}
		</div>
	);
};

export default AppWindow;
