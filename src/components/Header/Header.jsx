import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "../Header/Header.css";
import Cookies from "js-cookie";
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
              {/* S'il y a des cookies donc si connecté = se deconnecter et si pas de cookies = pas connecté = s'incrire ou se deconnecter */}
              {Cookies.get("token") ? (
                <button
                  className="logout-btn"
                  onClick={() => {
                    //pour le logout il efface les cookies pour deco l'utilisateur
                    Cookies.remove("token");
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <Link to="/signup">
                    <button>S'inscrire</button>
                  </Link>

                  <Link to="/login">
                    <button>Se connecter</button>
                  </Link>
                </>
              )}
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
