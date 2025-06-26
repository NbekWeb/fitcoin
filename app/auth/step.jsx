import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Step1 from "../../components/step/Step1";
import Step2 from "../../components/step/Step2";
import Step3 from "../../components/step/Step3";
import Step4 from "../../components/step/Step4";
import Step5 from "../../components/step/Step5";
import Icon from "react-native-vector-icons/Feather";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/auth";
import useUser from "../../hooks/user";
export default function Card() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { loading, getTrain, getPurpose, trains, purposes } = useAuth();
  const { user, getUser, updateUser } = useUser();

  const [train, setTrain] = useState("");
  const [years, setYears] = useState("27");
  const [weight, setWeight] = useState("50");
  const [height, setHeight] = useState("170");
  const [purpose, setPurpose] = useState("");

  function changeStep(i) {
    if (i == 1 && step == 5) {
      updateUser(
        {
          ...user,
          years,
          training: train,
          weight,
          purpose,
          height,
        },
        () => {
          router.push("/dashboard/training");
        }
      );
    } else {
      setStep((prevStep) => {
        console.log(prevStep);

        if (i < 0 && prevStep == 1) {
          return prevStep;
        } else {
          return prevStep + i;
        }
      });
    }
  }

  useEffect(() => {
    getTrain((data) => {
      setTrain(data?.[0]?.id);
    });
    getPurpose((data) => {
      setPurpose(data?.[0]?.id);
    });
    getUser();
  }, []);

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
      {loading && <ActivityIndicator size="large" color="blue" />}

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
          <View
            style={{
              width: 30,
            }}
          >
            <Icon
              name="chevron-left"
              size={30}
              color="#000"
              style={{ opacity: step == 1 ? "0.5" : 1 }}
              onPress={() => changeStep(-1)}
            />
          </View>
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

      {step === 1 && !!trains && (
        <Step1 data={trains} train={train} setTrain={setTrain} />
      )}
      {step === 2 && <Step2 years={years} setYears={setYears} />}
      {step === 3 && <Step3 setWeight={setWeight} weight={weight} />}
      {step === 4 && <Step4 setHeight={setHeight} height={height} />}
      {step === 5 && !!purposes && (
        <Step5 data={purposes} setPurpose={setPurpose} purpose={purpose} />
      )}
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
