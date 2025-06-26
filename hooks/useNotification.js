import { useState, useRef } from "react";
import { api } from "../utils/api";
import Toast from "react-native-toast-message";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState(null);

  const getAllNotifications = async (callback = () => {}) => {
    try {
      const response = await api({
        url: "fitcoin/notifications/",
        method: "GET",
      });

      const results = response?.data || [];

      setNotifications(results);
      callback(results);
    } catch (error) {
      console.log(error.toJSON?.());
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Не удалось загрузить уведомления",
      });
    }
  };

  const getOneNotification = async (id) => {
    try {
      const response = await api({
        url: `fitcoin/notification/${id}/`,
        method: "GET",
      });
      setNotification(response.data.results);
    } catch (error) {}
  };

  const readNotification = async (id, message, callback) => {
    try {
      await api({
        url: `fitcoin/notifications/${id}/`,
        method: "PUT",
        data: { is_read: true, message },
      });
      callback();
    } catch (error) {}
  };

  return {
    notifications,
    notification,
    getAllNotifications,
    getOneNotification,
    readNotification,
  };
};

export default useNotification;
