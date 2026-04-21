import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
// import du package js-cookie :
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";

const Login = ({ setIsConnected }) => {
  //declarer des states pour l'utlisation de formulaires
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    //Sur le formulaire, empeche le navigateur de raffraichir et effacer les données
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        },
      );

      if (response.data.token) {
        Cookies.set("userToken", response.data.token);
        // on change le state de connection (pour l'affichage dans le header) :
        setIsConnected(true);

        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Email ou mot de passe incorrect");
      } else {
        setErrorMessage("Une erreur est survenue, réessaie plus tard");
      }
    }
  };

  return (
    <main>
      <div className="container">
        <section className="login-page">
          <h2>Se connecter</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {/* Au clic envoyer l'utilisateur connecté sur la page home */}

            <Button variant="filled" size="medium" width="full" type="submit">
              Se connecter
            </Button>

            <Link className="redirection" to="/Signup">
              <p>Pas encore de compte ? Inscris-toi !</p>
            </Link>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
