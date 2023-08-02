import React, { useEffect } from "react";

const UseOnclick = (ref, handler) => {
  useEffect(() => {
    const listner = (event) => {
      //   const result = ref.current.contains(event.target);
      //   console.log("리져츠", result);
      if (ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);

    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, []);
};

export default UseOnclick;
