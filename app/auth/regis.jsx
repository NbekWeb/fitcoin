import React, { useState } from "react";
import Toast from "react-native-toast-message";
import useAuth from "../../hooks/auth";

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
import ByLogin from "../../components/ByLogin";

export default function Regis() {
  const [showPassword, setShowPassword] = useState(false);
  const { postRegis, loading } = useAuth();

  const toggleVisibility = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!full_name.trim()) {
      Toast.show({
        type: "error",
        text1: "Пожалуйста, введите полное имя",
        visibilityTime: 2000,
      });
    } else if (!email.trim()) {
      Toast.show({
        type: "error",
        visibilityTime: 2000,
        text1: "Пожалуйста, введите email адрес",
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, введите корректный email адрес",
        visibilityTime: 2000,
      });
    } else if (!password.trim()) {
      Toast.show({
        type: "error",
        text1: "Пожалуйста, введите пароль",
        visibilityTime: 2000,
      });
    } else if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пароль должен быть минимум 8 символов",
        visibilityTime: 2000,
      });
    } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пароль должен включать буквы и цифры",
        visibilityTime: 2000,
      });
    } else {
      try {
        await postRegis({ email, password, full_name }, () => {
          router.push(`/auth/sendingCode?id=step&email=${email}`);
          setEmail("");
          setFull_name("");
          setPassword("");
        });
      } catch (err) {
        setError(err || "Login error");
      }
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
            onPress={() => router.push("/welcome")}
          />
        </View>
        <Text style={styles.welcome}>Регистрация</Text>
        <Text style={styles.paragraph}>
          Пожалуйста введите данные и придумайте пароль.
        </Text>
        <View>
          <KeyboardAvoidingView
            style={styles.form}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              label="Полное имя"
              value={full_name}
              onChangeText={setFull_name}
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
              label="Email адрес"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                backgroundColor: "#F5F5F5",
                marginTop: 16,
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
          <Button
            mode="outlined"
            textColor="black"
            buttonColor="#E1F854"
            contentStyle={{ height: 55 }}
            style={{
              borderRadius: 5,
              width: "100%",
              borderColor: "transparent",
            }}
            labelStyle={{
              fontSize: 17,
              fontWeight: "bold",
            }}
            onPress={handleRegister}
          >
            {loading && <ActivityIndicator size="large" color="blue" />}

            {!loading && "ВОЙТИ"}
          </Button>
          <ByLogin />
          <View style={styles.goRegis}>
            <Text style={{ fontSize: 16 }}>Ещё нет аккаунта?</Text>

            <Link href="/auth/login" asChild>
              <Pressable>
                <Text style={{ marginLeft: 10, fontWeight: 700, fontSize: 16 }}>
                  Войти!
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
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
    fontWeight: 400,
    marginTop: 30,
  },
  paragraph: {
    color: "#3A4750",
    fontSize: 15,
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    marginBottom: 20,
  },
  goRegis: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
