import "./Footer.css";

export default function Footer() {
  //wykonawcy i dane dot projektu
  // ikonki do social mediów
  // nazwa firmy + znak zastrzezony + rok (aktualny z js)

  return (
    <div className="footer">
      <div className="company"> B-TECH {new Date().getFullYear()}&copy;</div>

      <div
        className="authors"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div style={{ paddingRight: ".5rem", fontWeight:'bold' }}> Wykonawca: </div>
        <div>Jakub Filiks</div>
      </div>
    </div>
  );
}
