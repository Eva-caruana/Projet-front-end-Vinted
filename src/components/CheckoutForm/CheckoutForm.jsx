// Hook de stripe
import "./CheckoutForm.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  //le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // Loading paiment
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à charger
    setIsLoading(true);

    if (elements === null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    // elements recup infos composants
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      setErrorMessage(submitError.message);
      return;
    }

    try {
      // Demande au backend de créer l'intention de paiement avec les clés/valeurs, le clientSecret
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: price, //le prix indiqué est en eur pas en centimes ici
        },
      );

      const clientSecret = response.data.client_secret;

      // Requête à Stripe pour valider le paiement
      const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements: elements,
        clientSecret: clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });

      // Si une erreur a lieu pendant la confirmation
      if (stripeResponse.error) {
        // On la montre au client
        setErrorMessage(stripeResponse.error.message);
      }

      // Si on reçois un status succeeded on fais passer completed à true
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
      // On a fini de charger
      setIsLoading(false);
    } catch (error) {
      console.log("Une erreur est survenue", { message: error.response?.data });
    }
  };

  return completed ? (
    <div className="post-payment-elements">
      <p className="completed-payment">Paiement effectué !</p>
      <Link to="/">
        {" "}
        <button className="redirect-button">Poursuivre vos achats</button>{" "}
      </Link>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <div className="checkout-btns">
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button
          className="submit-payment-button"
          type="submit"
          disabled={!stripe || !elements || isLoading}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
