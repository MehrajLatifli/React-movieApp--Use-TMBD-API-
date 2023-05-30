import React, { useEffect, useState } from 'react';
import "../../Asserts/css/style.css";
import { NavLink, useNavigate } from 'react-router-dom';
import noposterimage from "../../Asserts/img/noposter.jpg";
import Header from '../../Components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSerch, STATUSES } from '../../Store/searchSlice';
import Filter from '../../Components/Filter/Filter';
import MultiSelect from '../../Components/Select/MultiSelect';
import { Form, Formik } from 'formik';
import SingleSelect from '../../Components/Select/SingleSelect';


export default function SearchResult() {
  const [selectedCard, setSelectedCard] = useState(null);


  const { data: serchresults } = useSelector((state) => state.serchresult);
  const Serchdispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryClone, setSearchQueryClone] = useState('');

  const [formData, setFormData] = useState([]);

  const handleSubmit = (values, actions) => {

    setTimeout(() => {
      
      setSearchQueryClone("");
      
      Serchdispatch(fetchSerch({ searchQuery }));
      
      setFormData([...formData, values]);
      actions.resetForm();
      actions.setSubmitting(false);
    }, 1000);

    
  };




  const handleSearch = (event) => {

    event.preventDefault();

    setSearchQueryClone(searchQuery);

    setSearchQuery("");

    Serchdispatch(fetchSerch({ searchQuery }));

    

  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);

  };
  useEffect(() => {
    if (selectedCard) {
      const timer = setTimeout(() => {
        setSelectedCard(null);


      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedCard]);



  if (!serchresults.status === STATUSES.ERROR)
    return <h2 style={{ color: "red" }}>Something went wrong</h2>;

  if (serchresults.status === STATUSES.LOADING)
    return <h2 style={{ color: "red" }}>Loading...</h2>;


    
  const movieortv_degree = [
    { value: "movie", label: "Movie" },
    { value: "tv", label: "TV Show" },

  ];


  const primaryreleaseyear_degree = [

    { value: "1980", label: "1980" },
    { value: "1981", label: "1981" },
    { value: "1982", label: "1982" },
    { value: "1983", label: "1983" },
    { value: "1984", label: "1984" },
    { value: "1985", label: "1985" },
    { value: "1986", label: "1986" },
    { value: "1987", label: "1987" },
    { value: "1988", label: "1988" },
    { value: "1989", label: "1989" },
    { value: "1990", label: "1990" },

    { value: "1991", label: "1991" },
    { value: "1992", label: "1992" },
    { value: "1993", label: "1993" },
    { value: "1994", label: "1994" },
    { value: "1995", label: "1995" },
    { value: "1996", label: "1996" },
    { value: "1997", label: "1997" },
    { value: "1998", label: "1998" },
    { value: "1999", label: "1999" },
    { value: "2000", label: "2000" },

    { value: "2001", label: "2001" },
    { value: "2002", label: "2002" },
    { value: "2003", label: "2003" },
    { value: "2004", label: "2004" },
    { value: "2005", label: "2005" },
    { value: "2006", label: "2006" },
    { value: "2007", label: "2007" },
    { value: "2008", label: "2008" },
    { value: "2009", label: "2009" },
    { value: "2010", label: "2010" },

    { value: "2011", label: "2011" },
    { value: "2012", label: "2012" },
    { value: "2013", label: "2013" },
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },

    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },

  ];

  const sortsby_degree = [
    { value: "popularity.desc", label: "popularity desc" },
    { value: "popularity.asc", label: "popularity asc" },
    { value: "revenue.asc", label: "revenue asc" },
    { value: "revenue.desc", label: "revenue desc" },
    { value: "primary_release_date.desc", label: "primary release date.desc" },
    { value: "primary_release_date.asc", label: "primary release date asc" },
    { value: "vote_average.desc", label: "vote average desc" },
    { value: "vote_average.asc", label: "vote average asc" },
    { value: "vote_count.asc", label: "vote count asc" },
    { value: "vote_count.desc", label: "vote count desc" },
  ];


  const withgenres_degree = [

    { value: 28, label: "Action" },
    { value: 12, label: "Adventure" },
    { value: 16, label: "Animation" },
    { value: 35, label: "Comedy" },
    { value: 80 , label: "Crime" },
    { value: 99 , label: "Documentary" },
    { value: 18 , label: "Drama" },
    { value:10751, label: "Family" },
    { value: 14, label: "Fantasy" },
    { value: 36, label: "History" },
    { value: 27, label: "Horror" },
    { value: 10402, label: "Music" },
    { value: 9648, label: "Mystery" },
    { value: 10749, label: "Romance" },
    { value: 878, label: "Science Fiction" },
    { value: 10770, label: "TV Movie" },
    { value: 53, label: "Thriller" },
    { value: 10752, label: "War" },
    { value: 37, label: "Western" },

  ]


  const voteaverage_degree = [

    { value: 5, label: "<5" },
    { value: 5.5, label: "<5.5" },
    { value: 6, label: "<6" },
    { value: 6.5, label: "<6.5" },
    { value: 7, label: "<7" },
    { value: 7.5, label: "<7.5" },
    { value: 8, label: "<8" },
    { value: 8.5, label: "<8.5" },
    { value: 9, label: "<9" },
    { value: 9.5, label: "<9.5" },
    { value: 10, label: "<10" },

  ]

  return (
    <>
      <Header path ={"Home"} />
      <br />
      <br />
      <br />
      <br />

      <section className="movies container" id="movies">
        <div className="heading">
          <h2 className="heading-title">Search {searchQueryClone}</h2>
          <div className="search-box" >
            <input
              type="search"
              style={{ color: "orange", borderBottom: '1px solid orange' }}
              name=""
              id="search-input"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search movie"
            />
            <i className='bx bx-search' onClick={(event) => handleSearch(event)}></i>
          </div>
        </div>


        <div className="heading" >
          <div className="search-box">

            <Formik 
              initialValues={{
                movieortv_degree: [],
                primaryreleaseyear_degree: [],
                sortsby_degree: [],
                withgenres_degree: [],
                voteaverage_degree: [],
              }}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    <div style={{ flex: "1 0 50vw" }}>
                      <SingleSelect name="MoviesorTv" options={movieortv_degree} />
                    </div>
                    <div style={{ flex: "1 0 50vw" }}>
                      <SingleSelect name="Primaryreleaseyear" options={primaryreleaseyear_degree} />
                    </div>
                    <div style={{ flex: "1 0 50vw" }}>
                      <SingleSelect name="Sortsby" options={sortsby_degree} />
                    </div>
                    <div style={{ flex: "1 0 50vw" }}>
                      <SingleSelect name="Withgenres" options={withgenres_degree} />
                    </div>
                    <div style={{ flex: "1 0 50vw" }}>
                      <SingleSelect name="Voteaveragelte" options={voteaverage_degree} />
                    </div>

                    <button type="submit" className="active" style={{ maxHeight: "50px", flex: "1 0 50vw" }}>
                      Filter
                    </button>
                  </div>

              
                  <style>
                    {`
          @media (max-width: 768px) {
            div[style*="flexBasis: 100%"] {
              flex-basis: 100%;
              max-width: 100%;
            }
          }
        `}
                  </style>
                </Form>
              )}
            </Formik>





          </div>

        </div>

        {serchresults.length !== 0 &&
          <div key={`${serchresults.id}s`} className="movies-content" >
            {serchresults.map((serchresult, index) => (
              <div key={`${serchresult.id}_${index}s`}>
                <div
                  className={`swiper-slide ${selectedCard === serchresult.id ? "selected" : ""}`}
                  style={{ width: "250px" }}
                  onClick={() => setSelectedCard(serchresult.id)}
                >
                  <div className="movie-box">
                    {serchresult.poster_path != null && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${serchresult.poster_path}`}
                        alt=""
                        className="movie-box-img"
                      />
                    )}
                    {serchresult.poster_path == null && (
                      <img
                        src={noposterimage}
                        alt=""
                        className="movie-box-img"
                      />
                    )}
                    {selectedCard === serchresult.id && (
                      <div className="box-text">
                        <p className="movie-title">
                          {serchresult.title != null && serchresult.original_title}
                          {serchresult.name != null && serchresult.name}
                        </p>
                        <span className="movie-type">
                          <br />
                          {serchresult.vote_average >= 6 &&
                            serchresult.vote_average < 8 && (
                              <b
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  padding: "5px",
                                }}
                              >
                                IMDB: &nbsp;&nbsp;{`${serchresult.vote_average}`}
                              </b>
                            )}
                          {serchresult.vote_average >= 8 && (
                            <b
                              style={{
                                backgroundColor: "deepskyblue",
                                color: "white",
                                padding: "5px",
                              }}
                            >
                              IMDB: &nbsp;&nbsp;{`${serchresult.vote_average}`}
                            </b>
                          )}
                          {serchresult.vote_average < 6 && (
                            <b
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px",
                              }}
                            >
                              IMDB: &nbsp;&nbsp;{`${serchresult.vote_average}`}
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
                          {serchresult.first_air_date != null && `${serchresult.first_air_date}`}
                          {serchresult.release_date != null && `${serchresult.release_date}`}
                        </p>
                        <div className="links">
                          <NavLink to="/details" target="_blank" className="active">
                            Details
                            {localStorage.setItem("MoviesorTv", JSON.stringify(serchresult))}
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        }


        {serchresults.length === 0 &&

          <>
            <div key={`${serchresults.id}s`} className="movies-content" >



              <Filter formData={formData} />



            </div>

            <br />
            <br />

          </>


        }
      </section>

      <br />
      <br />
      <br />
      <br />
    </>
  );
}
