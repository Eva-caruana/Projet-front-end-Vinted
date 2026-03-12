import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "../Header/Header.css";
const Header = () => {
  return (
    <header>
      <div className="container">
        <section className="header-section">
          <Link to="/">
            <img className="header-logo" src={logo} alt="logo vinted" />
          </Link>
          <input type="text" name="text" placeholder="Recherche des articles" />

          <nav className="right-side-header">
            <div className="login-signup-btn">
              <button>S'inscrire</button>
              <button>Se connecter</button>
            </div>
            <button className="sell-btn">Vends tes articles</button>
          </nav>
        </section>
        {/* <nav> <Link to="/home">Home</Link> <Link to="/offer">Offer</Link> </nav> */}{" "}
      </div>
    </header>
  );
};
export default Header;
