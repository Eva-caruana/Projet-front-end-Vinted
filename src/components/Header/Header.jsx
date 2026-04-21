// Importer aussi UseLocation
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "../Header/Header.css";
import Button from "../Button/Button";
import Cookies from "js-cookie";
//icones react
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = ({
  setIsConnected,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
  title,
  setTitle,
  isConnected,
}) => {
  // On met location dans une variable pour pouvoir utiliser useLocation()
  const location = useLocation();

  // on met le token dans une variable
  const userToken = Cookies.get("userToken");
  return (
    <header>
      <div className="container">
        <section className="header-section">
          <Link to="/">
            <img className="header-logo" src={logo} alt="logo vinted" />
          </Link>
          <div className="search-filters-section">
            <div className="search">
              <FaMagnifyingGlass className="search-icon" />
              <input
                className="search-input"
                type="text"
                name="text"
                value={title}
                placeholder="Recherche des articles"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            {/* les filtres  */}
            {/* Si l'utilisateur est sur la page home afficher les filtres sinon ne pas les afficher  */}
            {location.pathname === "/" ? (
              <div className="price-filters">
                <label className="input-label">
                  Prix min:{" "}
                  <input
                    type="number"
                    name="priceMin"
                    id="priceMin"
                    value={priceMin}
                    onChange={(event) => {
                      setPriceMin(event.target.value);
                    }}
                  />
                </label>

                <label className="input-label">
                  Prix max:
                  <input
                    type="number"
                    name="priceMax"
                    id="priceMax"
                    value={priceMax}
                    onChange={(event) => {
                      setPriceMax(event.target.value);
                    }}
                  />
                </label>
              </div>
            ) : null}
          </div>
          <nav className="right-side-header">
            <div className="header-connection-butns">
              {/* S'il y a des cookies donc si connecté = se deconnecter et si pas de cookies = pas connecté = s'incrire ou se deconnecter */}

              {isConnected ? (
                <div>
                  {/*  Bouton Se déconnecter */}
                  <Button
                    variant="danger"
                    onClick={() => {
                      Cookies.remove("userToken");
                      setIsConnected(false);
                    }}
                  >
                    Se déconnecter
                  </Button>
                </div>
              ) : (
                // Boutons S'inscrire / Se connecter
                <div className="login-signup-btn">
                  <Link to="/signup">
                    <Button variant="outlined">S'inscrire</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outlined">Se connecter</Button>
                  </Link>
                </div>
              )}
            </div>
            {/* Bouton Vends tes articles */}
            <Link to="/publish">
              <Button variant="filled">Vends tes articles</Button>
            </Link>
          </nav>
        </section>
      </div>
    </header>
  );
};
export default Header;
