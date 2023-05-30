import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller } from "swiper";
import { fetchToprated, STATUSES } from "../../Store/topratedSlice";
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

export default function Toprated() {


  const { data: toprateds } = useSelector((state) => state.toprated);

  const [MoviesorTv, setMovie] = useState("Movies");

  const Toprateddispatch = useDispatch();

  const [toggle2, setToggle2] = useState(false);

  const swiperRef = useRef(null);





  useEffect(() => {


    Toprateddispatch(fetchToprated({ MoviesorTv: "movie" }));


  }, [Toprateddispatch]);

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
      swiperRef.current.swiper.update();

      
    }
  }, [toprateds]);



  const handleToggle2 = (value) => {
    setToggle2(value); 

    if (value) {
      setMovie("TV Shows");
      Toprateddispatch(fetchToprated({ MoviesorTv: "tv" }));
    } else {
      setMovie("Movies");
      Toprateddispatch(fetchToprated({ MoviesorTv: "movie" }));
    }

  };





  



  if (!toprateds.status === STATUSES.ERROR)
    return <h2 style={{ color: "red" }}>Something went wrong</h2>;
  if (toprateds.status === STATUSES.LOADING)
    return <h2 style={{ color: "red" }}>Loading...</h2>;




  if (MoviesorTv === "Movies") {
    return (
      <>

        <section className="popular container" id="popular">
          <div className="heading">
            <h2 className="heading-title">
              <b>Top Rated </b> &nbsp; <b style={{ color: "orange" }}>{MoviesorTv}</b>
            </h2>
            <div className="swiper-btn">
              <div className="toggle-container">
                <ToggleButton isActive={toggle2} onToggle={handleToggle2} />
              </div>

              {/* <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div> */}
            </div>
          </div>

          <div className="popular-content swiper swiper-container">
            <div className="swiper-wrapper">
              {toprateds.slice(0, 1).map((toprated, index) => (
                <Swiper
                  key={`${toprated.id}_${index}p`}
         

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
                  {toprateds.map((toprated, index) => (
                    <SwiperSlide key={`${toprated.id}_${index}p`}>
                      <div className={`swiper-slide ${selectedCard === toprated.id ? "selected" : ""}`}
                        style={{ width: "250px" }}
                        onClick={() => setSelectedCard(toprated.id)}>
                        <div className="movie-box">
                          {toprated.poster_path != null && (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${toprated.poster_path}`}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {toprated.poster_path == null && (
                            <img
                              src={noposterimage}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {selectedCard === toprated.id && (
                            <div className="box-text">
                              <p className="movie-title">
                                {toprated.original_title}
                              </p>

                              <span className="movie-type">
                                <br />

                                {toprated.vote_average >= 6 &&
                                  toprated.vote_average < 8 && (
                                    <b
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "5px",
                                      }}
                                    >  IMDB: &nbsp;&nbsp; {`${toprated.vote_average}`}</b>
                                  )}
                                {toprated.vote_average >= 8 && (
                                  <b
                                    style={{
                                      backgroundColor: "deepskyblue",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${toprated.vote_average}`}</b>
                                )}
                                {toprated.vote_average < 6 && (
                                  <b
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${toprated.vote_average}`}</b>
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
                                {`${toprated.release_date}`}
                              </p>


                              <div className="links">
                              <NavLink to="/details" target="_blank" className="active">
                                  Details
                                  {  localStorage.setItem("MoviesorTv", JSON.stringify(toprated))}
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
              <b>Top Rated &nbsp; </b> <b style={{ color: "orange" }}>{MoviesorTv}</b>
            </h2>
            <div className="swiper-btn">
              <div className="toggle-container">
                <ToggleButton isActive={toggle2} onToggle={handleToggle2} />
              </div>

              {/* <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div> */}
            </div>
          </div>

          <div className="popular-content swiper swiper-container">
            <div className="swiper-wrapper">
              {toprateds.slice(0, 1).map((toprated, index) => (
                <Swiper
                  key={`${toprated.id}_${index}p`}

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
                  {toprateds.map((toprated, index) => (
                    <SwiperSlide key={`${toprated.id}_${index}p`}>
                      <div
                        className={`swiper-slide ${selectedCard === toprated.id ? "selected" : ""
                          }`}
                        style={{ width: "250px" }}
                        onClick={() => setSelectedCard(toprated.id)}
                      >
                        <div className="movie-box">
                          {toprated.poster_path != null && (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${toprated.poster_path}`}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {toprated.poster_path == null && (
                            <img
                              src={noposterimage}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {selectedCard === toprated.id && (
                            <div className="box-text">
                              <p className="movie-title">{toprated.name}</p>

                              <span className="movie-type">
                                <br />

                                {toprated.vote_average >= 6 &&
                                  toprated.vote_average < 8 && (
                                    <b
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "5px",
                                      }}
                                    >IMDB: &nbsp;&nbsp;{`${toprated.vote_average}`}</b>
                                  )}
                                {toprated.vote_average >= 8 && (
                                  <b
                                    style={{
                                      backgroundColor: "deepskyblue",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >IMDB: &nbsp;&nbsp;{`${toprated.vote_average}`}</b>
                                )}
                                {toprated.vote_average < 6 && (
                                  <b
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >IMDB: &nbsp;&nbsp;{`${toprated.vote_average}`}</b>
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
                                {`${toprated.first_air_date}`}
                              </p>

                              <br />

                              <div className="links">
                              <NavLink to="/details" className="active">
                                  Details
                                  {  localStorage.setItem("MoviesorTv", JSON.stringify(toprated))}
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
