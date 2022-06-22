import { useRef } from "react";

const useFullScreen = (callback?: (isFull: boolean) => void) => {
	const elem = useRef<any>(null);
	const runCb = (isFull: boolean) => {
		if (callback && typeof callback === "function") {
			callback(isFull);
		}
	};
	const triggerFull = () => {
		if (elem.current) {
			if (elem.current?.requestFullscreen) {
				elem.current.requestFullscreen();
			} else if (elem.current?.mozRequestFullScreen) {
				elem.current.mozRequestFullScreen();
			} else if (elem.current?.webkitRequestFullscreen) {
				elem.current.webkitRequestFullscreen();
			} else if (elem.current?.msRequestFullscreen) {
				elem.current.msRequestFullscreen();
			}
			runCb(true);
		}
	};

	// const exitFull = () => {
	// 	document.exitFullscreen();
	// 	if (document.exitFullscreen) {
	// 		document.exitFullscreen();
	// 	} else if (document?.mozCancelFullScreen) {
	// 		document?.mozCancelFullScreen();
	// 	} else if (document.webkitExitFullscreen) {
	// 		document.webkitExitFullscreen();
	// 	} else if (document.msExitFullscreen) {
	// 		document.msExitFullscreen();
	// 	}
	// 	runCb(false);
	// };
	return { elem, triggerFull };
};

export default useFullScreen;
