import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import instance from "../../api/axios";
import UseDebounce from "../../hooks/UseDebounce";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const useQuery = new URLSearchParams(useLocation().search);
  let searchRes = useQuery.get("q");
  const DebounceSearchRes = UseDebounce(searchRes, 1000);

  useEffect(() => {
    if (DebounceSearchRes) {
      fetchSearchMovie(DebounceSearchRes);
    }
  }, [DebounceSearchRes]);

  const fetchSearchMovie = async (searchRes) => {
    try {
      const request = await instance.get(
        `/search/multi?include_adult=false&query=${searchRes}`
      );
      //   console.log(request.data.results);
      setSearchResult(request.data.results);
    } catch (err) {
      console.log("err : ", err);
    }
  };

  const renderResult = () => {
    return searchResult.length > 0 ? (
      <section className="render_page">
        <div className="render_result">
          {searchResult.map((it) => {
            if (it.backdrop_path !== null && it.media_type !== "person") {
              const movieImg =
                "https://image.tmdb.org/t/p/original/" + it.backdrop_path;
              return (
                <img
                  key={it.id}
                  className="Search_poster"
                  src={movieImg}
                  alt="이미지"
                  onClick={() => navigate(`/${it.id}`)}
                />
              );
            }
          })}
        </div>
      </section>
    ) : (
      <section className="render_page">
        <div className="no_result">
          <p>검색한 결과 : 에궁.."{DebounceSearchRes}"가 없어요오~ </p>
        </div>
      </section>
    );
  };

  return renderResult();
};

export default SearchPage;
