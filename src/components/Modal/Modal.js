import React, { useEffect, useRef } from "react";
import "./Modal.css";
import UseOnclick from "../../hooks/UseOnclick";
import UseTest from "../../hooks/UseTest";

const Modal = ({
  backdrop_path,
  name,
  overview,
  first_air_date,
  vote_average,
  OnOff,
}) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const ref = useRef();
  UseOnclick(ref, () => {
    OnOff(false);
  });

  return (
    <div className="presentation">
      <div className="wrapper_modal" ref={ref}>
        <div className="modal">
          <span className="modal_close" onClick={() => OnOff(false)}>
            X
          </span>
          <img
            className="modal_poster"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="poster_img"
          />
          <div className="modal_contents">
            <p className="modal_text">
              <span className="modal_user">100% for you</span>
              {first_air_date ? first_air_date : "날짜가 없어요오"}
            </p>
            <h2 className="modal_title">{name ? name : "제목이 없어요오"}</h2>
            <p>평점 : {vote_average}</p>
            <p className="modal_overview">
              {overview ? overview : "내용이가 없어요오~"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
