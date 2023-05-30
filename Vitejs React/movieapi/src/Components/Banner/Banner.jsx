import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  STATUSES,
  fetchBanner,
  selectRandomBanner,
} from "../../Store/bannerSlice";
import nobanner from "../../Asserts/img/nobanner.jpg";

export default function Banner() {
  const glassStyle = {
    background: "rgba(34, 34, 32, 0.91)",
    borderradius: "16px",
    marginTop: "200px",
    boxshadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropfilter: "blur(9px)",
    border: `1px solid "rgba(231, 255, 0, 0.3)"`,
  };

  const { data: banners } = useSelector((state) => state.banner);

  const RandomBanner = useSelector(selectRandomBanner);

  const Bannerdispatch = useDispatch();


  useEffect(() => {
    const delay = 1000;

    const timer = setTimeout(() => {
      Bannerdispatch(fetchBanner({ MoviesorTv: "movie" }));
    }, delay);

    return () => clearTimeout(timer);
  }, [Bannerdispatch]);



  if (!banners || banners.status === STATUSES.ERROR)
    return <h2 style={{ color: "red" }}>Something went wrong</h2>;
  if (banners.status === STATUSES.LOADING)
    return <h2 style={{ color: "red" }}>Loading...</h2>;

  return (
    <>
      {banners.slice(0, 1).map((banner) => (
        <section className="home container" id="home" key={banner.id}>
          {RandomBanner.backdrop_path !== null && (
            <img
              src={`https://image.tmdb.org/t/p/original/${RandomBanner.backdrop_path}`}
              alt="Banner"
              className="home-img"
            />
          )}
          {RandomBanner.backdrop_path === null && (
            <img src={nobanner} alt="Banner" className="home-img" />
          )}

          <div className="home-text" style={glassStyle}>
            <br />
            <h1
              style={{
                textAlign: "justify",
                padding: "10px 20px 20px 0px",
                color: "orange",
              }}
              className="home-title"
            >
              Title:{" "}
              <b
                style={{
                  textAlign: "justify",
                  padding: "10px 20px 20px 0px",
                  color: "white",
                }}
              >
                {" "}
                &nbsp; {`${RandomBanner.original_title}`}{" "}
              </b>
            </h1>
            <p style={{ textAlign: "justify", padding: "10px 20px 20px 0px" }}>
              <b>Imdb:</b>
              &nbsp; &nbsp; &nbsp; &nbsp;
              {RandomBanner.vote_average >= 6 &&
                RandomBanner.vote_average < 8 && (
                  <b
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "5px",
                    }}
                  >{`${RandomBanner.vote_average}`}</b>
                )}
              {RandomBanner.vote_average >= 8 && (
                <b
                  style={{
                    backgroundColor: "deepskyblue",
                    color: "white",
                    padding: "5px",
                  }}
                >{`${RandomBanner.vote_average}`}</b>
              )}
              {RandomBanner.vote_average < 6 && (
                <b
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px",
                  }}
                >{`${RandomBanner.vote_average}`}</b>
              )}
            </p>

            <p
              style={{
                fontWeight: "bold",
                textAlign: "justify",
                padding: "10px 20px 20px 0px",
              }}
            >
              <b>Genre:</b> &nbsp;&nbsp;
              {RandomBanner.genre_ids.map((genre) => (
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
          </div>
        </section>
      ))}
    </>
  );
}
