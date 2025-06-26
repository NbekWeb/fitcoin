import {
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import TrainCard from "../../components/trainCard";
import useNotification from "../../hooks/useNotification";
import useTrain from "../../hooks/useTrain";

export default function Train() {
  const { getAllNotifications, notifications } = useNotification();

  const router = useRouter();
  const { trainings, getAllTrainings, loading } = useTrain();
  const { width, height } = Dimensions.get("window");
  const today = new Date();
  const dayName = today.toLocaleDateString("ru-RU", {
    weekday: "long",
  });
  const formattedDate = today.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
  });

  useEffect(() => {
    getAllNotifications(() => {});

    const interval = setInterval(() => {
      getAllNotifications(() => {});
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    getAllTrainings();
  }, []);

  return (
    <View
      style={{
        marginLeft: 12,
        marginRight: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontStyle: "italic",
              fontSize: 14,
              color: "#1A1A1A80",
              textTransform: "capitalize",
            }}
          >
            {dayName}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontStyle: "italic",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            {formattedDate}
          </Text>
        </View>
        <Pressable
          style={{
            width: 40,
            height: 40,
            position: "relative",
          }}
          onPress={() => router.replace("/notification")}
        >
          {notifications.count != 0 && (
            <LinearGradient
              colors={["#E7FA55", "#C9F24D"]}
              start={{ x: 0.75, y: 0.25 }}
              end={{ x: 0.25, y: 0.75 }}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 10,
                borderWidth: 3,
                borderRadius: 9,
                borderColor: "#FCFCFC",
                width: 18,
                height: 18,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 10,
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#1A1A1A",
                }}
              >
                {notifications?.count}
              </Text>
            </LinearGradient>
          )}
          <LinearGradient
            colors={["#E7FA55", "#C9F24D"]}
            start={{ x: 0.75, y: 0.25 }}
            end={{ x: 0.25, y: 0.75 }}
            style={{
              width: 36,
              marginTop: 4,
              marginRight: 4,
              height: 36,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="notifications" size={20} color="#1A1A1A" />
          </LinearGradient>
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {loading && (
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}

        {trainings.map((item, j) => (
          <View
            key={j}
            style={{
              flexDirection: "row",
              width: j % 4 == 3 || j % 4 == 0 ? width - 186 : 150,
              marginTop: 12,
            }}
          >
            <TrainCard data={item} type={j} key={j} />
          </View>
        ))}
      </View>
    </View>
  );
}
