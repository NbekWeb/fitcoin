import React from "react";
import Toast from "react-native-toast-message";
import { View, Text, StyleSheet, Button } from "react-native";
const showToast = () => {
  Toast.show({
    type: "success",
    text1: "Hello",
    text2: "This is some something 👋",
  });
};

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salom, React Native!</Text>
      <Button title="Show toast" onPress={showToast} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
