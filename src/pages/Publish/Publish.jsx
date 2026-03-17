import "./Publish.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Publish = () => {
  //   const token = Cookies.get("user");
  // Daclarations de states
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchanges, setExchanges] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // d'empecher le rafraichissement de la poage à la soumission du formulaire
    // console.log(title, file);

    const formData = new FormData(); // création d'un form-data !
    // pour remplir le form-data, il faudra utiliser les méthodes associées aux form-data :
    formData.append("title", title);
    formData.append("picture", file);

    console.log("ici =>", formData);

    // Display the key/value pairs :
    for (const pair of formData.entries()) {
      console.log("key =>" + pair[0] + "///  value =>" + pair[1]);
    }
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",

        // ENVOYER UN TOKEN AVEC AXIOS
        formData,
        {
          headers: {
            //  Reprendre la variable avec le token = Cookies.get("userToken");
            Authorization: "Bearer " + Cookies.get("userToken"), // NE PAS OUBLIER DE METTRE "Bearer " (bearer espace) devant le token avant de l'envoyer
          },
        },
      );
      //   savoir si cest ok ou pas
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div className="container">
        <h2>Vends ton article</h2>
        <form className=" publish-form" onSubmit={handleSubmit}>
          <div className="file-selection">
            <label htmlFor="picture">Ajoutez une photo</label>
            {/* MASQUER L'INPUT (AVEC CSS) ET AFFICHER LE LABEL A LA PLACE */}
            <input
              type="file"
              name="picture"
              id="picture"
              onChange={(event) => {
                // event. target.files renvoi un tableau
                // ici, on récupère le premier élément, et on l'envoi dans le state correspondant :
                setFile(event.target.files[0]);
              }}
            />
          </div>
          <div className="text-input-section">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              placeholder="ex: Chemise Sézane verte"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <label htmlFor="description">Décris ton article</label>
            <textarea
              type="text"
              id="description"
              placeholder="ex: Porté quelques fois, taille correctement"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          <div className="text-input-section">
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              id="brand"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              id="size"
              placeholder="ex: L/40/12"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />

            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              id="color"
              placeholder="ex: Fushia"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
            <label htmlFor="condition">Etat</label>
            <input
              type="text"
              id="condition"
              placeholder="ex: Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />

            <label htmlFor="city">Couleur</label>
            <input
              type="text"
              id="city"
              placeholder="ex: Paris"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>

          <div className="text-input-section">
            <label htmlFor="price">Prix</label>
            <input
              type="text"
              id="price"
              placeholder="ex: 0.00 €"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <label>
              <input
                className="checkbox"
                type="checkbox"
                name="exchanges"
                checked={exchanges}
                onChange={(event) => {
                  setExchanges(event.target.checked);
                }}
              />
              Je suis interressé-e par les échanges
            </label>
          </div>
          <div className="submit-publish-btn">
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Publish;
