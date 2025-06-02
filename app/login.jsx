import React, { useState } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TextInput, Button } from "react-native-paper";
import { useRouter, Link } from "expo-router";
import ByLogin from "../components/ByLogin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "" || password.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, заполните все поля.",
        visibilityTime: 2000,
      });
      return;
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, введите корректный email.",
        visibilityTime: 2000,
      });
      return;
    } else {
      AsyncStorage.setItem("access_token", "sa1");
      Toast.show({
        type: "success",
        text1: "Успех",
        text2: `Добро пожаловать!`,
        visibilityTime: 2000,
      });
      router.replace("/training");
    }
  };

  return (
    <View style={styles.container}>
      <Icon
        name="chevron-left"
        size={30}
        color="#000"
        onPress={() => router.push("/welcome")}
      />
      <Text style={styles.welcome}>Добро пожаловать!</Text>
      <Text style={styles.paragraph}>
        Войди в приложение и начни новую жизнь уже сегодня.
      </Text>
      <View>
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            }}
            theme={{
              colors: {
                primary: "#303841",
              },
            }}
            textColor="#303841"
          />
          <TextInput
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            style={{
              backgroundColor: "#F5F5F5",
              marginTop: 16,
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
        <Link href="/forgot" asChild>
          <Pressable>
            <Text style={styles.forgot}>Забыли пароль?</Text>
          </Pressable>
        </Link>
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
          onPress={() => handleLogin()}
        >
          ВОЙТИ
        </Button>
        <ByLogin />
        <View style={styles.goRegis}>
          <Text style={{ fontSize: 16 }}>Ещё нет аккаунта?</Text>

          <Link href="/regis" asChild>
            <Pressable>
              <Text style={{ marginLeft: 10, fontWeight: 700, fontSize: 16 }}>
                Регистрируйся!
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
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
  form: {
    marginTop: 30,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: 15,
    marginBottom: 30,
    fontWeight: 600,
    fontSize: 14,
    color: "#000000",
  },
  goRegis: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
