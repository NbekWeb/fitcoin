import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let routerInstance = null;

export const setRouter = (router) => {
  routerInstance = router;
};

const instance = axios.create({
  baseURL: `${process.env.VITE_APP_BASE_URL}`,
});

const clearAuth = async () => {
  await AsyncStorage.removeItem("access_token");
  if (routerInstance) {
    routerInstance.push("/login");
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
      instance.interceptors.response.eject(interceptor);
      return Promise.reject(error);
    }
  );
}

createAxiosResponseInterceptor();
