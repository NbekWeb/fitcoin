import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function ByLogin() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "340279459405-g46hb1be0cd8gnlcm32fbaaek5joe26r.apps.googleusercontent.com",
    expoClientId:
      "340279459405-s1hjn2ir6s87g1kcc4rrf612cls29ln2.apps.googleusercontent.com", 
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("✅ Google ID TOKEN:", id_token);
    }
  }, [response]);

  return (
    <View>
      <Text style={styles.loginBy}>Или войти черезa s</Text>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
      >
        <Image
          source={require("../assets/img/g.png")}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.googleText}>Connect with Google</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.apple}>
        <Image
          source={require("../assets/img/apple.png")}
          style={styles.googleIcon}
          resizeMode="contain"
        />
        <Text style={styles.appleText}>Connect with Apple</Text>
      </TouchableOpacity> */}
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
    marginTop: 10,
  },
  appleText: {
    fontSize: 16,
    lineHeight: 17,
    fontWeight: "bold",
    color: "#fff",
  },
});
