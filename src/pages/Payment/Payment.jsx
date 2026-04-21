import "./Payment.css";
import Cookies from "js-cookie";

import { Navigate, useLocation } from "react-router-dom";
//Pour le paiement
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

// connexion au compte Stripe en fournissant la clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP",
);

const Payment = () => {
  //on recupere les infos de l'objet offer
  const location = useLocation();
  //   console.log("location.state =", location.state.price, location.state.title );
  const state = location.state;

  //on destructure
  const { title, price } = state;
  //on recupere le cookie
  const token = Cookies.get("userToken");

  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: price * 100,

    // Devise de la transaction
    currency: "eur",
  };

  //securiser le code en ajoutant une ternaire
  return token ? (
    <main className="payment-page">
      <section className="price-recap">
        <h2>Résumé de la commande</h2>
        <div>
          <span>Commande</span>
          <span>{price.toFixed(2)} €</span>
        </div>
        <div className="fees">
          <span>Frais de protection acheteurs</span>
          <span>{(0.4).toFixed(2)}€</span>
        </div>
        <div>
          <span>Frais de port</span>
          <span>{(0.8).toFixed(2)}€</span>
        </div>
      </section>
      <section>
        <div>
          <span>Total</span>
          <span>{(price + 1.2).toFixed(2)} €</span>
        </div>
        <div className="order-recap">
          <p>
            Récapitulatif de votre commande <span>{title}</span>, pour un
            montant total de {(price + 1.2).toFixed(2)} € (frais de protection
            et frais de port inclus).
          </p>
        </div>
      </section>
      <section className="payment-section">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm title={title} price={price} />
        </Elements>
      </section>
    </main>
  ) : (
    // Si un utilisateur nest pas connecté et qu'il veut acheter larticle va le
    // renvoyer sur la page login puis offers pour pouvoir recuperer les clefs name&price
    <Navigate to="/login" state={{ from: "/offers/" + id }} />
  );
};

export default Payment;
