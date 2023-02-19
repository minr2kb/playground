import React, { useState } from "react";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { CgClose } from "react-icons/cg";
import { BsDash } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { themeRecoil } from "../recoil";
import { Theme } from "../types/interfaces";

interface CloseButtonsProps {
	onClose: React.MouseEventHandler<HTMLDivElement>;
	onStage: React.MouseEventHandler<HTMLDivElement>;
	setIsFullSize: React.Dispatch<React.SetStateAction<boolean>>;
	isFocused?: boolean;
}

const CloseButtons: React.FC<CloseButtonsProps> = ({
	onClose,
	onStage,
	setIsFullSize,
	isFocused = true,
}) => {
	const [isHovering, setIsHovering] = useState(false);
	const RADIUS = 13;
	const theme = useRecoilValue(themeRecoil);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: 60,
				height: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: RADIUS,
					height: RADIUS,
					borderRadius: "50%",
					backgroundColor:
						isFocused || isHovering
							? "#FF5F57"
							: theme === Theme.DARK
							? "#666"
							: "#ACACAC",
				}}
				onMouseOver={isFocused ? () => setIsHovering(true) : undefined}
				onMouseLeave={
					isFocused ? () => setIsHovering(false) : undefined
				}
				onClick={isFocused ? onClose : undefined}
			>
				{isHovering && <CgClose size={12} color="rgba(0,0,0,0.6)" />}
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: RADIUS,
					height: RADIUS,
					borderRadius: "50%",
					backgroundColor:
						isFocused || isHovering
							? "#FFBC22"
							: theme === Theme.DARK
							? "#666"
							: "#ACACAC",
				}}
				onMouseOver={isFocused ? () => setIsHovering(true) : undefined}
				onMouseLeave={
					isFocused ? () => setIsHovering(false) : undefined
				}
				onClick={isFocused ? onStage : undefined}
			>
				{isHovering && <BsDash size={20} color="rgba(0,0,0,0.6)" />}
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: RADIUS,
					height: RADIUS,
					borderRadius: "50%",
					backgroundColor:
						isFocused || isHovering
							? "#29C73F"
							: theme === Theme.DARK
							? "#666"
							: "#ACACAC",
				}}
				onMouseOver={isFocused ? () => setIsHovering(true) : undefined}
				onMouseLeave={
					isFocused ? () => setIsHovering(false) : undefined
				}
				onClick={
					isFocused ? () => setIsFullSize(prev => !prev) : undefined
				}
			>
				{isHovering && (
					<div
						style={{
							display: "flex",
							transform: "rotate(45deg)",
						}}
					>
						<GoTriangleLeft size={10} color="rgba(0,0,0,0.5)" />
						<GoTriangleRight
							size={10}
							color="rgba(0,0,0,0.5)"
							style={{ marginLeft: -4 }}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default CloseButtons;
