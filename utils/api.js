import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

let routerInstance = null;

export const setRouter = (router) => {
  routerInstance = router;
};

const instance = axios.create({
  baseURL: "https://api2.study-sales.ru/api/",
});

const clearAuth = async () => {
  await AsyncStorage.removeItem("access_token");
  if (routerInstance) {
    routerInstance.push("/auth/login");
  }
};

export const api = async ({ url, open = false, ...props }) => {
  let token = await AsyncStorage.getItem("access_token");
  if (token) token = `Bearer ${token}`;

  if (!open) {
    props.headers = {
      ...props.headers,
      Authorization:
        props.headers && props.headers.Authorization
          ? props.headers.Authorization
          : token,
    };
  }

  return instance({
    url: url,
    ...props,
  });
};

function createAxiosResponseInterceptor() {
  const interceptor = instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const access_token = await AsyncStorage.getItem("access_token");
        if (access_token) {
          await clearAuth();
        }
      }
      if (error.message === "Network Error") {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: `Нет подключения к интернету`,
          visibilityTime: 2000,
        });
      }
      instance.interceptors.response.eject(interceptor);
      return Promise.reject(error);
    }
  );
}

createAxiosResponseInterceptor();
