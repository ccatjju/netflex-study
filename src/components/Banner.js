import instance from "../api/axios";
import React, { useEffect, useState } from "react";
import requests from "../api/requests";
import "./Banner.css";
import { styled } from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 영화 정보 가져오기
    const movieList = await instance.get(requests.fetchNowPlaying);

    // 영화 id가져오기
    const movieId =
      movieList.data.results[
        Math.floor(Math.random() * movieList.data.results.length)
      ].id;

    // id를 기반으로 한 영화 상세정보 가져오기 // 객체로 준 정보들 중 data의 정보만 담기 위해 구조분해 할당한 모습임
    const { data: movieDetail } = await instance.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });

    setMovie(movieDetail);
  };

  const truncat = (text, n) => {
    return text?.length >= n ? text.substr(0, n - 1) + "..(이하중략)" : text;
  };

  //   console.log("영화정보", movie);

  const Container = styled.div`
    display: flex;
    justify-contents: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  `;

  const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
  `;

  const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 1;
    border: none;

    &::after {
        content:"",
        position:absolute;
        top:0;
        left:0;
        width:100%;
        heigth:100%;
    }
  `;

  if (!isClicked) {
    return (
      <div
        className="Banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w500/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="Banner_contents">
          <h1>{movie.title || movie.name || movie.original_name}</h1>
          <div className="Banner_buttons">
            <button
              className="Banner_button_play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="Banner_button_info">More Info</button>
          </div>
          <h4 className="Banner_overView">{truncat(movie.overview, 100)}</h4>
        </div>
        <div className="Banner_fade" />
      </div>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="560"
            height="700"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&fs=1&looop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
};

export default Banner;
