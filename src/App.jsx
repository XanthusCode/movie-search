import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "./MovieSearch";
import Favorites from "./favorites";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={<MovieSearch favorites={favorites} setFavorites={setFavorites} />} 
        />
        <Route 
          path="/favoritos" 
          element={<Favorites favorites={favorites} setFavorites={setFavorites} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
