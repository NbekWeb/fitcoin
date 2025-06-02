import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function ByLogin() {
  return (
    <View>
      <Text style={styles.loginBy}>Или войти через</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("../assets/img/g.png")}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.googleText}>Connect with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.apple}>
        <Image
          source={require("../assets/img/apple.png")}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.appleText}>Connect with Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBy: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 12,
    color: "#303841",
    fontWeight: 500,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#69696940",
    height: 55,
    paddingHorizontal: 16,
    width: "100%",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  googleText: {
    fontSize: 16,
    lineHeight: 17,
    fontWeight: "bold",
    color: "#303841",
  },
  apple: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent",
    height: 55,
    paddingHorizontal: 16,
    width: "100%",
    marginTop:10
  },
   appleText: {
    fontSize: 16,
    lineHeight: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
