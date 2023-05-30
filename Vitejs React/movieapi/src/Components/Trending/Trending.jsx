import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller, Autoplay   } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../Asserts/css/card.css";
import noposterimage from "../../Asserts/img/noposter.jpg";
import { fetchTrending, STATUSES } from "../../Store/trendingSlice";
import ToggleButton from "../ToggleButton/ToggleButton";

SwiperCore.use([Navigation, Pagination, Controller,Autoplay]);

export default function Trending() {
  const { data: trendings } = useSelector((state) => state.trending);
  const [DayorWeekTitle, setDayorWeekTitle] = useState("Daily");
  const [DayorWeek, setDayorWeek] = useState("day");
  const Trendingdispatch = useDispatch();
  const swiperRef = useRef(null); // Reference to the Swiper instance

  const [toggle2, setToggle2] = useState(false);

  useEffect(() => {
    Trendingdispatch(fetchTrending({ DayorWeek }));
  }, [Trendingdispatch]);

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
  }, [trendings]);

  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const handleToggle2 = (value) => {
    setToggle2(value);

    if (value) {
      setDayorWeekTitle("Weekly");
      setDayorWeek("week");
      Trendingdispatch(fetchTrending({ DayorWeek: "week" }));
    } else {
      setDayorWeekTitle("Daily");
      setDayorWeek("day");
      Trendingdispatch(fetchTrending({ DayorWeek: "day" }));
    }
  };

  if (!trendings || trendings.status === STATUSES.ERROR)
    return <h2 style={{ color: "red" }}>Something went wrong</h2>;
  if (trendings.status === STATUSES.LOADING)
    return <h2 style={{ color: "red" }}>Loading...</h2>;


  if (DayorWeekTitle === "Daily") {
    return (
      <>

        <section className="popular container" id="popular">
          <div className="heading">
            <h2 className="heading-title">
              <b style={{ color: "orange" }}>{DayorWeekTitle}</b> &nbsp; <b> Trends </b>
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
              {trendings.slice(0, 1).map((t, index) => (
                <Swiper
                  key={`${t.id}_${index}t`}
                  ref={swiperRef}
     
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
                  {trendings.map((trending, index) => (
                    <SwiperSlide key={`${trending.id}_${index}`}>
                      <div className={`swiper-slide ${selectedCard === trending.id ? "selected" : ""}`}
                        style={{ width: "250px" }}
                        onClick={() => setSelectedCard(trending.id)}>
                        <div className="movie-box">
                          {trending.poster_path != null && (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {trending.poster_path == null && (
                            <img
                              src={noposterimage}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {selectedCard === trending.id && (
                            <div className="box-text">
                              <p className="movie-title">
                                {trending.original_title}
                              </p>

                              <span className="movie-type">
                                <br />

                                {trending.vote_average >= 6 &&
                                  trending.vote_average < 8 && (
                                    <b
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "5px",
                                      }}
                                    >  IMDB: &nbsp;&nbsp; {`${trending.vote_average}`}</b>
                                  )}
                                {trending.vote_average >= 8 && (
                                  <b
                                    style={{
                                      backgroundColor: "deepskyblue",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${trending.vote_average}`}</b>
                                )}
                                {trending.vote_average < 6 && (
                                  <b
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >  IMDB: &nbsp;&nbsp; {`${trending.vote_average}`}</b>
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
                                {`${trending.release_date}`}
                              </p>


                              <div className="links">
                              <NavLink to="/details" target="_blank" className="active">
                                  Details
                                  {  localStorage.setItem("MoviesorTv", JSON.stringify(trending))}
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

  if (DayorWeekTitle === "Weekly") {

    return (
      <>


        <section className="popular container" id="popular">
          <div className="heading">
            <h2 className="heading-title">
              <b style={{ color: "orange" }}>{DayorWeekTitle}</b> &nbsp; <b> Trends </b>
            </h2>
            <div className="swiper-btn">
              <div className="toggle-container">
                <ToggleButton isActive={toggle2} onToggle={handleToggle2} />
              </div>


            </div>
          </div>

          <div className="popular-content swiper swiper-container">
            <div className="swiper-wrapper">
              {trendings.slice(0, 1).map((t, index) => (
                <Swiper
                  ref={swiperRef}
                  key={`${t.id}_${index}t`}
  
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    el: `.swiper-pagination`,
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 5000,
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
                  {trendings.map((trending, index) => (
                    <SwiperSlide key={`${trending.id}_${index}`}>
                      <div
                        className={`swiper-slide ${selectedCard === trending.id ? "selected" : ""
                          }`}
                        style={{ width: "250px" }}
                        onClick={() => setSelectedCard(trending.id)}
                      >
                        <div className="movie-box">
                          {trending.poster_path != null && (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${trending.poster_path}`}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {trending.poster_path == null && (
                            <img
                              src={noposterimage}
                              alt=""
                              className="movie-box-img"
                            />
                          )}
                          {selectedCard === trending.id && (
                            <div className="box-text">
                              <p className="movie-title">{trending.name}</p>

                              <span className="movie-type">
                                <br />

                                {trending.vote_average >= 6 &&
                                  trending.vote_average < 8 && (
                                    <b
                                      style={{
                                        backgroundColor: "green",
                                        color: "white",
                                        padding: "5px",
                                      }}
                                    >IMDB: &nbsp;&nbsp;{`${trending.vote_average}`}</b>
                                  )}
                                {trending.vote_average >= 8 && (
                                  <b
                                    style={{
                                      backgroundColor: "deepskyblue",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >IMDB: &nbsp;&nbsp;{`${trending.vote_average}`}</b>
                                )}
                                {trending.vote_average < 6 && (
                                  <b
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                      padding: "5px",
                                    }}
                                  >IMDB: &nbsp;&nbsp;{`${trending.vote_average}`}</b>
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
                                {`${trending.first_air_date}`}
                              </p>

                              <br />

                              <div className="links">
                              <NavLink to="/details" className="active">
                                  Details
                                  {  localStorage.setItem("MoviesorTv", JSON.stringify(trending))}
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
