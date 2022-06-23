import React, { useEffect, useRef, useState } from "react";
import { Coordinate, HeapData } from "../interfaces";
import Heap from "../utils/Heap";
import useInterval from "../utils/useInterval";

interface RoundFrogProps {}

const SPEED = 10;
const DELAY = 0.5;
const comparator = (a: HeapData, b: HeapData) => a.priority - b.priority;
const heap = new Heap<HeapData>(comparator);

const RoundFrog: React.FC<RoundFrogProps> = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [devMode, setDevMode] = useState(false);
	const [position, setPosition] = useState<Coordinate>({
		x: 400,
		y: 300,
	});
	const [targetPos, setTargetPos] = useState<Coordinate | null>(null);
	const [time, setTime] = useState(1);
	const [frogStatus, setFrogStatus] = useState<"moving" | "eating" | null>(
		null
	);
	const [angle, setAngle] = useState<number>(90);
	const [curveDirection, setCurveDirection] = useState<
		"X" | "Y" | "straight"
	>("straight");
	const [offsetLeft, setOffsetLeft] = useState(0);
	const [offsetTop, setOffsetTop] = useState(0);

	const getDist = (initPos: Coordinate, termPos: Coordinate) => {
		return Math.hypot(termPos.x - initPos.x, termPos.y - initPos.y);
	};

	const getDistTime = (initPos: Coordinate, termPos: Coordinate) => {
		return (getDist(initPos, termPos) * 100) / SPEED;
	};

	const getAngle = (initPos: Coordinate, termPos: Coordinate) => {
		return (
			-(Math.atan2(termPos.y - initPos.y, termPos.x - initPos.x) * 180) /
			Math.PI
		);
	};

	const addPoint = (pos: Coordinate) => {
		if (frogStatus === null) {
			setTargetPos(pos);
			move(position, pos);
		} else {
			heap.push({ priority: getDist(position, pos), data: pos });
		}
	};

	const move = (from: Coordinate, to: Coordinate) => {
		setFrogStatus("moving");
		const distTime = getDistTime(from, to) + Math.random() * 2000;
		const ang = getAngle(from, to);
		setAngle(ang);
		setTime(distTime);
		setPosition(to);
		next(distTime, to);
	};

	const next = (time: number, from: Coordinate) => {
		setTimeout(() => {
			const min = heap.pop();
			setFrogStatus("eating");
			if (min) setTargetPos(min.data);
			setTimeout(() => {
				if (min) {
					// setCurveDirection(prev => (prev === "X" ? "Y" : "X"));
					move(from, min.data);
				} else {
					setCurveDirection("straight");
					setTargetPos(null);
					setFrogStatus(null);
				}
			}, DELAY * 1000);
		}, time);
	};

	useEffect(() => {
		const grandPar = containerRef.current?.parentElement?.parentElement;
		setOffsetLeft(grandPar?.offsetLeft || 0);
		setOffsetTop(grandPar?.offsetTop || 0);
	}, [containerRef.current?.clientWidth, position]);

	useEffect(() => {
		const arr = [...heap.heapArray];
		heap.clear();
		heap.addAll(
			arr.map(elem => {
				return {
					priority: getDist(position, elem.data),
					data: elem.data,
				};
			})
		);
	}, [position]);

	useEffect(() => {
		return () => heap.clear();
	}, []);

	useInterval(
		//TODO: random event
		() => {
			move(position, {
				x: position.x + (Math.random() - 0.5) * 100,
				y: position.y + (Math.random() - 0.5) * 100,
			});
		},
		frogStatus === null ? 5000 : null
	);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				backgroundColor: "white",
			}}
			onClick={e => {
				const newPosition = {
					x: e.pageX - (offsetLeft || 0),
					y: e.pageY - (offsetTop || 0),
				};
				addPoint(newPosition);
			}}
			ref={containerRef}
		>
			{heap.heapArray.map((pos, i) => (
				<div
					key={`point(${pos.data.x}, ${pos.data.y}) - ${i}`}
					style={{
						position: "absolute",
						top: pos.data.y - 8,
						left: pos.data.x - 12,
						color: "black",
						fontSize: 8,
					}}
				>
					<img
						src={"/images/interactive/worm.gif"}
						alt={"worm"}
						style={{
							width: "24px",
							height: "16px",
						}}
						draggable={false}
					/>
					{devMode && <>{pos.priority.toFixed(2)}</>}
				</div>
			))}
			{targetPos !== null && (
				<div
					style={{
						position: "absolute",
						top: targetPos.y - 8,
						left: targetPos.x - 12,
						color: "black",
						fontSize: 8,
					}}
				>
					<img
						src={"/images/interactive/worm.gif"}
						alt={"worm"}
						style={{
							width: "24px",
							height: "16px",
						}}
						draggable={false}
					/>
					{devMode && <>{"target"}</>}
				</div>
			)}
			<img
				src={
					frogStatus === "moving"
						? "/images/interactive/moving_rainfrog.gif"
						: frogStatus === "eating"
						? "/images/interactive/eating_rainfrog.gif"
						: "/images/interactive/stop_rainfrog.gif"
				}
				alt={"rainfrog"}
				style={{
					position: "absolute",
					top: position.y - 65 / 2,
					left: position.x - 25,
					width: "50px",
					height: "65px",
					transform: `rotate(${90 - angle}deg)`,
					transition: `top ease-${
						curveDirection === "X" || curveDirection !== "straight"
							? "out"
							: "in"
					} ${time / 1000}s, left ease-${
						curveDirection === "X" || curveDirection === "straight"
							? "in"
							: "out"
					} ${time / 1000}s, transform ease-in 0.5s`,
					cursor: frogStatus === null ? "pointer" : "default",
				}}
				draggable={false}
				onClick={e => {
					e.stopPropagation();
					if (frogStatus === null)
						move(position, {
							x: position.x + (Math.random() - 0.5) * 300,
							y: position.y + (Math.random() - 0.5) * 300,
						});
				}}
			/>

			<div
				style={{
					position: "absolute",
					right: 10,
					bottom: 10,
					color: "black",
					fontSize: 8,
				}}
			>
				{devMode ? (
					<>
						pos: ({position.x.toFixed(2)}, {position.y.toFixed(2)})
						<br />
						ang: {angle.toFixed(2)} deg
						<br />
						time: {(time / 1000).toFixed(2)}s
						<br />
						stat: {frogStatus || "none"}
					</>
				) : (
					<button
						onClick={e => {
							e.stopPropagation();
							setDevMode(true);
						}}
						style={{
							backgroundColor: "white",
							border: "solid 1px #666",
							borderRadius: "5px",
							color: "#666",
							cursor: "pointer",
						}}
					>
						Dev mode
					</button>
				)}
			</div>
		</div>
	);
};

export default RoundFrog;
