import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { Slot, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("access_token");
      // AsyncStorage.removeItem("access_token");
      if (!token) {
        router.replace("/welcome");
      }
      else{
          router.replace("/training");
      }
    };
    checkAuth();
  }, []);
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
          <View style={styles.inner}>
            <Slot />
          </View>
        </SafeAreaView>
      </PaperProvider>
      <Toast topOffset={80} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    
  },
  inner: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
