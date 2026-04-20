import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Offer/Offer.css";

const Offer = () => {
  const params = useParams();
  const id = params.id;
  // console.log("ici le log", params);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id,
        );
        // console.log("ici le log====>",response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <main className="main-offer-page">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section className="offer-page">
            <div>
              <img
                className="offer-page-img"
                src={data.product_image.secure_url}
                alt="grand aperçu de l'offre"
              />
            </div>
            <aside className="offer-bloc">
              <p className="offer-price">{data.product_price} €</p>
              <div className="offer-top-details">
                {/* Boucle pour faire apparaitre les pdts et leur clé */}
                {data.product_details.map((detail, index) => {
                  return (
                    <div className="detail-lines" key={index}>
                      {/* si les elements ont une clé on l'affiche avec les details  */}
                      {detail.MARQUE && (
                        <span>
                          <p className="detail-key">MARQUE</p>
                          <p className="detail-value">{detail.MARQUE}</p>
                        </span>
                      )}

                      {detail.TAILLE && (
                        <span>
                          <p className="detail-key">TAILLE</p>
                          <p className="detail-value">{detail.TAILLE}</p>
                        </span>
                      )}

                      {detail["ÉTAT"] && (
                        <span>
                          <p className="detail-key">ÉTAT</p>
                          <p className="detail-value">{detail["ÉTAT"]}</p>
                        </span>
                      )}

                      {detail.COULEUR && (
                        <span>
                          <p className="detail-key">COULEUR</p>
                          <p className="detail-value">{detail.COULEUR}</p>
                        </span>
                      )}

                      {detail.EMPLACEMENT && (
                        <span>
                          <p className="detail-key">EMPLACEMENT</p>
                          <p className="detail-value">{detail.EMPLACEMENT}</p>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ------------------------------ */}

              <div className="offer-content">
                <h3 className="offer-title">{data.product_name}</h3>
                <p className="offer-description">{data.product_description}</p>

                <div className="offer-owner">
                  {data.owner.account.avatar && (
                    <img
                      src={data.owner.account.avatar.secure_url}
                      alt="owner-picture"
                    />
                  )}
                  <span>{data.owner.account.username}</span>
                </div>
                <Link
                  to="/payment"
                  state={{
                    title: data.product_name,
                    price: data.product_price,
                  }}
                >
                  <button className="buy-btn">Acheter</button>
                </Link>
              </div>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
};

export default Offer;
