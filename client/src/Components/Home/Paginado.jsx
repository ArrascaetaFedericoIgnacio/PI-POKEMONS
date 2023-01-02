import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../Actions";
import { useEffect, useState } from "react";
import next from "../../assets/next-svgrepo-com.svg";
import prev from "../../assets/back-svgrepo-com.svg";
import styles from "./Paginado.module.css";

export default function Paginado({ totalPages }) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pages);
  const [input, setInput] = useState(page);

  const nextPage = async () => {
    dispatch(setPage(page + 1));
    setInput(page + 1);
  };
  const prevPage = () => {
    dispatch(setPage(page - 1));
    setInput(page - 1);
  };
  useEffect(() => {
    setInput(page);
  }, [page]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > totalPages ||
        isNaN(parseInt(e.target.value))
      ) {
        dispatch(setPage(1));
        setInput(1);
      } else {
        dispatch(setPage(parseInt(e.target.value)));
        setInput(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <button disabled={input === 1} onClick={prevPage}>
        Prev
      </button>
      <input
        onKeyDown={onKeyDown}
        onChange={onChange}
        autoComplete="off"
        value={input}
      />
      <p> to {totalPages}</p>
      <button disabled={input === totalPages} onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
