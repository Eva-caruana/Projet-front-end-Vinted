import { Link } from "react-router-dom";
import hero from "../../assets/img/hero.jpg";
import "../Home/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ title, priceMin, priceMax, handleToken }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "?title=" + title;
        }
        if (priceMin) {
          if (filters) {
            filters += "&priceMin=" + priceMin;
          } else {
            filters += "?priceMin=" + priceMin;
          }
        }
        if (priceMax) {
          if (filters) {
            filters += "&priceMax=" + priceMax;
          } else {
            filters += "?priceMax=" + priceMax;
          }
        }
        // console.log("avant requête");
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers" + filters,
        );
        // console.log(response.data); // {count: 32, offers: Array(32)}
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    // console.log("ap requête");
    fetchData();
    // sera déclenché à la destruction du composant :
    // return () => {
    //   clearInterval()
    // }
  }, [title, priceMin, priceMax]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <main>
          <section className="hero">
            <img src={hero} alt="women-with-clothes-image" />
            <div className="container">
              <div className="hero-text-bloc">
                <h1>Prêts à faire du tri dans vos placards ?</h1>
                {/* Lier à la page login */}
                {handleToken ? (
                  <Link to="/publish">
                    <button>Commencer à vendre</button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button>Commencer à vendre</button>
                  </Link>
                )}
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
                          {/* Afficher l'avatar seulement si cela existe */}
                          {offer.owner.account.avatar && (
                            <img
                              src={offer.owner.account.avatar.secure_url}
                              alt="owner-picture"
                            />
                          )}
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
      )}
    </>
  );
};

export default Home;
