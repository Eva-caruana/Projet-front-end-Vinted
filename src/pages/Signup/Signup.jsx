import "../Signup/Signup.css";
import { Link } from "react-router-dom";
// import du package js-cookie :
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  //declarer des states pour l'utlisation de formulaires
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = async (event) => {
    //empeche le navigateur de raffraichir et effacer les données
    event.preventDefault();

    try {
      //on envoi a axios une requete en post pour creer un profil utilisateur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        },
      );
      // pour creer un cookie un utilise "set" avec nom,valeur et on peut lui ajouter une expiration (en j)
      Cookies.set("token", response.data.token, { expires: 7 });
      //   console.log(Cookies.set("token", response.data.token, { expires: 7 }));

      console.log("Signup réussi !");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main>
      <section className="signup-page">
        <h1>S'inscrire</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <input
            type="email"
            placeholder="Email"
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
          <label htmlFor="">
            <input
              type="checkbox"
              name="newsletter"
              onChange={(event) => {
                setNewsletter(event.target.checked);
              }}
            />
            S'inscrire à notre newsletter
          </label>

          <button className="submit-btn" type="submit">
            S'inscrire
          </button>

          <Link to="/Login">
            <p>Tu as déjà un compte ? Connecte-toi !</p>
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Signup;
