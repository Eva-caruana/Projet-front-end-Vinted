import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import hero from "../../assets/img/hero.jpg";
import OfferCard from "../../components/OfferCard/OfferCard";
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

        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers" + filters,
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

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
                {/* Lier à la page publish */}
                <Link to="/publish">
                  <Button variant="filled" width="large">
                    Commencer à vendre
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="container">
            <section className="homepage-articles">
              {/* On fait un .map() afin de recuperer les données de mes offers */}

              {data.offers.map((offer, index) => {
                return (
                  <Link to={`/offer/${offer._id}`} key={index}>
                    <OfferCard offer={offer} />
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
