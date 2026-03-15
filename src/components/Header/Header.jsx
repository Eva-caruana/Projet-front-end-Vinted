import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "../Header/Header.css";
import Cookies from "js-cookie";
//icones react
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = ({ setIsConnected }) => {
  // on met le token dans une variable
  const userToken = Cookies.get("userToken");
  return (
    <header>
      <div className="container">
        <section className="header-section">
          <Link to="/">
            <img className="header-logo" src={logo} alt="logo vinted" />
          </Link>
          <div className="search">
            <FaMagnifyingGlass className="search-icon" />
            <input
              className="search-input"
              type="text"
              name="text"
              placeholder="Recherche des articles"
            />
          </div>
          <nav className="right-side-header">
            <div className="header-connection-butns">
              {/* S'il y a des cookies donc si connecté = se deconnecter et si pas de cookies = pas connecté = s'incrire ou se deconnecter */}
              {userToken ? (
                <div>
                  <button
                    className="deconnection-btn"
                    onClick={() => {
                      Cookies.remove("userToken");
                      setIsConnected(false);
                    }}
                  >
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <div className="login-signup-btn">
                  <Link to="/signup">
                    <button>S'inscrire</button>
                  </Link>

                  <Link to="/login">
                    <button>Se connecter</button>
                  </Link>
                </div>
              )}
            </div>
            <button className="sell-btn">Vends tes articles</button>
          </nav>
        </section>
      </div>
    </header>
  );
};
export default Header;
