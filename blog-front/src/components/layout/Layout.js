import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
export function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <main>
  
          {props.content}
   
      </main>
      <Footer />
    </div>
  );
}
