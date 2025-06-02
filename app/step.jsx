import { View, Text } from "react-native";
import React, { use, useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Icon from "react-native-vector-icons/Feather";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Card() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  function changeStep(i) {
    setStep((prevStep) => {
      if (i == 1 && prevStep == 4) {
        router.push("/training");
      } else {
        if (i < 0 && prevStep == 1) {
          return prevStep;
        } else {
          return prevStep + i;
        }
      }
    });
  }

  return (
    <View
      style={{
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "column",

        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Icon
            name="chevron-left"
            size={30}
            color="#000"
            style={{ opacity: step == 1 ? "0.5" : 1 }}
            onPress={() => changeStep(-1)}
          />
          <Text
            onPress={() => changeStep(1)}
            style={{
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Пропустить
          </Text>
        </View>
        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            fontWeight: 500,
            color: "#191919",
          }}
        >
          Шаг {step} из 5
        </Text>
      </View>

      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      <Button
        mode="outlined"
        textColor="black"
        buttonColor="#E1F854"
        contentStyle={{ height: 55 }}
        style={{ borderRadius: 5, width: "100%", borderColor: "transparent" }}
        labelStyle={{
          fontSize: 17,
          fontWeight: 400,
        }}
        onPress={() => changeStep(1)}
      >
        {step == 5 ? "Далее" : "Следующий шаг    "}
      </Button>
    </View>
  );
}
