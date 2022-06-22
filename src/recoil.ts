import { atom } from "recoil";
import { UUID, Theme } from "./home/const/interfaces";

export const windowStackRecoil = atom<UUID[]>({
	key: "windowStackRecoil",
	default: [],
});

export const windowFocusRecoil = atom<UUID | null>({
	key: "windowFocusRecoil",
	default: null,
});

export const themeRecoil = atom<Theme>({
	key: "themeRecoil",
	default: "DARK",
});
