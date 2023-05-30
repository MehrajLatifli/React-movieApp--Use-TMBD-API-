import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchFilter, STATUSES } from '../../Store/filterSlice';
import noposterimage from "../../Asserts/img/noposter.jpg";

export default function Filter({ formData }) {
  const { data: filters, status } = useSelector((state) => state.filter);
  const filterDispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(1);
  const [MoviesorTv, setMoviesorTv] = useState('movie');
  const [primary_release_year, setPrimary_release_year] = useState(2023);
  const [sorts_by, setSorts_by] = useState('popularity.desc');
  const [with_genres, setWith_genres] = useState(80);
  const [vote_average_lte, setVote_average] = useState('6');


  const { data: serchresults } = useSelector((state) => state.serchresult);



  useEffect(() => {
    formData.forEach((item) => {
      if (item.MoviesorTv && item.MoviesorTv.value) {
        setMoviesorTv(item.MoviesorTv.value);
      }
      if (item.Primaryreleaseyear && item.Primaryreleaseyear.value) {
        setPrimary_release_year(item.Primaryreleaseyear.value);
      }
      if (item.Withgenres && item.Withgenres.value) {
        setWith_genres(item.Withgenres.value);
      }
      if (item.Voteaveragelte && item.Voteaveragelte.value) {
        setVote_average(item.Voteaveragelte.value);
      }
      if (item.Sortsby && item.Sortsby.value) {
        setSorts_by(item.Sortsby.value);
      }
    });
  }, [formData]);

  const increasePage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    filterDispatch(
      fetchFilter({
        MoviesorTv,
        page,
        primary_release_year,
        sorts_by,
        with_genres,
        vote_average_lte
      })
    );
  }, [filterDispatch, MoviesorTv, page, primary_release_year, sorts_by, with_genres, vote_average_lte]);

  useEffect(() => {
    if (selectedCard) {
      const timer = setTimeout(() => {
        setSelectedCard(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedCard]);

  if (status === STATUSES.ERROR)
    return <h2 style={{ color: "red" }}>Something went wrong</h2>;

  if (status === STATUSES.LOADING)
    return <h2 style={{ color: "red" }}>Loading...</h2>;

  if (filters.length === 0) {
    return <h2 style={{ color: "red" }}>No Data</h2>;
  }


  
  if (filters.length !== 0) {

    
  
  }

  if (filters.length !== 0) {
    return (
      <>
        {filters.map((filter, index) => (
          <div key={`${filter.id}_${index}s`}>
            <div
              className={`swiper-slide ${selectedCard === filter.id ? "selected" : ""}`}
              style={{ width: "250px" }}
              onClick={() => setSelectedCard(filter.id)}
            >
              <div className="movie-box">
                {!filter.poster_path ? (
                  <img src={noposterimage} alt="" className="movie-box-img" />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${filter.poster_path}`}
                    alt=""
                    className="movie-box-img"
                  />
                )}
                {selectedCard === filter.id && (
                  <div className="box-text">
                    <p className="movie-title">
                      {filter.title != null && filter.original_title}
                      {filter.name != null && filter.name}
                    </p>
                    <span className="movie-type">
                      <br />
                      {filter.vote_average >= 6 && filter.vote_average < 8 && (
                        <b
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "5px",
                          }}
                        >
                          IMDB: &nbsp;&nbsp;{`${filter.vote_average}`}
                        </b>
                      )}
                      {filter.vote_average >= 8 && (
                        <b
                          style={{
                            backgroundColor: "deepskyblue",
                            color: "white",
                            padding: "5px",
                          }}
                        >
                          IMDB: &nbsp;&nbsp;{`${filter.vote_average}`}
                        </b>
                      )}
                      {filter.vote_average < 6 && (
                        <b
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "5px",
                          }}
                        >
                          IMDB: &nbsp;&nbsp;{`${filter.vote_average}`}
                        </b>
                      )}
                    </span>
                    <br />
                    <br />
                    <p
                      className="movie-type"
                      style={{
                        margin: "20px",
                      }}
                    >
                      {filter.first_air_date != null && `${filter.first_air_date}`}
                      {filter.release_date != null && `${filter.release_date}`}
                    </p>
                    <div className="links">
                      <NavLink to="/details" target="_blank" className="active">
                        Details
                        {localStorage.setItem(
                          "MoviesorTv",
                          JSON.stringify(filter)
                        )}
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}






          <button
            type="submit"
            onClick={increasePage}
            className="Favoriteremove-button"
    
          >
           More 
          </button>

      </>
    );
  }
}
