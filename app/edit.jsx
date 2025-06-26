import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import PhotoSelector from "../components/user/PhotoSelector";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useUser from "../hooks/user";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const Edit = () => {
  const { user, loading, getUser, setUser, updateUser } = useUser();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const validateAndSave = () => {
    const { full_name, weight, height, years } = user || {};
    if (!full_name || !weight || !height || !years) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Пожалуйста, заполните все поля.",
      });
      return;
    }

    updateUser({ ...user }, () => {
      Toast.show({
        type: "success",
        text1: "Успешно",
        text2: "Данные профиля обновлены.",
      });
      router.push("/user");
    });
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <StatusBar style="dark" />
      {loading && (
        <View style={{ marginTop: Constants.statusBarHeight + 10 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {!loading && (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <LinearGradient
              colors={["#E7FA55", "#C9F24D"]}
              start={{ x: 0.866, y: -0.5 }}
              end={{ x: 0, y: 1 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: width,
                height: 125,
                paddingTop: Constants.statusBarHeight,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              <Pressable onPress={() => router.push("/user")}>
                <Icon name="chevron-left" size={28} color="#212121" />
              </Pressable>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontStyle: "italic",
                    fontWeight: "600",
                  }}
                >
                  Профиль
                </Text>
              </View>
            </LinearGradient>

            <View style={{ padding: 12 }}>
              <PhotoSelector
                user={user}
                changeAvatar={(avatar) => {
                  setUser((prev) => ({ ...prev, avatar }));
                }}
              />

              <Text
                style={{ marginTop: 20, fontWeight: "600", marginBottom: 10 }}
              >
                Полное имя
              </Text>
              <TextInput
                value={user?.full_name || ""}
                onChangeText={(text) => handleChange("full_name", text)}
                placeholder="Введите полное имя"
                style={{
                  backgroundColor: "#F5F5F5",
                  height: 30,
                }}
                theme={{
                  colors: {
                    primary: "#303841",
                  },
                }}
                textColor="#303841"
              />

              <Text
                style={{ fontWeight: "600", marginTop: 20, marginBottom: 10 }}
              >
                Вес (кг)
              </Text>
              <TextInput
                value={user?.weight?.toString() || ""}
                onChangeText={(text) =>
                  handleChange("weight", text.replace(/[^0-9]/g, ""))
                }
                placeholder="Введите вес"
                keyboardType="numeric"
                style={{
                  backgroundColor: "#F5F5F5",
                  height: 30,
                }}
                theme={{
                  colors: {
                    primary: "#303841",
                  },
                }}
                textColor="#303841"
              />

              <Text
                style={{ fontWeight: "600", marginTop: 20, marginBottom: 10 }}
              >
                Рост (см)
              </Text>
              <TextInput
                value={user?.height?.toString() || ""}
                onChangeText={(text) =>
                  handleChange("height", text.replace(/[^0-9]/g, ""))
                }
                placeholder="Введите рост"
                keyboardType="numeric"
                style={{
                  backgroundColor: "#F5F5F5",
                  height: 30,
                }}
                theme={{
                  colors: {
                    primary: "#303841",
                  },
                }}
                textColor="#303841"
              />

              <Text
                style={{ fontWeight: "600", marginTop: 20, marginBottom: 10 }}
              >
                Возраст
              </Text>
              <TextInput
                value={user?.years?.toString() || ""}
                onChangeText={(text) =>
                  handleChange("years", text.replace(/[^0-9]/g, ""))
                }
                placeholder="Введите возраст"
                keyboardType="numeric"
                style={{
                  backgroundColor: "#F5F5F5",
                  height: 30,
                }}
                theme={{
                  colors: {
                    primary: "#303841",
                  },
                }}
                textColor="#303841"
              />

              <View
                style={{
                  marginTop: 30,
                }}
              >
                <Pressable
                  onPress={validateAndSave}
                  style={{
                    backgroundColor: "#C9F24D",
                    paddingVertical: 12,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    Сохранить
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      <Toast />
    </View>
  );
};

export default Edit;
