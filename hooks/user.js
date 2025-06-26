import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";
import Toast from "react-native-toast-message";
import * as mime from "mime";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userTrain, setUserTrain] = useState([]);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: "auth/profile/",
        method: "GET",
      });
      setUser(response?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getUserTrain = async (period = "") => {
    setLoading(true);
    try {
      const response = await api({
        url: "fitcoin/user/trainings/",
        method: "GET",
        params: {
          period,
        },
      });
      setUserTrain(response?.data?.results);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const updateUser = async (user, callback = () => {}) => {
    const formData = new FormData();

    if (user.avatar && user.avatar.uri) {
      const { uri, name, type } = user.avatar;
      formData.append("avatar", {
        uri,
        name,
        type,
      });
    }

    formData.append("id", user.id);
    formData.append("email", user.email);
    formData.append("full_name", user.full_name);
    formData.append("years", user.years);
    formData.append("weight", user.weight);
    formData.append("height", user.height);
    setLoading(true);
    try {
      const response = await api({
        url: "auth/profile/",
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(response?.data);
      callback();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    getUser,
    loading,
    user,
    userTrain,
    setUser,
    updateUser,
    getUserTrain,
  };
};

export default useUser;
