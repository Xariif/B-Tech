export default function SmallScreen() {
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<i className="pi pi-wrench" />
				<h1>Device display</h1>
			</div>
			<h2>
				You are trying to display content on a screen that is too small. Please
				use a larger device.
			</h2>
		</>
	);
}
