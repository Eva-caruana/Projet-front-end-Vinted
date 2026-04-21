import "./OfferCard.css";

const OfferCard = ({ offer }) => {
  return (
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
          <img src={offer.product_image.secure_url} alt={offer.product_name} />
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
  );
};

export default OfferCard;
