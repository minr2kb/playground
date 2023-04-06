import React, { useState, useRef, useEffect } from "react";
import { AppInfo } from "../../types/interfaces";
import WaveSurfer from "wavesurfer.js";

const Recorder = () => {
	const [recording, setRecording] = useState(false);
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const waveformRef = useRef<WaveSurfer | null>(null);
	const chunks: Blob[] = [];

	useEffect(() => {
		// Create a new instance of WaveSurfer and mount it to the waveformRef element
		waveformRef.current = WaveSurfer.create({
			container: "#waveform",
			waveColor: "#999",
			progressColor: "orange",
		});
	}, []);

	useEffect(() => {
		console.log(recording);
	}, [recording]);

	const handleRecordClick = async () => {
		console.log("click");
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			mediaRecorderRef.current = new MediaRecorder(stream);
			mediaRecorderRef.current.addEventListener(
				"dataavailable",
				event => {
					chunks.push(event.data);
					// Update the waveform with the new data as it is recorded
					waveformRef.current?.loadBlob(event.data);
				}
			);
			mediaRecorderRef.current.addEventListener("stop", () => {
				const audioBlob = new Blob(chunks, {
					type: "audio/ogg; codecs=opus",
				});
				setAudioBlob(audioBlob);
				setRecording(false);
			});
			mediaRecorderRef.current.start();
			setRecording(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleStopClick = () => {
		mediaRecorderRef.current?.stop();
	};

	const handlePlaybackClick = () => {
		if (audioBlob !== null) {
			const audioURL = URL.createObjectURL(audioBlob);
			const audio = new Audio(audioURL);
			audio.play();
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h1>Voice Recorder</h1>
			<div
				style={{
					width: "100%",
					height: "200px",
				}}
				id="waveform"
			></div>
			<div
				style={{
					display: "flex",

					justifyContent: "center",
					margin: "20px 0",
				}}
			>
				<button
					style={{ margin: "0 10px" }}
					onClick={handleRecordClick}
					disabled={recording}
				>
					Record
				</button>
				<button
					style={{ margin: "0 10px" }}
					onClick={handleStopClick}
					disabled={!recording}
				>
					Stop
				</button>
				<button
					style={{ margin: "0 10px" }}
					onClick={handlePlaybackClick}
					disabled={!audioBlob}
				>
					Playback
				</button>
			</div>
		</div>
	);
};

export const config: AppInfo = {
	name: "Recorder",
	// icon: "images/3d/3d-coffee-cup.png",
};

export default Recorder;
