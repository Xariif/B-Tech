export default function Contact() {
	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div>
					<h1>Dane kontaktowe:</h1>
					<p>
						Adres: Czerniakowska 26A, 00-714 Warszawa
						<br />
						Telefon: +48 668 022 456 w godzinach 9:00-17:00
					</p>
				</div>
				<div style={{ alignItems: "center", display: "flex" }}>
					<a href="https://www.facebook.com">
						<i
							className="pi pi-facebook"
							style={{ fontSize: "3rem", margin: "1rem" }}
						></i>
					</a>
					<a href="https://www.twitter.com">
						<i
							className="pi pi-twitter"
							style={{ fontSize: "3rem", margin: "1rem" }}
						></i>
					</a>
					<a href="https://www.instagram.com">
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
				height="400px"
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				style={{ marginTop: "2rem", borderRadius: "var(--border-radius)" }}
			></iframe>
		</>
	);
}
