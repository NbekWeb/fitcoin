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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TextInput, Button } from "react-native-paper";
import { useRouter, Link } from "expo-router";
import useAuth from "../../hooks/auth";
export default function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { loading, postReset } = useAuth();
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSubmit = () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Введите email адрес",
        visibilityTime: 2000,
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Некорректный email адрес",
        visibilityTime: 2000,
      });
      return;
    } else {
      postReset({ email }, () => {
        router.push(`/auth/sendingCode?id=forgot&email=${email}`);
      });
    }
  };

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
            label="Email адрес"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
            }}
            theme={{
              colors: {
                primary: "#303841",
              },
            }}
            textColor="#303841"
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
          onPress={handleSubmit}
        >
          {loading && <ActivityIndicator size="large" color="blue" />}
          {!loading && "Сбросить пароль"}
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
