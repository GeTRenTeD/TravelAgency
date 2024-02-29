import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../store/alertsSlice"; 

const useFetch = url => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Получаем функцию диспетчера из React Redux

  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoading()); // Диспетчируем экшен для показа состояния загрузки
      setLoading(true);
      try {
        const res = await fetch(url);

        if (!res.ok) {
          setError("failed to fetch");
        }
        const result = await res.json();

        setData(result.data);
        setLoading(false);
        dispatch(hideLoading()); // Диспетчируем экшен для скрытия состояния загрузки
      } catch (err) {
        setError(err.message);
        setLoading(false);
        dispatch(hideLoading()); // Диспетчируем экшен для скрытия состояния загрузки в случае ошибки
      }
    };

    fetchData();
  }, [url, dispatch]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
