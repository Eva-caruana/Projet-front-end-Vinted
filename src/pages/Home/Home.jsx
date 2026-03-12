import { Link } from "react-router-dom";
import hero from "../../assets/img/hero.jpg";
import "../Home/Home.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({ data }) => {
  // le composant Link sert à naviguer de page en page en modifiant l'URL sans rafraichir le navigateur
  // les balises seront donc maintenant réservées :
  //  - à diriger vers une ancre (id) de la meme page
  //  - à re-diriger vers un site externe

  return (
    <main>
      <section className="hero">
        <img src={hero} alt="women-with-clothes-image" />
        <div className="container">
          <div className="hero-bloc">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="homepage-articles">
          {/* On fait un .map() afin de recuperer les données de mes offers */}

          {data.offers.map((offer, index) => {
            // console.log(offer); ok
            return (
              <Link to={`/offer/${offer._id}`} key={index}>
                <article className="offer-article">
                  <div>
                    <div className="owner-info">
                      <img
                        src={offer.owner.account.avatar.secure_url}
                        alt="owner-picture"
                      />
                      <p>{offer.owner.account.username}</p>
                    </div>
                    <div className="homepage-offer-info">
                      <img
                        src={offer.product_image.secure_url}
                        alt={offer.product_name}
                      />
                      <div className="homepage-product-details">
                        <p>{offer.product_price} €</p>
                        <p>
                          {offer.product_details[1].TAILLE &&
                            offer.product_details[1].TAILLE}
                        </p>
                        <p>{offer.product_details[0].MARQUE}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Home;
