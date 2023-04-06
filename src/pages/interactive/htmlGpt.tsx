import React, { useEffect, useState } from "react";
import {
	CircularProgress,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Slide,
	Zoom,
} from "@mui/material";
import { AppInfo } from "../../types/interfaces";
import { Send } from "@mui/icons-material";

enum Sender {
	USER,
	CHAT_GPT,
}

interface Chat {
	from: Sender;
	text: string;
}

const LoadingText = () => {
	// const [dots, setDots] = useState("");

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		setDots(dots => (dots.length < 3 ? dots + "." : "."));
	// 	}, 500);

	// 	return () => clearInterval(intervalId);
	// }, []);

	return (
		<Grid
			sx={{
				fontWeight: "bold",
				animation: "blink 1.5s infinite",
				"@keyframes blink": {
					"0%": { opacity: 1 },
					"50%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
			}}
		>
			...
		</Grid>
	);
};

const HtmlGpt: React.FC = () => {
	const [typingText, setTypingText] = useState("");
	const [chats, setChats] = useState<Chat[]>([]);
	const [isReplying, setIsReplying] = useState(false);

	const handleSubmit = () => {
		const newChat = { from: Sender.USER, text: typingText };
		setChats(prev => [...prev, newChat]);
		setIsReplying(true);
		setTimeout(() => {
			const newReply = { from: Sender.CHAT_GPT, text: "" };
			setChats(prev => [...prev, newReply]);
		}, 700);
	};

	return (
		<Grid
			sx={{
				width: "100%",
				height: "100%",
				flexWrap: "wrap",
				overflow: "hidden",
				justifyContent: "space-around",
				position: "relative",
				bgcolor: "#CCC",
				p: 3,
			}}
		>
			{chats.map(chat =>
				chat.from === Sender.USER ? (
					<Grid container p={1} justifyContent={"flex-end"}>
						<Slide
							direction="up"
							in={true}
							mountOnEnter
							unmountOnExit
						>
							<Paper
								elevation={2}
								sx={{
									bgcolor: "#EEE",
									p: 1,
								}}
							>
								<Grid
									container
									sx={{
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									{chat.text}
								</Grid>
							</Paper>
						</Slide>{" "}
					</Grid>
				) : (
					<Grid container p={1}>
						<Zoom in={true} mountOnEnter unmountOnExit>
							<Paper
								elevation={2}
								sx={{
									bgcolor: "#377DF7",
									color: "#EEE",
									p: 1,
								}}
							>
								<Grid
									container
									sx={{
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<LoadingText />
								</Grid>
							</Paper>
						</Zoom>
					</Grid>
				)
			)}
			<Grid
				sx={{
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
				}}
			>
				<Grid
					container
					sx={{
						p: 3,
					}}
				>
					<Paper
						elevation={5}
						sx={{
							height: "40px",
							bgcolor: "#EEE",
							borderRadius: "5px",
							width: "100%",
							p: 1,
						}}
					>
						<Grid
							container
							sx={{
								height: "100%",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<InputBase
								fullWidth
								value={typingText}
								onChange={e => setTypingText(e.target.value)}
								endAdornment={
									<IconButton
										onClick={handleSubmit}
										disabled={isReplying}
									>
										{isReplying ? (
											<CircularProgress size={20} />
										) : (
											<Send htmlColor="#377DF7" />
										)}
									</IconButton>
								}
								onKeyDown={e => {
									if (e.key === "Enter" && !isReplying)
										handleSubmit();
								}}
								// sx={{ color: "#377DF7" }}
							/>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};

export const config: AppInfo = {
	name: "HTML GPT",
	// icon: "images/interactive/interactive-light-bulbs.png",
};

export default HtmlGpt;
