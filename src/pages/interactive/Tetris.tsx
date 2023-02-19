import React, { useEffect, useRef, useState } from "react";
import { Direction, Coordinate, AppInfo } from "../../types/interfaces";
import useInterval from "../../utils/hooks/useInterval";

type MapType<E> = E[][];

type Bitmap = MapType<number>;
type Objmap = MapType<string>;

enum Shapes {
	ㅗ = 1,
	ㅣ = 2,
	ㅁ = 3,
	ㄱ = 4,
	ㄴ = 5,
	ㄹ = 6,
}

const blockColors = {
	[Shapes.ㅗ]: "red",
	[Shapes.ㅣ]: "orange",
	[Shapes.ㅁ]: "yellow",
	[Shapes.ㄱ]: "green",
	[Shapes.ㄴ]: "blue",
	[Shapes.ㄹ]: "purple",
};

const generateEmptymap = (
	rowNum: number,
	colNum: number,
	value?: any
): any[][] => {
	return [...Array(rowNum)].map(() =>
		[...Array(colNum)].map(() => (value !== undefined ? value : 0))
	);
};

const generateShapeBitmap = (shape: Shapes) => {
	switch (shape) {
		case Shapes.ㄱ:
			return [
				[1, 1, 0],
				[0, 1, 0],
				[0, 1, 0],
			];
		case Shapes.ㄴ:
			return [
				[1, 0, 0],
				[1, 1, 1],
				[0, 0, 0],
			];
		case Shapes.ㄹ:
			return [
				[1, 1, 0],
				[0, 1, 1],
				[0, 0, 0],
			];
		case Shapes.ㅁ:
			return [
				[1, 1],
				[1, 1],
			];
		case Shapes.ㅗ:
			return [
				[0, 1, 0],
				[1, 1, 1],
				[0, 0, 0],
			];
		case Shapes.ㅣ:
			return [
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
			];
	}
};

const rotateBitmap = (bitmap: Bitmap) => {
	return bitmap.map((_r, i) => [
		...bitmap.map(row => row[bitmap[i].length - i - 1]),
	]);
};

const gameOver = (objMap: Objmap) => {
	return objMap[0].filter(bit => bit !== "").length > 0;
};

const expandBitmap = (
	bitmap: Bitmap,
	rowNum: number,
	colNum: number,
	offsetX: number,
	offsetY: number
) => {
	const expanded = [];
	const baseOffsetX = Math.floor((colNum - bitmap.length) / 2) + offsetX;
	for (let index = 0; index < rowNum; index++) {
		if (index >= offsetY && index < offsetY + bitmap.length) {
			expanded.push(
				[...Array(colNum)].map((_n, i) =>
					i >= baseOffsetX && i < baseOffsetX + bitmap.length
						? bitmap[index - offsetY][i - baseOffsetX]
						: 0
				)
			);
		} else {
			expanded.push([...Array(colNum)].map(() => 0));
		}
	}
	return expanded;
};

const isMovable = (objmap: Objmap, dynamicmap: Bitmap): boolean => {
	// bitmap끼리 SUM 한 뒤 2 나오면 false.
	const blockSum = dynamicmap.reduce(
		(partialSum, row) => partialSum + row.reduce((ps, bit) => ps + bit, 0),
		0
	);
	if (blockSum < 4) return false;

	for (let ri = 0; ri < objmap.length; ri++) {
		for (let ci = 0; ci < objmap[ri].length; ci++) {
			if (objmap[ri][ci] !== "" && dynamicmap[ri][ci]) {
				return false;
			}
		}
	}
	return true;
};

const mergeMaps = (objmap: Objmap, dynamicmap: Objmap): Objmap => {
	// bitmap에서 objmap으로 merge
	return objmap.map((row, ri) =>
		row.map((bit, ci) => bit || dynamicmap[ri][ci])
	);
};

export interface TetrisProps {}

