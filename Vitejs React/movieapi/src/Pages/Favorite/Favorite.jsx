import React from 'react'
import "../../Asserts/css/favorite.css"
import Header from '../../Components/Header/Header'

import noposterimage from "../../Asserts/img/noposter.jpg";
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Favorite() {

  const location = useLocation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {

    const timeoutId = setTimeout(() => {

      const storedData = localStorage.getItem('Favorite');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      setFavorites(parsedData);

    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);


  const removeFavorite = (favoriteId) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== favoriteId);
    setFavorites(updatedFavorites);
    localStorage.setItem('Favorite', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="s">
      <Header path={"Home"} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {favorites.map((favorite, index) => (
        <div className="Favoritemovie-card" key={favorite.id+index+"p"}>
          {favorite.poster_path == null && (
            <img
              src={noposterimage}
              alt=""
              className="Favoritemovie-poster"
            />
          )}
          {favorite.poster_path != null && (
            <img src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`} className="Favoritemovie-poster" alt={`${favorite.poster_path}`} />
          )}
          <div className="Favoritemovie-details">
            {favorite.title != null &&
              <h1 className="Favoritemovie-title">{favorite.title}</h1>
            }
            {favorite.name != null &&
              <h1 className="Favoritemovie-title">{favorite.name}</h1>
            }
            <br />
            <p className="Favoritemovie-description">{favorite.overview} </p>
            <br />
            {favorite.vote_average >= 6 &&
                                  favorite.vote_average < 8 && (
                                    <b
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "5px",
                                      }}
                                    >  IMDB: &nbsp;&nbsp; {`${favorite.vote_average}`}</b>
                                  )}
                                {favorite.vote_average >= 8 && (
                                  <b
                                    style={{
                                      backgroundColor: "deepskyblue",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${favorite.vote_average}`}</b>
                                )}
                                {favorite.vote_average < 6 && (
                                  <b
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${favorite.vote_average}`}</b>
                                )}
                                <br/>
          </div>
            <button className="Favoriteremove-button" onClick={() => removeFavorite(favorite.id)}>Remove</button>
            <br/>
            <br/>
        </div>
      ))}

    </div>
  )
}
