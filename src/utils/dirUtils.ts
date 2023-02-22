import { App, DirMap, DirType, Folder, Tree, UUID } from "../types/interfaces";
import { v4 as uuidv4 } from "uuid";

function makeDirTree(paths: string[]): Tree<string> {
	const tree: Tree<string> = {};

	paths.forEach(path => {
		const parts = path.slice(2).split("/");
		let node = tree;

		parts.forEach((part, index) => {
			if (!node[part]) {
				node[part] = index === parts.length - 1 ? path.slice(2) : {};
			}

			node = node[part] as Tree<string>;
		});
	});

	return tree;
}

const createDirMap = async (
	tree: Tree<string>
): Promise<{ rootDir: UUID[]; dirMap: DirMap }> => {
	const rootDir: UUID[] = [];
	const dirMap: DirMap = {};

	const addApp = async (subTree: Tree<string>, uuid: UUID, name: string) => {
		if (typeof subTree === "string") {
			// 앱 생성
			import(`../pages/${subTree}`).then(mod => {
				const app: App = {
					type: DirType.APP,
					id: uuid,
					component: mod.default,
					name: mod.config?.name || name,
					icon: mod.config?.icon || "images/default_app_icon.png",
				};
				dirMap[uuid] = app;
			});
		} else {
			// 폴더 생성
			const folder: Folder = {
				type: DirType.FOLDER,
				id: uuid,
				childrenNodes: [],
				name: name,
			};
			Object.keys(subTree).forEach(async dir => {
				const nextName = dir;
				const nextUUID = uuidv4();
				folder.childrenNodes = [...folder.childrenNodes, nextUUID];
				await addApp(subTree[dir] as Tree<string>, nextUUID, nextName);
			});
			dirMap[uuid] = folder;
		}
	};

	Object.keys(tree).forEach(async dir => {
		const nextName = dir;
		const nextUUID = uuidv4();
		rootDir.push(nextUUID);
		await addApp(tree[dir] as Tree<string>, nextUUID, nextName);
	});

	return { rootDir, dirMap };
};

export const getComponentTree = async (
	dir: __WebpackModuleApi.RequireContext
): Promise<{ rootDir: UUID[]; dirMap: DirMap }> => {
	const keys = dir.keys();
	const componentTree = makeDirTree(keys);
	return await createDirMap(componentTree);
};
