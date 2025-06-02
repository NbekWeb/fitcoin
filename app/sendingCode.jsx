import React, { useState, useRef } from "react";
import Toast from "react-native-toast-message";

import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { TextInput, Button } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function SendingCode() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const { id, email } = useLocalSearchParams();

  const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
          if (id === "step") {
            router.push("/step");
          } else {
            router.push("/giveNewPassword");
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

  function clearInput() {
    setCode(["", "", "", ""]);
    inputsRef[0].current.focus();
  }

  function handleSubmit() {
    if (code.every((digit) => digit !== "")) {
      const fullCode = code.join("");
      router.push("/giveNewPassword");
    } else {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, введите полный код",
        visibilityTime: 2000,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Icon
        name="chevron-left"
        size={30}
        color="#000"
        onPress={() => router.push("/login")}
      />
      <Text style={styles.welcome}>Введите код</Text>
      <Text style={styles.paragraph}>Мы отправили специальный код</Text>
      <View style={styles.send}>
        <Text style={styles.sendText}>подтверждения на </Text>
        <Text style={styles.sendEmail}>{email} </Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.codeContainer}
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
              keyboardType="number-pad"
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
      </KeyboardAvoidingView>
      <Text
        style={{
          marginTop: 24,
          marginBottom: 60,
          fontSize: 14,
          color: "#000",
          textDecorationLine: "underline",
          alignSelf: "center",
        }}
        onPress={clearInput}
      >
        Не пришло
      </Text>
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
        ВОЙТИ
      </Button>
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

  send: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
  },
});
