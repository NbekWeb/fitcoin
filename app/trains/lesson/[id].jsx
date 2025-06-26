import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import InfoCard from "../../../components/training/InfoCard";
import Lock from "../../../components/training/Lock";
import MaxMin from "../../../components/training/MaxMin";
import Play from "../../../components/training/Play";
import CoinCard from "../../../components/training/CoinCard";
import SlideToStartButton from "../../../components/training/SlideToStartButton";
import StartAnimation from "../../../components/training/StartAnimation";
import LessonCard from "../../../components/training/LessonCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTrain from "../../../hooks/useTrain";
import Toast from "react-native-toast-message";
import useUser from "../../../hooks/user";

export default function TrainLesson() {
  const { id } = useLocalSearchParams();

  const { height, width } = Dimensions.get("window");
  const router = useRouter();
  const [type, setType] = useState("main");
  const [starting, setStarting] = useState("pause");
  const [locking, setLocking] = useState("unlock");
  const [maxmin, setMaxmin] = useState("min");
  const [animated, setAnimated] = useState(false);
  const [time, setTime] = useState(0);
  const [finish, setFinish] = useState(false);
  const insets = useSafeAreaInsets();
  const { lesson, getLessonById, completeLesson } = useTrain();
  const { user, getUser } = useUser();
  const [kkal, setKkal] = useState("0.00");

  function calculateCalories(met, weight, seconds) {
    if (!time || !met || !weight) return "0";
    const hours = seconds / 3600;
    const calories = met * weight * hours;
    return calories.toFixed(2);
  }
  function changeType() {
    if (type == "main") {
      setType("max");
      setMaxmin("max");
    } else {
      setType("main");
      setMaxmin("min");
    }
  }
  function finishLesson() {
    completeLesson(
      { training: lesson?.id, is_completed: true, duration: time, kkla: kkal },
      () => {
        Toast.show({
          type: "success",
          text1: "Поздравляем!",
          text2: "Вы успешно завершили урок 👋",
        });
        router.push(`/dashboard/training`);
      }
    );

    AsyncStorage.removeItem("lessonTime");
    setTime(0);
    setFinish(true);
    setStarting("pause");
    router.push(`/dashboard/training`);
  }

  async function changePlay() {
    if (starting == "pause") {
      setStarting("play");
      setAnimated(true);
      const storedTime = await AsyncStorage.getItem("lessonTime");
      setTime(storedTime && storedTime > 0 ? parseInt(storedTime) : 1);
    } else {
      setStarting("pause");
    }
  }
  async function changeLock() {
    if (locking == "unlock") {
      setType("max");
      setMaxmin("max");
      setLocking("lock");

      if (starting == "pause") {
        setStarting("play");
        setAnimated(true);
        const storedTime = await AsyncStorage.getItem("lessonTime");
        setTime(storedTime ? parseInt(storedTime) : 0);
      }
    } else {
      setLocking("unlock");
    }
  }

  useEffect(() => {
    let interval = null;

    if (starting === "play") {
      interval = setInterval(async () => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          AsyncStorage.setItem("lessonTime", newTime.toString());
          return newTime;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [starting]);

  useEffect(() => {
    getLessonById(id);
    const storedTime = AsyncStorage.getItem("lessonTime");
    setTime(storedTime ? parseInt(storedTime) : 0);
    getUser();
  }, []);
  useEffect(() => {
    if (lesson?.met && user?.weight) {
      const calculated = calculateCalories(
        lesson.met,
        parseFloat(user.weight),
        time
      );
      setKkal(calculated);
    }
  }, [time, lesson?.met, user?.weight]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F4F4F4",
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      {type !== "main" &&
        (starting == "pause" ? (
          <Image
            source={{ uri: lesson?.image }}
            style={{
              width: width,
              height: height,
              resizeMode: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ) : (
          <Video
            source={{ uri: lesson?.video }}
            shouldPlay
            isLooping
            resizeMode="cover"
            style={{
              width: width,
              height: height,
              resizeMode: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ))}
      {type == "main" && (
        <Text
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontSize: 24,
            marginBottom: 16,
            marginTop: 2,
            textTransform: "capitalize",
          }}
        >
          {lesson?.training?.name}
        </Text>
      )}
      <LessonCard
        start={starting == "play"}
        stop={starting == "pause"}
        finish={finish}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
          marginBottom: 16,
        }}
      >
        <InfoCard num={lesson?.distance} title="Дистанция, км" />
        <InfoCard num={kkal} title="Ккал" />
        <InfoCard num={(kkal / 60).toFixed(2)} title="Ср. темп мин/км" />
      </View>
      {type == "main" && (
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              height: 360,
              position: "relative",
            }}
          >
            {starting == "pause" ? (
              <Image
                source={{ uri: lesson?.image }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 16,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            ) : (
              <Video
                source={{ uri: lesson?.video }}
                shouldPlay
                isLooping
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 16,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            )}

            <View
              style={{
                position: "relative",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <CoinCard coin={lesson?.coin} />
              <View
                style={{
                  marginBottom: 10,
                  marginRight: 4,
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                }}
              >
                <Play type={starting} onPress={changePlay} />
                <View
                  style={{
                    flexDirection: "column",
                    position: "absolute",
                    right: 4,
                    bottom: 10,
                  }}
                >
                  <Lock type={locking} onPress={changeLock} />
                  <MaxMin type={maxmin} onPress={changeType} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            {(!time || time == 0) && (
              <Pressable
                onPress={changePlay}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: "#C9F24D",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#1A1A1A",
                    fontSize: 26,
                    fontWeight: 600,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 44,
                    paddingRight: 44,
                  }}
                >
                  Начать
                </Text>
              </Pressable>
            )}
            {!(!time || time == 0) && (
              <SlideToStartButton
                title="Завершить тренировку"
                onSlideComplete={finishLesson}
              />
            )}
          </View>
        </View>
      )}
      {type !== "main" && locking == "lock" && (
        <View
          style={{
            marginTop: "auto",
            marginBottom: 80,
            zIndex: 1,
          }}
        >
          <SlideToStartButton title="Завершить тренировку" />
        </View>
      )}

      {type !== "main" && (
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom,
            left: 0,
            padding: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            width: width,
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              zIndex: 1,
            }}
          >
            <Lock type={locking} onPress={changeLock} />
          </View>
          {locking !== "lock" && (
            <Play type={starting} onPress={changePlay} size="max" />
          )}
          <MaxMin type={maxmin} onPress={changeType} />
        </View>
      )}
      {locking == "lock" && (
        <View
          style={{
            position: "absolute",
            width: width,
            height: height,
            left: 0,
            top: 0,
            backgroundColor: "#00000080",
          }}
        ></View>
      )}
      <StatusBar style="dark" hidden={type === "max" || animated} />
      {animated && (
        <StartAnimation
          onFinish={() => setAnimated(false)}
          animated={animated}
        />
      )}
    </View>
  );
}
