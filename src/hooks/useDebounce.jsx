import { useEffect } from "react";

const useDebounce = (value, delay, callback) => {
  let handler;

  useEffect(() => {
    handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return () => handler && clearTimeout(handler);
};

export default useDebounce;
