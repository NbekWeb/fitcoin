import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";
import Toast from "react-native-toast-message";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState(null);
  const [purposes, setPurposes] = useState(null);
  const postLogin = async (email, password, callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/login/",
        method: "POST",
        data: {
          email,
          password,
        },
      });

      const accessToken = response?.data?.tokens?.access;

      await AsyncStorage.setItem("access_token", accessToken);
      Toast.show({
        type: "success",
        text1: "Успех",
        text2: `Добро пожаловать!`,
        visibilityTime: 2000,
      });
      callback();
    } catch (error) {
      console.log(error.response.data);
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Неверный логин или пароль",
      });
    } finally {
      setLoading(false);
    }
  };
  const postResend = async (email, callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/resend/code/",
        method: "POST",
        data: {
          email,
        },
      });
      Toast.show({
        type: "success",
        text1: "Успех",
        text2: `Код отправлен на email!`,
      });
      callback();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Что-то пошло не так",
      });
    } finally {
      setLoading(false);
    }
  };
  const postVerify = async (data, callback = () => {}) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/verify/code/",
        method: "POST",
        data,
      });
      console.log(response);
      const accessToken = response?.data?.access;
      await AsyncStorage.removeItem("access_token");
      if (accessToken) {
        await AsyncStorage.setItem("access_token", accessToken);
        Toast.show({
          type: "success",
          text1: "Успех",
          text2: `Добро пожаловать!`,
        });
        callback();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Код введён неверно",
      });
    } finally {
      setLoading(false);
    }
  };
  const postRegis = async (data, callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/register/",
        method: "POST",
        data,
      });

      Toast.show({
        type: "success",
        text1: "Успех",
        text2: `Код отправлен на email!`,
        visibilityTime: 1000,
      });
      callback();
    } catch (error) {
      console.log(error.toJSON?.());

      if (error?.response?.status == 400) {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: "Email уже используется.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: "Что-то пошло не так",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const postReset = async (data, callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/password/reset/request/",
        method: "POST",
        data,
      });

      Toast.show({
        type: "success",
        text1: "Успех",
        text2: `Код отправлен на email!`,
      });
      callback();
    } catch (error) {
      console.log(error.toJSON?.());

      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Что-то пошло не так",
      });
    } finally {
      setLoading(false);
    }
  };
  const postConfirm = async (data, callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/password/reset/confirm/",
        method: "POST",
        data,
      });
      console.log("s");
      callback();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Что-то пошло не так",
      });
    } finally {
      setLoading(false);
    }
  };
  const getTrain = async (callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/trainings/",
        method: "GET",
      });
      setTrains(response?.data);
      callback(response?.data);
    } catch (error) {
      console.log(error.toJSON?.());

      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Что-то пошло не так",
      });
    } finally {
      setLoading(false);
    }
  };
  const getPurpose = async (callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/purpose/",
        method: "GET",
      });
      setPurposes(response?.data);
      callback(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log(error.toJSON?.());

      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Что-то пошло не так",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    postLogin,
    loading,
    postRegis,
    postResend,
    postVerify,
    postReset,
    postConfirm,
    getTrain,
    trains,
    purposes,
    getPurpose,
  };
};

export default useAuth;
