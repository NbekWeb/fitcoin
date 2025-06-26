import { useState } from "react";
import { api } from "../utils/api";
import Toast from "react-native-toast-message";

const useLenta = () => {
  const [userLenta, setUserLenta] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUserLenta = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: "fitcoin/lenta/users/trainings/",
        method: "GET",
        params: { limit: 100 },
      });
      console.log(response?.data?.results);
      setUserLenta(response?.data?.results || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getSearchResults = async (search) => {
    setLoading(true);
    try {
      const response = await api({
        url: "/fitcoin/lenta/users/",
        method: "GET",
        params: { search },
      });
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const postSubscribe = async (user_id, callback) => {
    try {
      const response = await api({
        url: `fitcoin/lenta/users/${user_id}/subscribe/`,
        method: "POST",
        data: { user_id },
      });
      console.log(response.data);
      console.log("response.data");
      callback();
    } catch (error) {}
  };
  const postLike = async (lesson_id, callback) => {
    try {
      const response = await api({
        url: `/fitcoin/lenta/lessons/${lesson_id}/like/`,
        method: "POST",
        data: { lesson_id },
      });
      console.log(response.data);
      console.log("response.data");
      callback();
    } catch (error) {}
  };

  return {
    userLenta,
    searchResults,
    getAllUserLenta,
    getSearchResults,
    loading,
    postSubscribe,
    postLike,
  };
};

export default useLenta;
