export default function Contact() {
	var testStyle = {
		color: "var(--text-color)",
		"&:hover": {
			background: "#efefef",
			color: "red",
		},
	};

	const hoverStyle = {
		color: "blue", // Color on hover
	};
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div>
					<h1>Contact:</h1>
					<p>
						Address: Czerniakowska 26A, 00-714 Warszawa
						<br />
						Phone: +48 668 022 456 between 9:00-17:00
					</p>
				</div>
				<div
					style={{
						alignItems: "center",
						display: "flex",
					}}
				>
					<a
						href="https://www.facebook.com"
						style={{ color: "var(--text-color)" }}
					>
						<i
							className="pi pi-facebook"
							style={{ fontSize: "3rem", margin: "1rem" }}
						></i>
					</a>
					<a
						href="https://www.twitter.com"
						style={{ color: "var(--text-color)" }}
					>
						<i
							className="pi pi-twitter"
							style={{ fontSize: "3rem", margin: "1rem" }}
						></i>
					</a>
					<a
						href="https://www.instagram.com"
						style={{ color: "var(--text-color)" }}
					>
						<i
							className="pi pi-instagram"
							style={{ fontSize: "3rem", margin: "1rem" }}
						></i>
					</a>
				</div>
			</div>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.287986442229!2d21.049040777581077!3d52.201813859737136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd38d03534b1%3A0xd7918ac376fa3271!2sCzerniakowska%2026A%2C%2000-714%20Warszawa!5e0!3m2!1sen!2spl!4v1689189431448!5m2!1sen!2spl"
				title="Google Maps Location"
				width="100%"
				height="450"
				frameBorder="0"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				style={{ borderRadius: "var(--border-radius)" }}
			></iframe>
		</>
	);
}
