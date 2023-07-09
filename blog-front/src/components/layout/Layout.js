import Footer from "./Footer";
import Header from "./Header/Header";
import "./Layout.css";
export function Layout( props) {
  return (
    <div className="layout">
      <Header />
      <div className="main">{props.content}</div>
      <Footer />
    </div>
  );
}
