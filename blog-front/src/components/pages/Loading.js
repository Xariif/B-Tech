import { useEffect, useState } from "react";

export default function Loading() {
	const [dots, setDots] = useState("");
	useEffect(() => {
		const intervalId = setInterval(() => {
			setDots((prev) => (prev.length === 3 ? "" : prev + "."));
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<h1
				style={{
					fontSize: "3rem",
					color: "#333",
					textShadow: "1px 1px #fff",
					textAlign: "center",
				}}
			>
				Loading{dots}
			</h1>
		</div>
	);
}
