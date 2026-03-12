import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Footer from "./components/Footer/Footer";

//declaration de fonction avec states
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        <Header />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
