import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchPopular } from "../../Store/popularSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "../../Asserts/css/card.css";
import noposterimage from "../../Asserts/img/noposter.jpg";
import ToggleButton from "../ToggleButton/ToggleButton";


SwiperCore.use([Navigation, Pagination,Controller]);

export default function Popular() {


  const { data: populars } = useSelector((state) => state.popular);

  const Populardispatch = useDispatch();
  const [MoviesorTv, setMovie] = useState("Movies");


  const [toggle2, setToggle2] = useState(false);

  const swiperRef = useRef(null);

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);


  // const filteredData = populars.filter(tvSeries => tvSeries.vote_average >= 5.5);
  useEffect(() => {


    Populardispatch(fetchPopular({ MoviesorTv: "movie" }));


  }, [Populardispatch]);

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (selectedCard) {
      const timer = setTimeout(() => {
        setSelectedCard(null);
        
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [selectedCard]);


  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();// Update Swiper instance when data changes

      
    }
  }, [populars]);



  const handleToggle2 = (value) => {
    setToggle2(value); // Toggle the state of toggle2

    if (value) {
      setMovie("TV Shows");
      Populardispatch(fetchPopular({ MoviesorTv: "tv" }));
    } else {
      setMovie("Movies");
      Populardispatch(fetchPopular({ MoviesorTv: "movie" }));
    }

  };





  



  if (!populars.status === STATUSES.ERROR)
    return <h2 style={{ color: "red" }}>Something went wrong</h2>;
  if (populars.status === STATUSES.LOADING)
    return <h2 style={{ color: "red" }}>Loading...</h2>;




  if (MoviesorTv === "Movies") {
    return (
      <>

        <section className="popular container" id="popular">
          <div className="heading">
            <h2 className="heading-title">
              <b>Popular </b> &nbsp; <b style={{ color: "orange" }}>{MoviesorTv}</b>
            </h2>
            <div className="swiper-btn">
              <div className="toggle-container">
                <ToggleButton isActive={toggle2} onToggle={handleToggle2} />
              </div>

            </div>
          </div>

          <div className="popular-content swiper swiper-container">
            <div className="swiper-wrapper">
              {populars.slice(0, 1).map((popular, index) => (
                <Swiper
                  key={`${popular.id}_${index}p`}
         

                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    el: `.swiper-pagination`,
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    280: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    510: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    758: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                    900: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {populars.map((popular, index) => (
                    <SwiperSlide key={`${popular.id}_${index}p`}>
                      <div className={`swiper-slide ${selectedCard === popular.id ? "selected" : ""}`}
                        style={{ width: "250px" }}
                        onClick={() => setSelectedCard(popular.id)}>
                        <div className="movie-box">
                          {popular.poster_path != null && (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${popular.poster_path}`}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {popular.poster_path == null && (
                            <img
                              src={noposterimage}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {selectedCard === popular.id && (
                            <div className="box-text">
                              <p className="movie-title">
                                {popular.original_title}
                              </p>

                              <span className="movie-type">
                                <br />

                                {popular.vote_average >= 6 &&
                                  popular.vote_average < 8 && (
                                    <b
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "5px",
                                      }}
                                    >  IMDB: &nbsp;&nbsp; {`${popular.vote_average}`}</b>
                                  )}
                                {popular.vote_average >= 8 && (
                                  <b
                                    style={{
                                      backgroundColor: "deepskyblue",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${popular.vote_average}`}</b>
                                )}
                                {popular.vote_average < 6 && (
                                  <b
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${popular.vote_average}`}</b>
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
                                {`${popular.release_date}`}
                              </p>


                              <div className="links">
                                <NavLink to="/details" target="_blank" className="active" >
                                  Details
                                  
                                  {  localStorage.setItem("MoviesorTv", JSON.stringify(popular))}
                                </NavLink>
                              </div>

                            </div>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ))}
            </div>
          </div>
        </section>


      </>
    );
  }

  if (MoviesorTv === "TV Shows") {

    return (
      <>


        <section className="popular container" id="popular">
          <div className="heading">
            <h2 className="heading-title">
              <b>Popular </b> &nbsp; <b style={{ color: "orange" }}>{MoviesorTv}</b>
            </h2>
            <div className="swiper-btn">
              <div className="toggle-container">
                <ToggleButton isActive={toggle2} onToggle={handleToggle2} />
              </div>


            </div>
          </div>

          <div className="popular-content swiper swiper-container">
            <div className="swiper-wrapper">
              {populars.slice(0, 1).map((popular, index) => (
                <Swiper
                  key={`${popular.id}_${index}p`}

                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    280: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    510: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    758: {
                      slidesPerView: 3,
                      spaceBetween: 15,
                    },
                    900: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                >
                  {populars.map((popular, index) => (
                    <SwiperSlide key={`${popular.id}_${index}p`}>
                      <div
                        className={`swiper-slide ${selectedCard === popular.id ? "selected" : ""
                          }`}
                        style={{ width: "250px" }}
                        onClick={() => setSelectedCard(popular.id)}
                      >
                        <div className="movie-box">
                          {popular.poster_path != null && (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${popular.poster_path}`}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {popular.poster_path == null && (
                            <img
                              src={noposterimage}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {selectedCard === popular.id && (
                            <div className="box-text">
                              <p className="movie-title">{popular.name}</p>

                              <span className="movie-type">
                                <br />

                                {popular.vote_average >= 6 &&
                                  popular.vote_average < 8 && (
                                    <b
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "5px",
                                      }}
                                    >IMDB: &nbsp;&nbsp;{`${popular.vote_average}`}</b>
                                  )}
                                {popular.vote_average >= 8 && (
                                  <b
                                    style={{
                                      backgroundColor: "deepskyblue",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >IMDB: &nbsp;&nbsp;{`${popular.vote_average}`}</b>
                                )}
                                {popular.vote_average < 6 && (
                                  <b
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >IMDB: &nbsp;&nbsp;{`${popular.vote_average}`}</b>
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
                                {`${popular.first_air_date}`}
                              </p>

                              <br />

                              <div className="links">
                              <NavLink to="/details" className="active">
                                  Details
                                  {  localStorage.setItem("MoviesorTv", JSON.stringify(popular))}
                                </NavLink>
                              </div>

                            </div>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ))}
            </div>
          </div>
        </section>


      </>
    );

  }
}
