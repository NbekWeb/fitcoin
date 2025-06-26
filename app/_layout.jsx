import "../global.css";
import { Slot, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Provider as PaperProvider, MD3LightTheme } from "react-native-paper";
import useUser from "../hooks/user";
// import * as WebBrowser from "expo-web-browser";


const { width, height } = Dimensions.get("window");
// WebBrowser.maybeCompleteAuthSession();
export default function MainLayout() {
  const { user, loading, getUser } = useUser();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("access_token");
      if (!!token) {
        router.replace("/welcome");
      } else {
        router.replace("/dashboard/training");
        getUser();
      }
    };

    checkAuth();
  }, []);

  return (
    <PaperProvider
      style={{
        height: height,
      }}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
          // paddingBottom: insets.bottom,
          backgroundColor: "#F4F4F4",
        }}
      >
        <Slot />
        <Toast topOffset={80} />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
