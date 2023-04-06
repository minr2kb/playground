import React, { useState, MouseEventHandler } from "react";
import { Coordinate, Edge, Size } from "../../types/interfaces";

const useDragResizable = (
	defaultSize: Size = { width: 600, height: 400 },
	defaultPosition: Coordinate = { x: 100, y: 100 }
): [
	Coordinate,
	Size,
	{ id: string; onMouseDown: MouseEventHandler<HTMLDivElement> },
	boolean,
	Edge | undefined,
	(e: React.MouseEvent<HTMLDivElement, MouseEvent>, edge: Edge) => void
] => {
	const [position, setPosition] = useState<Coordinate>(defaultPosition);
	const [size, setSize] = useState<Size>(defaultSize);
	const [draggingEdge, setDraggingEdge] = useState<Edge>();
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const MIN_HEIGHT = 300;
	const MIN_WIDTH = 450;

	const handleMouseDown: MouseEventHandler<HTMLDivElement> = event => {
		const ids = (event.target as HTMLDivElement).id.split(" ");
		const startX = event.clientX;
		const startY = event.clientY;
		const offsetLeft = startX - position.x;
		const offsetTop = startY - position.y;
		console.log(ids);

		const handleMouseMove = (event: MouseEvent) => {
			console.log("move!");
			setIsDragging(true);
			if (ids.includes("handle-drag")) {
				const newLeft = event.clientX - offsetLeft;
				const newTop = event.clientY - offsetTop;
				console.log(newLeft, newTop);
				setPosition({ x: newLeft, y: Math.max(newTop, 30) });
			}
			if (ids.includes("handle-right")) {
				const newWidth = event.clientX - position.x;

				if (newWidth > MIN_WIDTH) {
					setSize(prev => ({ ...prev, width: newWidth }));
				}
			}
			if (ids.includes("handle-bottom")) {
				const newHeight = event.clientY - position.y;
				if (newHeight > MIN_HEIGHT) {
					setSize(prev => ({ ...prev, height: newHeight }));
				}
			}
			if (ids.includes("handle-left")) {
				const newLeft = event.clientX;
				const newWidth = size.width + (position.x - newLeft);
				if (newWidth > MIN_WIDTH) {
					setPosition(prev => ({ ...prev, x: newLeft }));
					setSize(prev => ({ ...prev, width: newWidth }));
				}
			}
			if (ids.includes("handle-top")) {
				const newTop = event.clientY;
				const newHeight = size.height + (position.y - newTop);
				if (newHeight > MIN_HEIGHT && newTop > 30) {
					setPosition(prev => ({ ...prev, y: newTop }));
					setSize(prev => ({ ...prev, height: newHeight }));
				}
			}
		};

		(event.target as HTMLDivElement).addEventListener(
			"mousemove",
			handleMouseMove
		);

		const handleMouseOut = (e: MouseEvent) => {
			console.log("out");
			setIsDragging(false);
			setDraggingEdge(undefined);
			(e.target as HTMLDivElement).removeEventListener(
				"mousemove",
				handleMouseMove
			);
			(e.target as HTMLDivElement).removeEventListener(
				"mouseout",
				handleMouseOut
			);
		};

		(event.target as HTMLDivElement).addEventListener(
			"mouseout",
			handleMouseOut
		);
		(event.target as HTMLDivElement).addEventListener(
			"mouseup",
			handleMouseOut
		);
	};

	const draggableProps = {
		id: "handle-drag",
		onMouseDown: handleMouseDown,
	};

	return [
		position,
		size,
		draggableProps,
		isDragging,
		draggingEdge,
		(e, edge) => {
			setDraggingEdge(edge);
			handleMouseDown(e);
		},
	];
};

export default useDragResizable;
