import React, { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TextInput, Button } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import useAuth from "../../hooks/auth";

export default function SendingCode() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const { id, email } = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const passwordRef = useRef(null);
  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { loading, postResend, postVerify, postConfirm, postLogin } = useAuth();
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsButtonDisabled(false);
    }
  }, [timer]);

  function clearInput() {
    postResend(email, () => {
      setCode(["", "", "", ""]);
      inputsRef[0].current.focus();
      setTimer(60);
      setIsButtonDisabled(true);
    });
  }

  const handleChange = (text, index) => {
    if (text.length > 1) {
      text = text.charAt(0);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== "") {
      if (index < inputsRef.length - 1) {
        inputsRef[index + 1].current.focus();
      } else {
        if (newCode.every((digit) => digit !== "")) {
          const fullCode = newCode.join("");
          if (id === "step") {
            postVerify({ email, code: fullCode }, () => {
              router.push("/auth/step");
            });
          } else {
            passwordRef.current.focus();
          }
        }
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputsRef[index - 1].current.focus();
      }
    }
  };

  function handleSubmit() {
    if (code.every((digit) => digit !== "")) {
      const fullCode = code.join("");
      if (id == "step") {
        postVerify({ email, code: fullCode }, () => {
          router.push("/auth/step");
        });
      } else {
        if (!password.trim()) {
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
          postConfirm(
            {
              email,
              reset_code: fullCode,
              new_password: password,
            },
            () => {
              console.log(email, "salo");
              postLogin(email, password, () => {
                router.push("/dashboard/training");
              });
            }
          );
        }
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, введите полный код",
        visibilityTime: 2000,
      });
    }
  }
  function goBack() {
    if (id == "step") {
      router.push("/auth/regis");
    } else {
      router.push("/auth/login");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            width: 30,
          }}
        >
          <Icon name="chevron-left" size={30} color="#000" onPress={goBack} />
        </View>
        <Text style={styles.welcome}>Введите код</Text>
        <Text style={styles.paragraph}>Мы отправили специальный код</Text>
        <View style={styles.send}>
          <Text style={styles.sendText}>подтверждения на </Text>
          <Text
            style={styles.sendEmail}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {email}
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.codeContainer}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {code.map((digit, index) => (
              <View
                key={index}
                style={{
                  width: 50,
                  height: 50,
                  position: "relative",
                  backgroundColor: "transparent",
                  padding: 0,
                  margin: 0,
                }}
              >
                {digit === "" && (
                  <View
                    style={{
                      width: 9,
                      height: 9,
                      backgroundColor: "#3A4750",
                      borderRadius: 5,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      zIndex: 11,
                      transform: [
                        {
                          translateX: "-50%",
                        },
                        { translateY: "-50%" },
                      ],
                    }}
                  ></View>
                )}
                <TextInput
                  ref={inputsRef[index]}
                  mode="outlined"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0}
                  theme={{
                    colors: {
                      primary: "#000",
                    },
                  }}
                  textColor="#000"
                  style={{
                    backgroundColor: "#F5F5F5",
                    borderColor: "#69696940",
                    color: "red",
                    width: 50,
                    height: 50,
                    borderRadius: 5,
                    borderWidth: 1,
                    fontWeight: 700,
                  }}
                />
              </View>
            ))}
          </View>
          {id == "step" && (
            <Pressable
              onPress={() => {
                if (!isButtonDisabled) clearInput();
              }}
            >
              <Text
                style={{
                  marginTop: 24,
                  marginBottom: id == "step" ? 60 : 0,
                  fontSize: 14,
                  color: isButtonDisabled ? "#999" : "#000",
                  textDecorationLine: "underline",
                  alignSelf: "center",
                }}
              >
                {isButtonDisabled
                  ? `Можно повторить через ${timer} сек`
                  : "Не пришло"}
              </Text>
            </Pressable>
          )}
          {id != "step" && (
            <View style={{ marginTop: 10, marginBottom: 80 }}>
              <TextInput
                ref={passwordRef}
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
            </View>
          )}
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
          {!loading && "ВОЙТИ "}
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

  send: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  sendText: {
    fontSize: 15,
    fontWeight: 600,
    color: "#696969",
  },
  sendEmail: {
    fontSize: 15,
    fontWeight: 600,
    color: "#B0C929",
  },
  codeContainer: {
    flexDirection: "column",
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
  },
});
