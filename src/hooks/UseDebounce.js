import { useState, useEffect } from "react";

const UseDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // console.log("유즈이펙트 실행");
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      // console.log("클리어작동");
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

export default UseDebounce;
