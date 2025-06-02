import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useEffect } from "react";
import { Link } from "expo-router";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ACCESS_TOKEN_KEY = "access_token";

export default function Main() {
  useEffect(() => {
    const testAccessToken = async () => {
      try {
        await AsyncStorage.setItem("access_token", "dabba");
        const token = await AsyncStorage.getItem("access_token");

        console.log("Access Token:", token);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    testAccessToken();
  }, []);
  return (
    <View
      className="flex-1 relative items-center justify-center "
      style={styles.container}
    >
      <Text style={styles.title}>Начни с Fitcoin!</Text>
      <Text style={styles.paragraph}>
        САМОЕ ПРОДВИНУТОЕ ПРИЛОЖЕНИЕ ДЛЯ ФИТНЕСА, ОСНОВАННОЕ НА БЛОКЧЕЙНЕ
      </Text>
      <Button
        mode="outlined"
        textColor="black"
        buttonColor="white"
        contentStyle={{ height: 60 }}
        style={{ borderRadius: 16, width: 260 }}
        labelStyle={{
          fontSize: 17,
          fontWeight: "bold",
        }}
        onPress={() => console.log("Pressed")}
      >
        ВПЕРЁД
      </Button>
      <Image
        source={require("../assets/img/coinf.png")}
        className=""
        style={{
          width: 245,
          height: 245,
          resizeMode: "contain",
          marginTop: 35,
        }}
      />
      <Image
        source={require("../assets/img/topr.png")}
        className=""
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          zIndex: 10,
          position: "absolute",
          top: -5,
          right: 0,
        }}
      />
      <Image
        source={require("../assets/img/botl.png")}
        className=""
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          zIndex: 10,
          position: "absolute",
          bottom: -20,
          left: 0,
        }}
      />
      <Image
        source={require("../assets/img/bg-img.png")}
        className=""
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          zIndex: 10,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  title: {
    color: "#D7F651",
    fontSize: 48,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
  },
});
