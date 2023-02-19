import { useState } from "react";
import useInterval from "./useInterval";

function useSequence(max: number, interval: number, direction?: "up" | "down") {
	const [count, setCount] = useState(1);
	const [increase, setIncrease] = useState(true);

	useInterval(
		() => {
			setCount(prev => {
				if (prev === 1) {
					setIncrease(true);
					return prev + 1;
				} else if (prev < max) return increase ? prev + 1 : prev - 1;
				else {
					setIncrease(false);
					return prev - 1;
				}
			});
		},
		(direction === "down" && count === 1) ||
			(direction === "up" && count === max - 1)
			? null
			: interval
	);

	return count;
}

export default useSequence;
