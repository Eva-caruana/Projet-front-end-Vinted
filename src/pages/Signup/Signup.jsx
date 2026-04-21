import "../Signup/Signup.css";
import { Link, useNavigate } from "react-router-dom";
// import du package js-cookie :
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setIsConnected }) => {
  // Declaration de variable pour l'utilisation de la fonction usenavigate
  const navigate = useNavigate();

  //declarer des states pour l'utlisation de formulaires
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //fonction pour ne pas repeter event.target.value das les set du onClick
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  //on cree une fonction qui quand lutilisateur clique pour creer verifier quil y a un token

  const handleSubmit = async (event) => {
    //empeche le navigateur de raffraichir et effacer les données
    event.preventDefault();

    // envoyer les données à l'API pour obtenir un token (qui confirmera qu'on est bien authentifié)
    // vérifie que les valeurs sont les bonnes :
    // console.log(username, email, password, newsletter);
    // console.log("Inscription réussie !");

    // déclarer une variable pour récupérer la réponse
    // mettre le await pour attendre que la promise soit résolue
    // donc mettre handleSubmit en fonction async
    // Utilisation de try/catch
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        },
      );

      // si il y a un token dans la réponse:
      if (response.data.token) {
        setErrorMessage("");
        // on le stockera dans les cookies
        Cookies.set("userToken", response.data.token);
        // on change le state de connection (pour l'affichage dans le header) :
        setIsConnected(true);

        // on redirige maintenant notre utilisateur vers la page home :
        navigate("/");
      }
      // sinon, on mettra une alerte
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <div className="container">
        <section className="signup-page">
          <h2>S'inscrire</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(event) => {
                handleChange(event, setUsername);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                handleChange(event, setEmail);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => {
                handleChange(event, setPassword);
              }}
            />
            <div className="newsletter-check-conditions">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="newsletter"
                  checked={newsletter}
                  onChange={(event) => {
                    setNewsletter(event.target.checked);
                  }}
                />
                S'inscrire à notre newsletter
              </label>

              <p className="legal-conditions">
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </p>
            </div>
            {/* Au clic envoi l'utilisateur connecté sur la page home */}
            <button className="submit-btn" type="submit">
              S'inscrire
            </button>

            <Link className="redirection" to="/Login">
              <p>Tu as déjà un compte ? Connecte-toi !</p>
            </Link>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </section>
      </div>
    </main>
  );
};

export default Signup;
