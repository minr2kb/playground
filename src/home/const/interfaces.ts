export type UUID = string;
// const crypto = require('crypto');
// crypto.randomUUID()

export type Theme = "LIGHT" | "DARK";

export interface App {
	type: "app" | "folder";
	id: UUID;
	name: string;
	icon: string;
	component: React.FC;
}

export interface Folder {
	type: "app" | "folder";
	id: UUID;
	childrenNodes: UUID[];
	name: string;
}

export interface dirMapType {
	[dir: UUID]: App | Folder;
}
