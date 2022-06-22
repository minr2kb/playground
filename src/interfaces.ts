export interface Coordinate {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}

export type Direction = "up" | "down" | "right" | "left";

export interface HeapData {
	priority: number;
	data: any;
}
