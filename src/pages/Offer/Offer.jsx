import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Offer/Offer.css";

const Offer = () => {
  // destructuring
  // const { id } = useParams();
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
  }, []);

  return (
    <main className="offer">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <img
              src={data.product_image.secure_url}
              alt="grand aperçu de l'offre"
            />
            <aside>
              <p>{data.product_price} €</p>
              <div className="offer-"></div>
              <button>Acheter</button>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
};

export default Offer;

{
  /* <Link to="/home">Go to product 12345678</Link>; */
}