const Tetris: React.FC<TetrisProps> = () => {
	const rowNum = 20;
	const colNum = 10;
	const blockList = [
		Shapes.ㄱ,
		Shapes.ㄴ,
		Shapes.ㄹ,
		Shapes.ㅁ,
		Shapes.ㅗ,
		Shapes.ㅣ,
	];

	const [dynamicmap, setDynamicmap] = useState<Bitmap>(
		generateEmptymap(rowNum, colNum)
	);
	const [bitmap, setBitmap] = useState<Bitmap>(generateEmptymap(3, 3));
	const [objmap, setObjmap] = useState<Objmap>(
		generateEmptymap(rowNum, colNum, "")
	);
	const [offset, setOffset] = useState<Coordinate>({ x: 0, y: 0 });
	const [score, setScore] = useState(0);
	const [isBlockFixed, setIsBlockFixed] = useState(true);
	const [nextShape, setNextShape] = useState<Shapes>(
		blockList[Math.round(Math.random() * 5)]
	);
	const [currentShape, setCurrentShape] = useState<Shapes>(
		blockList[Math.round(Math.random() * 5)]
	);
	const [isGameOver, setIsGameOver] = useState(false);

	const dynamicmapRef = useRef<Bitmap>(generateEmptymap(rowNum, colNum));
	const bitmapRef = useRef<Bitmap>(generateEmptymap(3, 3));
	const objmapRef = useRef<Objmap>(generateEmptymap(rowNum, colNum, ""));
	const offsetRef = useRef<Coordinate>({ x: 0, y: 0 });
	const currentShapeRef = useRef<Shapes>(
		blockList[Math.round(Math.random() * 5)]
	);

	const checkLineFilled = (objmap: Objmap): Objmap => {
		console.log("checkLineFilled!");
		let count = 0;
		const reducedObjmap = objmap.filter(row => {
			let isNotFilled = false;
			row.forEach(bit => {
				if (bit === "") isNotFilled = true;
			});
			if (!isNotFilled) count += 1;

			return isNotFilled;
		});
		setScore(prev => prev + count * 50);
		return [
			...generateEmptymap(count, objmap[0].length, ""),
			...reducedObjmap,
		];
	};

	const move = (direction: Direction) => {
		switch (direction) {
			case Direction.RIGHT:
				const rightDynamicMap = expandBitmap(
					bitmapRef.current,
					rowNum,
					colNum,
					offsetRef.current.x + 1,
					offsetRef.current.y
				);
				if (isMovable(objmapRef.current, rightDynamicMap)) {
					setDynamicmap(rightDynamicMap);
					setOffset(prev => {
						return { ...prev, x: prev.x + 1 };
					});
				}
				break;
			case Direction.LEFT:
				const leftDynamicMap = expandBitmap(
					bitmapRef.current,
					rowNum,
					colNum,
					offsetRef.current.x - 1,
					offsetRef.current.y
				);
				if (isMovable(objmapRef.current, leftDynamicMap)) {
					setDynamicmap(leftDynamicMap);
					setOffset(prev => {
						return { ...prev, x: prev.x - 1 };
					});
				}

				break;
			case Direction.DOWN:
				const downDynamicMap = expandBitmap(
					bitmapRef.current,
					rowNum,
					colNum,
					offsetRef.current.x,
					offsetRef.current.y + 1
				);

				if (isMovable(objmapRef.current, downDynamicMap)) {
					setDynamicmap(downDynamicMap);
					setOffset(prev => {
						return { ...prev, y: prev.y + 1 };
					});
				} else {
					const dynamicColorMap = dynamicmapRef.current.map(row =>
						row.map(bit =>
							bit ? blockColors[currentShapeRef.current] : ""
						)
					);
					const mergedMap = mergeMaps(
						objmapRef.current,
						dynamicColorMap
					);

					setObjmap(mergedMap);
					if (gameOver(mergedMap)) setIsGameOver(true);
					setDynamicmap(generateEmptymap(rowNum, colNum));
					setOffset({ x: 0, y: 0 });
					setBitmap(generateEmptymap(3, 3));
					setIsBlockFixed(true);
				}
				break;
			default:
				break;
		}
	};

	const rotate = () => {
		const rotatedBitmap = rotateBitmap(bitmapRef.current);
		const newDynamicMap = expandBitmap(
			rotatedBitmap,
			rowNum,
			colNum,
			offsetRef.current.x,
			offsetRef.current.y
		);

		if (isMovable(objmapRef.current, newDynamicMap)) {
			setBitmap(rotatedBitmap);
			setDynamicmap(newDynamicMap);
		}
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		e.preventDefault();
		if (e.key === "ArrowRight") move(Direction.RIGHT);
		if (e.key === "ArrowLeft") move(Direction.LEFT);
		if (e.key === "ArrowDown") move(Direction.DOWN);
		if (e.key === "ArrowUp") rotate();
	};

	useInterval(
		() => {
			move(Direction.DOWN);
		},
		isGameOver ? null : 1000 - score * 0.1
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyPress);
		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	useEffect(() => {
		currentShapeRef.current = currentShape;
	}, [currentShape]);
	useEffect(() => {
		objmapRef.current = objmap;
	}, [objmap]);
	useEffect(() => {
		dynamicmapRef.current = dynamicmap;
	}, [dynamicmap]);
	useEffect(() => {
		bitmapRef.current = bitmap;
	}, [bitmap]);
	useEffect(() => {
		offsetRef.current = offset;
	}, [offset]);

	useEffect(() => {
		if (isBlockFixed) {
			console.log("isBlockFixed");
			setCurrentShape(nextShape);
			setObjmap(prev => checkLineFilled(prev));
			const genBitmap = generateShapeBitmap(nextShape);
			const expandedBitmap = expandBitmap(
				genBitmap,
				rowNum,
				colNum,
				0,
				0
			);
			setBitmap(genBitmap);
			setDynamicmap(expandedBitmap);
			setIsBlockFixed(false);
			setNextShape(blockList[Math.round(Math.random() * 5)]);
		}
	}, [isBlockFixed]);

	return (
		<div
			style={{
				padding: "50px",
				paddingTop: "70px",
				display: "flex",
			}}
		>
			<div style={{ outline: "1px solid #666", height: "fit-content" }}>
				{dynamicmap?.map((row, ri) => (
					<div
						key={`row-${ri}`}
						style={{
							display: "flex",
						}}
					>
						{row?.map((bit, ci) => (
							<div
								key={`bit-${ci}`}
								style={{
									width: "20px",
									height: "20px",
									textAlign: "center",
									backgroundColor: bit
										? blockColors[currentShape]
										: objmap[ri][ci],
									borderRadius: 10,
									outline: "1px solid #666",
									outlineOffset: "-1px",
								}}
							>
								{/* {bit || objmap[ri][ci]} */}
							</div>
						))}
					</div>
				))}
			</div>
			<div style={{ marginLeft: "20px" }}>
				Score: {score}
				<p />
				Next Block:
				<p />
				{/* {expandBitmap(generateShapeBitmap(nextShape), 4, 4, 0, 0).map( */}
				{generateShapeBitmap(nextShape).map((row, ri) => (
					<div key={`row-${ri}`} style={{ display: "flex" }}>
						{row?.map((bit, ci) => (
							<div
								key={`bit-${ci}`}
								style={{
									width: "20px",
									height: "20px",
									textAlign: "center",
									backgroundColor: bit
										? blockColors[nextShape]
										: "",

									// outline: "1px solid #666",
									// outlineOffset: "-1px",
									borderRadius: 10,
								}}
							></div>
						))}
					</div>
				))}
				<p />
				{isGameOver && <>Game Over!</>}
			</div>
		</div>
	);
};

export const config: AppInfo = {
	name: "Tetris",
	icon: "images/interactive/interactive-tetris.png",
};

export default Tetris;
