import React, { useState, useRef } from "react";
import { Coordinate } from "../interfaces";

const useDraggable = (): [
	{
		onDrag: (e: React.DragEvent<HTMLElement>) => void;
		onDragStart: (e: React.DragEvent<HTMLElement>) => void;
		onDragEnd: () => void;
		onDragOver: (e: React.DragEvent<HTMLElement>) => void;
	},
	Coordinate,
	boolean,
	React.RefObject<HTMLDivElement>
] => {
	const [currentPosition, setCurrentPosition] = useState<Coordinate>({
		x: 0,
		y: 0,
	});
	const [positionOffset, setPositionOffset] = useState<Coordinate>({
		x: 0,
		y: 0,
	});
	const [initPosition, setInitPosition] = useState<Coordinate>({
		x: 0,
		y: 0,
	});
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const imgRef = useRef<HTMLDivElement>(null);

	const pic = new Image();
	pic.src =
		"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; //transparent gif, resolves issue with Safari that otherwise does not allow dragging
	pic.style.visibility = "hidden";

	const onDrag = (e: React.DragEvent<HTMLElement>) => {
		setIsDragging(true);
		setPositionOffset({
			x: e.pageX - initPosition.x,
			y: e.pageY - initPosition.y,
		});
	};
	const onDragStart = (e: React.DragEvent<HTMLElement>) => {
		e.dataTransfer.setDragImage(
			imgRef?.current || pic,
			(imgRef.current?.clientWidth || 0) / 2,
			(imgRef.current?.clientHeight || 0) / 2
		);
		setInitPosition({ x: e.pageX, y: e.pageY });
	};

	const onDragEnd = () => {
		setIsDragging(false);
		setPositionOffset({
			x: 0,
			y: 0,
		});
		setCurrentPosition(prev => {
			return {
				x: prev.x + positionOffset.x,
				y: prev.y + positionOffset.y,
			};
		});
	};

	const onDragOver = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault();
	};

	const draggerableProps = {
		draggable: true,
		onDrag,
		onDragOver,
		onDragStart,
		onDragEnd,
	};

	const offset = {
		x: currentPosition.x + positionOffset.x,
		y: currentPosition.y + positionOffset.y,
	};

	return [draggerableProps, offset, isDragging, imgRef];
};

export default useDraggable;
