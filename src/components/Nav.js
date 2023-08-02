import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // console.log("스크롤", window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <div className={`Nav ${show && "Nav_change"}`}>
      <img
        className="Nav_logo"
        alt="로고"
        src="https://img.pikbest.com/png-images/black-cat-logo-for-modern-company_5617404.png!w700wp"
        onClick={() => window.location.reload()}
      />
      <input
        className="Nav_input"
        value={searchValue}
        onChange={handleChange}
        type="text"
        placeholder="검색창문을 열어라"
      />
      <img
        className="Nav_avatar"
        alt="아바타 로고"
        src="https://cdn-icons-png.flaticon.com/512/4313/4313375.png"
      />
    </div>
  );
};

export default Nav;
