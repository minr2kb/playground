import { atom } from "recoil";
import { UUID, Theme, DirMap } from "./types/interfaces";

export const windowFocusRecoil = atom<UUID | null>({
	key: "windowFocusRecoil",
	default: null,
});

export const windowStackRecoil = atom<UUID[]>({
	key: "windowStackRecoil",
	default: [],
});

export const themeRecoil = atom<Theme>({
	key: "themeRecoil",
	default: Theme.DARK,
});

export const rootDirRecoil = atom<UUID[]>({
	key: "rootDirRecoil",
	default: [],
});

export const dirMapRecoil = atom<DirMap>({
	key: "dirMapRecoil",
	default: {},
});
