import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";

function App() {
  //Pour eviter le bug sur se deconnecter (pour que ce soit clicable lorsque is connected =null)
  const [isConnected, setIsConnected] = useState(
    Cookies.get("userToken") || null,
  );

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [title, setTitle] = useState("");

  // Lier le fait detre connecté avec un token, si un token existe=connexion, si on veut la deconnexion=suppression du token
  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token);
      setIsConnected(true);
    } else {
      Cookies.remove("userToken");
      setIsConnected(false);
    }
  };
  // Il y a une requete donc utilisation du use effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers",
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // si pas de tableau de dependances c'st comme s'il ny avait pas de useeffect

  return isLoading ? (
    <span>Loading... </span>
  ) : (
    <>
      <Router>
        <Header
          handleToken={handleToken}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
          title={title}
          setTitle={setTitle}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                title={title}
                priceMin={priceMin}
                priceMax={priceMax}
                handleToken={handleToken}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={
              <Signup
                isConnected={isConnected}
                setIsConnected={setIsConnected}
                handleToken={handleToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isConnected={isConnected}
                setIsConnected={setIsConnected}
                handleToken={handleToken}
              />
            }
          />
          <Route path="/publish" element={<Publish />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="*"
            element={
              <div className="container">Vous n'êtes pas censés etre ici</div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
