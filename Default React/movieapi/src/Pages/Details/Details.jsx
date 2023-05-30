import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import "../../Asserts/css/details.css";
import noposterimage from "../../Asserts/img/noposter.jpg";

export default function Details() {
  const location = useLocation();
  const [MoviesorTv, setMoviesorTv] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const storedData = localStorage.getItem('MoviesorTv');
    const parsedData = JSON.parse(storedData);
    setMoviesorTv(parsedData);
  }, [location]);

  if (!MoviesorTv) {
    return <h2>Loading...</h2>;
  }

  const AddFavorite = (MoviesorTv) => {
    const storedData = localStorage.getItem('Favorite');
    const parsedData = storedData ? JSON.parse(storedData) : [];

    const existingMovie = parsedData.find((m) => m.id === MoviesorTv.id);
    if (existingMovie) {
      setShowModal(true); 

      
      return;
    }

    const updatedFavorites = [...parsedData, MoviesorTv];
    localStorage.setItem('Favorite', JSON.stringify(updatedFavorites));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="containerdetail">
      <div className="movie-details">
        {MoviesorTv.poster_path == null && (
          <img src={noposterimage} alt="" className="movie-box-img" />
        )}
        {MoviesorTv.poster_path != null && (
          <img src={`https://image.tmdb.org/t/p/w500/${MoviesorTv.poster_path}`} className="movie-poster" />
        )}
        <div>
          {MoviesorTv.title != null && <h1>{MoviesorTv.title}</h1>}
          {MoviesorTv.name != null && <h1>{MoviesorTv.name}</h1>}
          <br />
          <p>
            <strong>Overview:</strong> <span style={{ color: "white" }}> {MoviesorTv.overview} </span>
          </p>
          <br />
          {MoviesorTv.first_air_date != null && (
            <p>
              <strong>Release Date:</strong> <span style={{ color: "white" }}> {MoviesorTv.first_air_date} </span>
            </p>
          )}
          {MoviesorTv.release_date != null && (
            <p>
              <strong>Release Date:</strong> <span style={{ color: "white" }}> {MoviesorTv.release_date} </span>
            </p>
          )}
          <br />
          <p>
            <strong>Genre: </strong>
            {MoviesorTv.genre_ids.map((genre, index) => (
              <b
                style={{
                  color: "white",
                  textAlign: "justify",
                  padding: "0px",
                  flex: "1",
                  marginRight: "10px",
                }}
                key={genre}
              >
                {genre === 28 && <b>Action</b>}
                {genre === 12 && <b>Adventure</b>}
                {genre === 16 && <b>Animation</b>}
                {genre === 35 && <b>Comedy</b>}
                {genre === 80 && <b>Crime</b>}
                {genre === 99 && <b>Documentary</b>}
                {genre === 18 && <b>Drama</b>}
                {genre === 10751 && <b>Family</b>}
                {genre === 14 && <b>Fantasy</b>}
                {genre === 36 && <b>History</b>}
                {genre === 27 && <b>Horror</b>}
                {genre === 10402 && <b>Music</b>}
                {genre === 9648 && <b>Mystery</b>}
                {genre === 10749 && <b>Romance</b>}
                {genre === 878 && <b>Science Fiction</b>}
                {genre === 10770 && <b>Thriller</b>}
                {genre === 10752 && <b>War</b>}
                {genre === 37 && <b>Western</b>}
              </b>
            ))}
          </p>
          <br />
          <p>
            <strong>IMDB:</strong> <span style={{ color: "white" }}> {MoviesorTv.vote_average} </span>
          </p>
          <br />
          <br />

          <NavLink className="active" to="/">
            Home
          </NavLink>
          &nbsp;&nbsp;
          <button className="active"  onClick={() => AddFavorite(MoviesorTv)}>
            Add Favorite
          </button>
        </div>
      </div>



      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal} style={{cursor:"pointer"}}>
            <br/>
        
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{fill: "rgb(255, 165, 0)",transform: "",msFilter:""}}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path></svg>
            </span>

            <br/>
            <br/>
            <h2>Attention</h2>
            <br/>
            {MoviesorTv.title != null && <p>The movie {MoviesorTv.title}  is already in the favorites list.</p>}
          {MoviesorTv.name != null && <p>The movie {MoviesorTv.name}  is already in the favorites list.</p>}
          <br/>
            <br/>
          </div>
        </div>
      )}
    </div>
  );
}
