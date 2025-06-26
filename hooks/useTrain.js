import { useState } from "react";
import { api } from "../utils/api";
import Toast from "react-native-toast-message";

const useTrain = () => {
  const [trainings, setTrainings] = useState([]);
  const [training, setTraining] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllTrainings = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: "fitcoin/trainings/all/",
        method: "GET",
      });
      console.log(response.data?.results);
      setTrainings(response.data?.results);
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

  const getTrainingById = async (id) => {
    setLoading(true);
    try {
      const response = await api({
        url: `fitcoin/trainings/${id}/`,
        method: "GET",
      });
      setTraining(response.data);
      console.log(response.data);
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

  const getLessonById = async (lessonId) => {
    setLoading(true);
    try {
      const response = await api({
        url: `fitcoin/trainings/lessons/${lessonId}/`,
        method: "GET",
      });
      setLesson(response.data);
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

  const completeLesson = async (data, callback) => {
    setLoading(true);
    try {
      const response = await api({
        url: "fitcoin/user/trainings/",
        method: "POST",
        data,
      });
      if (callback) callback();
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

  return {
    trainings,
    training,
    lesson,
    loading,
    getAllTrainings,
    getTrainingById,
    getLessonById,
    completeLesson,
  };
};

export default useTrain;
