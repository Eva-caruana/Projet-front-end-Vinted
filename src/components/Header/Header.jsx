// Importer aussi UseLocation
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "../Header/Header.css";
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
  isConnected, //si ajout beug du bouton, pq ?
}) => {
  // On met location dans une variable pour pouvoir utiliser useLocation()
  const location = useLocation(); //NE PAS OUBLIER DIMPORTER useLocation
  // console.log("ici =>", location); // {pathname: '/'}

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

              {userToken ? ( //POURQUOI MOI BEUG ICI SI JE MET ISCONNECTED?
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
            <Link to="/publish">
              <button className="sell-btn">Vends tes articles</button>
            </Link>
          </nav>
        </section>
      </div>
    </header>
  );
};
export default Header;
