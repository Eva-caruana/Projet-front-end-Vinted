import "./Publish.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = () => {
  //  on assigne une variable a la fonction useNavigate pour pouvoir la reutiliser
  const navigate = useNavigate();

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
  const [previewPicture, setPreviewPicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const token = Cookies.get("userToken");

  const handleSubmit = async (event) => {
    event.preventDefault(); // d'empecher le rafraichissement de la poage à la soumission du formulaire
    // console.log(title, file);

    //Ne pas envoyer si ces champs ne sont pas remplis
    if (!file || !title || !price) {
      setErrorMessage("Photo, titre et prix sont obligatoires");
      return;
    }

    const formData = new FormData();
    // pour remplir le form-data, il faudra utiliser les méthodes associées aux form-data :
    formData.append("picture", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("city", city);
    formData.append("price", price);

    // afficher les key/value pairs :
    for (const pair of formData.entries()) {
      // console.log("key =>" + pair[0] + "///  value =>" + pair[1]);
    }
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",

        // ENVOYER FORMDATA AVEC AXIOS
        formData,
        {
          headers: {
            //  Reprendre la variable avec le token = Cookies.get("userToken");
            Authorization: "Bearer " + token, // NE PAS OUBLIER DE METTRE "Bearer " (bearer espace) devant le token avant de l'envoyer
          },
        },
      );

      // pour savoir si cest ok ou non
      console.log(response.data);
      navigate("/");
    } catch (error) {
      // si la propriété existe continue sinon retourne undefined au lieu de planter
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <main className="publish-page">
      {/* //Si l'tutilisateur n'est pas connecté le rediriger vers la page connexion d'abord puis retourner sur la page pusblish */}
      {token ? (
        <div className="container">
          <h2>Vends ton article</h2>
          <form className="publish-form" onSubmit={handleSubmit}>
            <div className="file-selection">
              {/* si on a une image on affiche la preview */}
              {previewPicture && (
                <img
                  className="preview-picture"
                  src={previewPicture}
                  alt="previsualisation de l'image"
                />
              )}
              {/* si on a une preview on affiche pas le label */}
              {!previewPicture && (
                <label htmlFor="picture" className="file-label">
                  + Ajoute une photo
                </label>
              )}
              {/* MASQUER L'INPUT (AVEC CSS) ET AFFICHER LE LABEL A LA PLACE */}
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={(event) => {
                  // event. target.files renvoi un tableau
                  // ici, on récupère le premier élément, et on l'envoi dans le state correspondant :
                  setFile(event.target.files[0]);
                  // create the preview
                  const objectUrl = URL.createObjectURL(event.target.files[0]);
                  setPreviewPicture(objectUrl);
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

              <label htmlFor="city">Ville</label>
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
            </div>
            <div className="submit-publish">
              <div className="publish-left">
                <label className="exchanges">
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
                </label>{" "}
              </div>
            </div>
            <div className="submit-publish">
              {errorMessage && <p className="publish-error">{errorMessage}</p>}
              <button>Ajouter</button>
            </div>
          </form>
        </div>
      ) : (
        // => le renvoyer du coup vers la page publish
        <Navigate to="/login" state={{ from: "/publish" }} />
      )}
    </main>
  );
};

export default Publish;
