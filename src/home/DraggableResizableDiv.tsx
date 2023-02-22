import useDragResizable from "../utils/hooks/useDragResizable";
import ResizeHandles from "./ResizeHandles";

function DraggableResizableDiv() {
	const [
		position,
		size,
		draggableProps,
		isDragging,
		draggingEdge,
		handleMouseDown,
	] = useDragResizable({
		width: 900,
		height: 500,
	});
	// const [position, setPosition] = useState<Coordinate>({ x: 50, y: 50 });
	// const [size, setSize] = useState<Size>({ width: 600, height: 400 });
	// const [draggingEdge, setDraggingEdge] = useState<Edge>();

	// const MIN_HEIGHT = 200;
	// const MIN_WIDTH = 200;

	// const handleMouseDown: MouseEventHandler<HTMLDivElement> = event => {
	// 	const handleClassList = (event.target as HTMLDivElement).classList;
	// 	const startX = event.clientX;
	// 	const startY = event.clientY;
	// 	const offsetLeft = startX - position.x;
	// 	const offsetTop = startY - position.y;

	// 	const handleMouseMove = (event: MouseEvent) => {
	// 		if (handleClassList.contains("handle-drag")) {
	// 			const newLeft = event.clientX - offsetLeft;
	// 			const newTop = event.clientY - offsetTop;
	// 			setPosition({ x: newLeft, y: newTop });
	// 		}
	// 		if (handleClassList.contains("handle-right")) {
	// 			const newWidth = event.clientX - position.x;
	// 			if (newWidth > MIN_WIDTH) {
	// 				setSize(prev => ({ ...prev, width: newWidth }));
	// 			}
	// 		}
	// 		if (handleClassList.contains("handle-bottom")) {
	// 			const newHeight = event.clientY - position.y;
	// 			if (newHeight > MIN_HEIGHT) {
	// 				setSize(prev => ({ ...prev, height: newHeight }));
	// 			}
	// 		}
	// 		if (handleClassList.contains("handle-left")) {
	// 			const newLeft = event.clientX;
	// 			const newWidth = size.width + (position.x - newLeft);
	// 			if (newWidth > MIN_WIDTH) {
	// 				setPosition(prev => ({ ...prev, x: newLeft }));
	// 				setSize(prev => ({ ...prev, width: newWidth }));
	// 			}
	// 		}
	// 		if (handleClassList.contains("handle-top")) {
	// 			const newTop = event.clientY;
	// 			const newHeight = size.height + (position.y - newTop);
	// 			if (newHeight > MIN_HEIGHT) {
	// 				setPosition(prev => ({ ...prev, y: newTop }));
	// 				setSize(prev => ({ ...prev, height: newHeight }));
	// 			}
	// 		}
	// 	};

	// 	event.currentTarget.addEventListener("mousemove", handleMouseMove);

	// 	const handleMouseOut = (e: MouseEvent) => {
	// 		console.log("out");
	// 		setDraggingEdge(undefined);
	// 		(e.target as HTMLDivElement).removeEventListener(
	// 			"mousemove",
	// 			handleMouseMove
	// 		);
	// 		(e.target as HTMLDivElement).removeEventListener(
	// 			"mouseout",
	// 			handleMouseOut
	// 		);
	// 	};

	// 	event.currentTarget.addEventListener("mouseout", handleMouseOut);
	// 	event.currentTarget.addEventListener("mouseup", handleMouseOut);
	// };

	return (
		<div
			style={{
				position: "absolute",
				left: `${position.x}px`,
				top: `${position.y}px`,
				width: `${size.width}px`,
				height: `${size.height}px`,
				backgroundColor: "#ddd",
				border: "1px solid #000",
				boxSizing: "border-box",
			}}
		>
			<div
				style={{
					width: size.width,
					height: 50,
					border: "1px solid black",
					// cursor: "move",
				}}
				{...draggableProps}
			/>
			{/* <div
				className="handle-top"
				onMouseDown={e => {
					setDraggingEdge(Edge.TOP);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					top: draggingEdge === Edge.TOP ? -200 : -7,
					left: 8,
					width: size.width - 20,
					height: draggingEdge === Edge.TOP ? 400 : 14,
					border: "1px solid black",
					cursor: "ns-resize",
				}}
			/>
			<div
				className="handle-right"
				onMouseDown={e => {
					setDraggingEdge(Edge.RIGHT);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					top: 8,
					right: draggingEdge === Edge.RIGHT ? -200 : -7,
					width: draggingEdge === Edge.RIGHT ? 400 : 14,
					height: size.height - 20,
					border: "1px solid black",
					cursor: "ew-resize",
				}}
			/>
			<div
				className="handle-bottom"
				onMouseDown={e => {
					setDraggingEdge(Edge.BOTTOM);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					bottom: draggingEdge === Edge.BOTTOM ? -200 : -7,
					left: 8,
					width: size.width - 20,
					height: draggingEdge === Edge.BOTTOM ? 400 : 14,
					border: "1px solid black",
					cursor: "ns-resize",
				}}
			/>
			<div
				className="handle-left"
				onMouseDown={e => {
					setDraggingEdge(Edge.LEFT);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					top: 8,
					left: draggingEdge === Edge.LEFT ? -200 : -7,
					width: draggingEdge === Edge.LEFT ? 400 : 14,
					height: size.height - 20,
					border: "1px solid black",
					cursor: "ew-resize",
				}}
			/>
			<div
				className="handle-top handle-left"
				onMouseDown={e => {
					setDraggingEdge(Edge.TOP_LEFT);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					top: draggingEdge === Edge.TOP_LEFT ? -200 : -7,
					left: draggingEdge === Edge.TOP_LEFT ? -200 : -7,
					width: draggingEdge === Edge.TOP_LEFT ? 400 : 14,
					height: draggingEdge === Edge.TOP_LEFT ? 400 : 14,
					border: "1px solid black",
					cursor: "nwse-resize",
				}}
			/>

			<div
				className="handle-top handle-right"
				onMouseDown={e => {
					setDraggingEdge(Edge.TOP_RIGHT);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					top: draggingEdge === Edge.TOP_RIGHT ? -200 : -7,
					right: draggingEdge === Edge.TOP_RIGHT ? -200 : -7,
					width: draggingEdge === Edge.TOP_RIGHT ? 400 : 14,
					height: draggingEdge === Edge.TOP_RIGHT ? 400 : 14,
					border: "1px solid black",
					cursor: "nesw-resize",
				}}
			/>
			<div
				className="handle-bottom handle-right"
				onMouseDown={e => {
					setDraggingEdge(Edge.BOTTOM_RIGHT);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					bottom: draggingEdge === Edge.BOTTOM_RIGHT ? -200 : -7,
					right: draggingEdge === Edge.BOTTOM_RIGHT ? -200 : -7,
					width: draggingEdge === Edge.BOTTOM_RIGHT ? 400 : 14,
					height: draggingEdge === Edge.BOTTOM_RIGHT ? 400 : 14,
					border: "1px solid black",
					cursor: "nwse-resize",
				}}
			/>
			<div
				className="handle-bottom handle-left"
				onMouseDown={e => {
					setDraggingEdge(Edge.BOTTOM_LEFT);
					handleMouseDown(e);
				}}
				style={{
					position: "absolute",
					bottom: draggingEdge === Edge.BOTTOM_LEFT ? -200 : -7,
					left: draggingEdge === Edge.BOTTOM_LEFT ? -200 : -7,
					width: draggingEdge === Edge.BOTTOM_LEFT ? 400 : 14,
					height: draggingEdge === Edge.BOTTOM_LEFT ? 400 : 14,
					border: "1px solid black",
					cursor: "nesw-resize",
				}}
			/> */}
			<ResizeHandles
				size={size}
				position={position}
				onMouseDown={handleMouseDown}
				draggingEdge={draggingEdge}
			/>
		</div>
	);
}

export default DraggableResizableDiv;
