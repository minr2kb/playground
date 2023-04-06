import { Coordinate, Edge, Size } from "../types/interfaces";

export interface ResizeHandlesProps {
	size: Size;
	position: Coordinate;
	onMouseDown: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		edge: Edge
	) => void;
	draggingEdge?: Edge;
}

const ResizeHandles: React.FC<ResizeHandlesProps> = ({
	size,
	position,
	onMouseDown,
	draggingEdge,
}) => (
	<>
		<div
			id="handle-top"
			onMouseDown={e => {
				onMouseDown(e, Edge.TOP);
			}}
			style={{
				position: "absolute",
				top: draggingEdge === Edge.TOP ? -200 : -7,
				left: 8,
				width: size.width - 20,
				height: draggingEdge === Edge.TOP ? 400 : 14,
				// border: "1px solid black",
				cursor: "ns-resize",
				zIndex: 99,
			}}
		/>
		<div
			id="handle-right"
			onMouseDown={e => {
				onMouseDown(e, Edge.RIGHT);
			}}
			style={{
				position: "absolute",
				top: 8,
				right: draggingEdge === Edge.RIGHT ? -200 : -7,
				width: draggingEdge === Edge.RIGHT ? 400 : 14,
				height: size.height - 20,
				// border: "1px solid black",
				cursor: "ew-resize",
				zIndex: 99,
			}}
		/>
		<div
			id="handle-bottom"
			onMouseDown={e => {
				onMouseDown(e, Edge.BOTTOM);
			}}
			style={{
				position: "absolute",
				bottom: draggingEdge === Edge.BOTTOM ? -200 : -7,
				left: 8,
				width: size.width - 20,
				height: draggingEdge === Edge.BOTTOM ? 400 : 14,
				// border: "1px solid black",
				cursor: "ns-resize",
				zIndex: 99,
			}}
		/>
		<div
			id="handle-left"
			onMouseDown={e => {
				onMouseDown(e, Edge.LEFT);
			}}
			style={{
				position: "absolute",
				top: 8,
				left: draggingEdge === Edge.LEFT ? -200 : -7,
				width: draggingEdge === Edge.LEFT ? 400 : 14,
				height: size.height - 20,
				// border: "1px solid black",
				cursor: "ew-resize",
				zIndex: 99,
			}}
		/>
		<div
			id="handle-top handle-left"
			onMouseDown={e => {
				onMouseDown(e, Edge.TOP_LEFT);
			}}
			style={{
				position: "absolute",
				top: draggingEdge === Edge.TOP_LEFT ? -200 : -7,
				left: draggingEdge === Edge.TOP_LEFT ? -200 : -7,
				width: draggingEdge === Edge.TOP_LEFT ? 400 : 14,
				height: draggingEdge === Edge.TOP_LEFT ? 400 : 14,
				// border: "1px solid black",
				cursor: "nwse-resize",
				zIndex: 99,
			}}
		/>

		<div
			id="handle-top handle-right"
			onMouseDown={e => {
				onMouseDown(e, Edge.TOP_RIGHT);
			}}
			style={{
				position: "absolute",
				top: draggingEdge === Edge.TOP_RIGHT ? -200 : -7,
				right: draggingEdge === Edge.TOP_RIGHT ? -200 : -7,
				width: draggingEdge === Edge.TOP_RIGHT ? 400 : 14,
				height: draggingEdge === Edge.TOP_RIGHT ? 400 : 14,
				// border: "1px solid black",
				cursor: "nesw-resize",
				zIndex: 99,
			}}
		/>
		<div
			id="handle-bottom handle-right"
			onMouseDown={e => {
				onMouseDown(e, Edge.BOTTOM_RIGHT);
			}}
			style={{
				position: "absolute",
				bottom: draggingEdge === Edge.BOTTOM_RIGHT ? -200 : -7,
				right: draggingEdge === Edge.BOTTOM_RIGHT ? -200 : -7,
				width: draggingEdge === Edge.BOTTOM_RIGHT ? 400 : 14,
				height: draggingEdge === Edge.BOTTOM_RIGHT ? 400 : 14,
				// border: "1px solid black",
				cursor: "nwse-resize",
				zIndex: 99,
			}}
		/>
		<div
			id="handle-bottom handle-left"
			onMouseDown={e => {
				onMouseDown(e, Edge.BOTTOM_LEFT);
			}}
			style={{
				position: "absolute",
				bottom: draggingEdge === Edge.BOTTOM_LEFT ? -200 : -7,
				left: draggingEdge === Edge.BOTTOM_LEFT ? -200 : -7,
				width: draggingEdge === Edge.BOTTOM_LEFT ? 400 : 14,
				height: draggingEdge === Edge.BOTTOM_LEFT ? 400 : 14,
				// border: "1px solid black",
				cursor: "nesw-resize",
				zIndex: 99,
			}}
		/>
	</>
);

export default ResizeHandles;
