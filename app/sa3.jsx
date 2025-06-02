import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

export default function Main() {
  const router = useRouter();

  return (
    <View
      className="flex-1 relative items-center justify-center h-full"
      style={styles.container}
    >
      <View style={styles.wrapper}>
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
          onPress={() => router.push("/login")}
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
      </View>
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
    flex: 1,
  },
  wrapper: {
    minHeight: "max-content",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "0",
    transform: [{ translateY: "-50%" }],
    zIndex: 11,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    