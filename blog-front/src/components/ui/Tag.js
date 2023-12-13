const TagColors = {
	TECH: "blue",
	SPACE: "orange",
	MOTO: "black",
	NATURE: "green",
	IMPORTANT: "red",
	TIPS: "purple",
};

export default function Tag({ tag }) {
	// 					backgroundColor: TagColors[tag.toUpperCase()],

	return (
		<div style={{ display: "flex", alignItems: "center", fontSize: ".5rem" }}>
			<div
				style={{
					height: ".3rem",
					width: "1.5rem ",
					marginRight: ".5rem",
				}}
			></div>

			<div style={{ marginRight: "1rem", textTransform: "uppercase" }}>
				{tag}
			</div>
		</div>
	);
}
