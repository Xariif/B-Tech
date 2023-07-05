import Footer from "./Footer";
import Header from "./Header";

export function Layout( props) {
  return (
    <div className="layout">
      <Header />
      <div className="content">{props.content}</div>
      <Footer />
    </div>
  );
}
