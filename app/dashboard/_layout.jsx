import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Slot } from "expo-router";
import Tab from "../../components/Tab";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function DashboardLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View
        style={{
          marginTop: 5,
          position: "relative",
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "#F4F4F4",
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 + insets.bottom }}
        >
          <Slot />
        </ScrollView>
        <Tab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    flex:1
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
