export default function SmallScreen() {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100vh",

				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "100%",
					textAlign: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<i
						className="pi pi-wrench"
						style={{ fontSize: "3rem", marginRight: "1rem" }}
					/>
					<h1>Device display</h1>
				</div>
				<h2>
					You are trying to display content on a screen that is too small.
					Please use a larger device.
				</h2>
			</div>
		</div>
	);
}
