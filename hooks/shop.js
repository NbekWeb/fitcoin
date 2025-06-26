import { useState } from "react";
import { api } from "../utils/api";
import Toast from "react-native-toast-message";

const useShop = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: "fitcoin/marketplace/",
        method: "GET",
      });
      console.log(response.data.results?.[0]);
      setProducts(response?.data?.results);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Не удалось загрузить продукты",
      });
    } finally {
      setLoading(false);
    }
  };

  const getOne = async (id) => {
    setLoading(true);
    try {
      const response = await api({
        url: `fitcoin/marketplace/${id}/`,
        method: "GET",
      });
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error.toJSON?.());
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Не удалось загрузить продукт",
      });
    } finally {
      setLoading(false);
    }
  };

  const buy = async (data, callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: `fitcoin/marketplace/user/`,
        method: "POST",
        data,
      });
      Toast.show({
        type: "success",
        text1: "Успех",
        text2: "Покупка прошла успешно!",
        visibilityTime: 1000,
      });
      if (callback) callback();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Не удалось совершить покупку",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    product,
    loading,
    getAll,
    getOne,
    buy,
  };
};

export default useShop;
