import React, { useState, useRef } from "react";
import Toast from "react-native-toast-message";

import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TextInput, Button } from "react-native-paper";
import { useRouter, Link } from "expo-router";

export default function Forgot() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            width: 30,
          }}
        >
          <Icon
            name="chevron-left"
            size={30}
            color="#000"
            onPress={() => router.push("/auth/login")}
          />
        </View>
        <Text style={styles.welcome}>Забыл пароль</Text>
        <Text style={styles.paragraph}>
          Пожалуйста напишите вашу почту и мы отправим вам код.
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.codeContainer}
        >
          <TextInput
            label="Новый пароль"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
            }}
            textColor="#303841"
            theme={{
              colors: {
                primary: "#303841",
              },
            }}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
                forceTextInputFocus={false}
              />
            }
          />
        </KeyboardAvoidingView>

        <Button
          mode="outlined"
          textColor="black"
          buttonColor="#E1F854"
          contentStyle={{ height: 55 }}
          style={{ borderRadius: 5, width: "100%", borderColor: "transparent" }}
          labelStyle={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          ВОЙТИ 
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FCFCFC",
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
  },
  welcome: {
    color: "#191919",
    fontSize: 30,
    fontWeight: "400",
    marginTop: 30,
  },
  paragraph: {
    color: "#3A4750",
    fontSize: 15,
    marginTop: 10,
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 100,
    marginBottom: 100,
  },
});
