// Common types
export interface Coordinate {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}

export enum Direction {
	UP = "up",
	DOWN = "down",
	RIGHT = "right",
	LEFT = "left",
}

export interface HeapData {
	priority: number;
	data: any;
}

export interface Tree<T> {
	[key: string]: T | Tree<T>;
}

export enum Theme {
	LIGHT,
	DARK,
}

// App types

export type UUID = string;

export enum DirType {
	FOLDER,
	APP,
}

export interface AppInfo {
	name: string;
	icon?: string;
}
export interface App extends AppInfo {
	type: DirType;
	id: UUID;
	component: React.FC;
}

export interface Folder {
	type: DirType;
	id: UUID;
	childrenNodes: UUID[];
	name: string;
}

export interface DirMap {
	[dir: UUID]: App | Folder;
}
