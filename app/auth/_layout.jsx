import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Slot } from "expo-router";

export default function Auth() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
          <Slot />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
   
  },
});
