import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { AppInfo, Size } from "../../types/interfaces";

// https://redstapler.co/how-to-create-pixelated-image-with-javascript/
// https://konvajs.org/docs/filters/Pixelate.html
// const imgSrc =
// 	"https://admin.itsnicethat.com/images/2NofmnpfrCwgU5gJ1XRAnzRvyuw=/195452/format-webp%7Cwidth-1440/Ana_Popescu_OrangesIllustrazioniSeriali_spazi_illustration_itsnicethat.jpg";

const IMG_SRC = "sample.webp";
const IMG_WIDTH = 500;

const Legorize: React.FC = () => {
	const [blockSize, setBlockSize] = useState(0);
	const [imgSize, setImgSize] = useState<Size>({ width: 0, height: 0 });
	const [imgWidthRatio, setImgWidthRatio] = useState<number>(1);
	const [img, setImg] = useState<File>();
	const [mode, setMode] = useState<"dot" | "lego" | string>("lego");

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const captureDivRef = useRef<HTMLDivElement>(null);

	function saveAs(url: string, fileName: string) {
		const link = document.createElement("a");

		link.href = url;

		link.download = fileName;

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	}

	function makeDivToImageFile(captureDiv: HTMLDivElement) {
		html2canvas(captureDiv, {
			allowTaint: true,
			useCORS: true,
			width: captureDiv.offsetWidth,
			height: captureDiv.offsetHeight,
			scale: 3,
		})
			.then(function (canvas) {
				const imageURL = canvas.toDataURL("image/png");

				saveAs(imageURL, "legorized.png");
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	useEffect(() => {
		const canvasObj = canvasRef.current;
		const ctx = canvasObj?.getContext("2d");

		if (canvasObj && ctx && blockSize > 0) {
			const img1 = new Image();

			img1.onload = function () {
				const ratio = img1.height / img1.width;
				const w = IMG_WIDTH * imgWidthRatio;
				const h = w * ratio;

				canvasObj.width = w;
				canvasObj.height = h;
				ctx.drawImage(img1, 0, 0, w, h);

				let pixelArr = ctx.getImageData(0, 0, w, h).data;

				for (let y = 0; y < h; y += blockSize) {
					for (let x = 0; x < w; x += blockSize) {
						let p = (x + y * w) * 4;

						if (mode === "dot") {
							ctx.fillStyle = "rgba(0,0,0,1)";
							ctx.fillRect(x, y, blockSize, blockSize);
							ctx.beginPath();
							ctx.arc(
								x + blockSize / 2,
								y + blockSize / 2,
								blockSize * 0.4,
								0,
								2 * Math.PI
							);
							// ctx.stroke();

							ctx.fillStyle =
								"rgba(" +
								pixelArr[p] +
								"," +
								pixelArr[p + 1] +
								"," +
								pixelArr[p + 2] +
								"," +
								pixelArr[p + 3] +
								")";

							ctx.fill();
						} else {
							ctx.fillStyle =
								"rgba(" +
								pixelArr[p] +
								"," +
								pixelArr[p + 1] +
								"," +
								pixelArr[p + 2] +
								"," +
								pixelArr[p + 3] +
								")";
							ctx.fillRect(x, y, blockSize, blockSize);
						}
					}
				}
			};

			img1.src = img ? URL.createObjectURL(img) : IMG_SRC;
		}
	}, [blockSize, img, canvasRef, imgWidthRatio, mode]);

	useEffect(() => {
		const img1 = new Image();

		img1.onload = function () {
			const ratio = img1.height / img1.width;
			const w = IMG_WIDTH * imgWidthRatio;
			const h = w * ratio;
			setImgSize({ width: w, height: h });
		};

		img1.src = img ? URL.createObjectURL(img) : IMG_SRC;
	}, [img, imgWidthRatio]);

	useEffect(() => {
		setBlockSize(0);
		setImgWidthRatio(1);
	}, [img]);

	return (
		<div style={{ margin: 20 }}>
			<h3>Image Legorizer</h3>
			<div style={{ display: "flex", alignItems: "center" }}>
				Block Size
				<input
					id="pixelSize"
					type="range"
					min={0}
					max={imgSize.width / 5 || 100}
					step={5}
					value={blockSize}
					onChange={e => setBlockSize(Number(e.target.value))}
				/>
				{blockSize}
			</div>
			<div style={{ display: "flex", alignItems: "center" }}>
				Image Size
				<input
					id="imageSize"
					type="range"
					min={0.2}
					max={3}
					step={0.1}
					value={imgWidthRatio}
					onChange={e => setImgWidthRatio(Number(e.target.value))}
				/>
				{imgWidthRatio}
			</div>

			<input
				type={"file"}
				accept="image/png, image/jpeg, image/webp"
				onChange={e => {
					if (e.target?.files) setImg(e.target.files[0]);
				}}
			/>
			<button
				onClick={() => {
					if (captureDivRef.current) {
						makeDivToImageFile(captureDivRef.current);
					}
				}}
			>
				저장하기
			</button>
			<select value={mode} onChange={e => setMode(e.target.value)}>
				<option value={"dot"}>dot</option>
				<option value={"lego"}>lego</option>
			</select>
			<div style={{ marginTop: 10 }}>
				<div
					ref={captureDivRef}
					style={{
						position: "relative",
						width: imgSize.width,
						height: imgSize.height,
						overflow: "hidden",
					}}
				>
					{blockSize < 5 ? (
						<img
							src={img ? URL.createObjectURL(img) : IMG_SRC}
							alt={"original"}
							style={{
								width:
									imgSize.width === 0
										? `100%`
										: imgSize.width,
							}}
						/>
					) : (
						<>
							<canvas
								ref={canvasRef}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
								}}
							/>
							{mode === "lego" && (
								<div
									style={{
										display: "flex",
										position: "relative",
										flexWrap: "wrap",
										width:
											blockSize *
											Math.ceil(
												imgSize.width / blockSize
											),
										height:
											blockSize *
											Math.ceil(
												imgSize.height / blockSize
											),
									}}
								>
									{[
										...Array(
											Math.ceil(
												imgSize.width / blockSize
											) *
												Math.ceil(
													imgSize.height / blockSize
												)
										),
									].map((_n, idx) => (
										<div
											key={`block-${idx}`}
											style={{
												display: "flex",
												flexShrink: 0,
												width: 1 * blockSize,
												height: 1 * blockSize,
												boxShadow: `inset 2px 2px 2px 1px rgba(255,255,255,0.1)`,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<div
												style={{
													width: 0.6 * blockSize,
													height: 0.6 * blockSize,
													borderRadius:
														0.3 * blockSize,
													boxShadow: `inset 3px 3px 5px 5px rgba(255,255,255,0.1), 0px 1px 2px 2px rgba(0,0,0,0.1)`,
												}}
											></div>
										</div>
									))}
								</div>
							)}
						</>
					)}{" "}
				</div>
			</div>
		</div>
	);
};

export const config: AppInfo = {
	name: "Legorize",
	icon: "images/graphics/graphics-legorize_light.png",
};

export default Legorize;
