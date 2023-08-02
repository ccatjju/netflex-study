import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios";

const DetailPage = () => {
  const [movieData, setMovieData] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const movieDetail = async () => {
      const result = await instance.get(`/movie/${movieId}`);
      setMovieData(result.data);
    };

    movieDetail();
    console.log("영화정보", movieData);
  }, [movieId]);

  if (movieData) {
    return (
      <section style={{ backgroundColor: "black" }}>
        <img
          style={{
            width: "100%",
            marginTop: "100px",
          }}
          src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
          alt="이미지"
        />
      </section>
    );
  } else {
    return <div>...로딩중중</div>;
  }
};

export default DetailPage;
