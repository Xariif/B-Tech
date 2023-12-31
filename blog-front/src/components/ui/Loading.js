import { useEffect, useState } from "react";

export default function Loading() {
	const [dots, setDots] = useState("");
	useEffect(() => {
		const intervalId = setInterval(() => {
			setDots((prev) => (prev.length === 3 ? "" : prev + "."));
		}, 500);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<h1
			style={{
				fontSize: "3rem",
				textShadow: "1px 1px #fff",
				margin: 0,
				textAlign: "center",
			}}
		>
			Loading{dots}
		</h1>
	);
}
