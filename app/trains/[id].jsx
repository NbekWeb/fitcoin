import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  Button,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import SlideToStartButton from "../../components/training/SlideToStartButton";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import TrainIdCard from "../../components/training/TrainIdCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useTrain from "../../hooks/useTrain";

export default function Trains() {
  const { id } = useLocalSearchParams();
  const { height, width } = Dimensions.get("window");
  const { getTrainingById, training } = useTrain();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(null);

  function goLesson() {
    AsyncStorage.removeItem("lessonTime");

    if (!selectedIndex) {
      router.push(`/trains/lesson/${training?.lesson?.[0]?.id}`);
    } else {
      router.push(`/trains/lesson/${selectedIndex}`);
    }
  }

  useEffect(() => {
    getTrainingById(id);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={{ uri: training?.image }}
        style={{
          width: width,
          height: 330,
          resizeMode: "cover",
        }}
      />
      <Pressable
        style={{
          height: 32,
          width: 80,
          backgroundColor: "#fff",
          position: "absolute",
          left: 20,
          top: 0,
          borderRadius: 18,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 4,
          marginTop: Constants.statusBarHeight + 5,
        }}
        onPress={() => router.push("/dashboard/training")}
      >
        <Icon name="chevron-left" size={22} color="#1A1A1A" />
        <Text
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#1A1A1A",
          }}
        >
          Назад
        </Text>
      </Pressable>

      <View
        style={{
          backgroundColor: "#fff",
          marginTop: -15,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 20,
          flex: 1,
          paddingBottom: 20,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              paddingBottom: 60,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#1A1A1A",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  {training?.name}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 6,
                    color: "#1A1A1A66",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Выберите челлендж
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 26,
                    width: 60,
                    backgroundColor: "#C9F24D",
                    borderRadius: 8,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#1A1A1A",
                      fontWeight: 700,
                      color: "#1A1A1A",
                    }}
                  >
                    {training?.coin}
                  </Text>
                  <Image
                    source={require("../../assets/img/coin.png")}
                    style={{
                      width: 18,
                      height: 18,
                      resizeMode: "cover",
                      marginLeft: 2,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              {training?.lesson?.length > 0 &&
                training?.lesson.map((item, index) => (
                  <TrainIdCard
                    key={index}
                    data={item}
                    selected={selectedIndex === item.id}
                    onPress={() => setSelectedIndex(item.id)}
                  />
                ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 25,
            left: 20,
          }}
        >
          <SlideToStartButton title="Старт!" onSlideComplete={goLesson} />
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
