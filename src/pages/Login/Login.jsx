import "../Login/Login.css";
import { Link } from "react-router-dom";
// import du package js-cookie :
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  //declarer des states pour l'utlisation de formulaires

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    //empeche le navigateur de raffraichir et effacer les données
    event.preventDefault();

    console.log("email =>", email);
    console.log("password =>", password);

    try {
      //on envoi a axios une requete en post pour creer un profil utilisateur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        },
      );
      // pour recuperer un cookie un utilise "get" avec nom et on peut lui ajouter une expiration (en j)

      Cookies.set("token", response.data.token, { expires: 7 });
      //   console.log(Cookies.get("token"));
      console.log("Login réussi !");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main>
      <section className="login-page">
        <h1>Se connecter</h1>

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

          <button className="connect-btn" type="submit">
            Se connecter
          </button>

          <Link className="go-to-signup" to="/Signup">
            <p>Pas encore de compte ? Inscris-toi !</p>
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Login;
