import React, { useEffect, useState } from "react";
import instance from "../api/axios";
import "./Row.css";
import Modal from "./Modal/Modal";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ isLargeRow, title, id, fetchURL }) => {
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState(false);
  const [movieSelected, SetMovieSelected] = useState([]);

  useEffect(() => {
    movieData();
  }, []);

  const movieData = async () => {
    const requests = await instance.get(fetchURL);
    setMovies(requests.data.results);
  };

  const handleClick = (movie) => {
    setModal(true);
    SetMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        {/* <div className="slider_box">
          <div
            className="slider_Left"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            <span className="arrow">{"<"}</span>
          </div>
          <div
            className="slider_Right"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            <span className="arrow">{">"}</span>
          </div>
        </div> */}

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            1378: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            998: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            625: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}
        >
          <div id={id} className="row_List">
            {movies.map((it) => (
              <SwiperSlide>
                <img
                  key={it.id}
                  className={`row_Poster ${isLargeRow && "row_PosterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? it.poster_path : it.backdrop_path
                  }`}
                  alt={it.name}
                  onClick={() => {
                    handleClick(it);
                  }}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <div>{modal && <Modal {...movieSelected} OnOff={setModal} />}</div>
    </section>
  );
};

export default Row;
