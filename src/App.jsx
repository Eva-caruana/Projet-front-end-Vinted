import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

//declaration de fonction avec states
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Lier le fait detre connecté avec un token, si un token existe=connexion, si on veut la connexion=suppression du token
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
        // console.log(response.data)
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
        <Header handleToken={handleToken} setIsConnected={setIsConnected} />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
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
