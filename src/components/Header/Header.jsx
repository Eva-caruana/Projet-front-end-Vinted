import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "../Header/Header.css";
const Header = () => {
  return (
    <header>
      <div className="container">
        <section className="header-section">
          <div className="left-side-header">
            <img className="header-logo" src={logo} alt="logo vinted" />{" "}
            <input
              type="text"
              name="text"
              placeholder="Recherche des articles"
            />
          </div>
          <nav className="right-side-header">
            <button>S'inscrire</button>
            <button>Se connecter</button>
            <button>Vends tes articles</button>
          </nav>
        </section>
        {/* <nav> <Link to="/home">Home</Link> <Link to="/offer">Offer</Link> </nav> */}{" "}
      </div>
    </header>
  );
};
export default Header;
