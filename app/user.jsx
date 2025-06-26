import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import UserTrain from "../components/user/UserTrain";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import UserData from "../components/user/userData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Tab from "../components/Tab";
import useUser from "../hooks/user";

const { width, height } = Dimensions.get("window");
const filterOptions = ["День", "Неделя", "Месяц", "Всё время"];
const UserPage = () => {
  const { user, loading, userTrain, getUser, getUserTrain } = useUser();
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState("День");

  function changeFilter(option) {
    const filterMap = {
      День: "daily",
      Неделя: "weekly",
      Месяц: "monthly",
    };

    const filterValue = filterMap[option] || "";

    setSelectedFilter(option);
    getUserTrain(filterValue);
  }

  useEffect(() => {
    getUser();
    getUserTrain("daily");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: height,
        flexDirection: "column",
      }}
    >
      <StatusBar style="dark" />

      <View
        style={{
          flex: 1,
          borderWidth: 2,
          borderColor: "green",
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
              }}
            >
              <UserData user={user} />
              <View
                style={{
                  marginTop: 12,
                  marginBottom: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 16,
                  paddingRight: 16,
                  justifyContent: "space-between",
                }}
              >
                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => changeFilter(option)}
                    style={{
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor:
                        selectedFilter === option ? "#475DB6" : "#D6F551",
                      backgroundColor: "#fff",
                      paddingHorizontal: 16,
                      paddingVertical: 6,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color:
                          selectedFilter === option ? "#475DB6" : "#1A1A1A",
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {loading ? (
              <View style={{ marginTop: Constants.statusBarHeight + 10 }}>
                <ActivityIndicator size="large" color="blue" />
              </View>
            ) : (
              <View>
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: 20,
                      fontStyle: "italic",
                      textTransform: "uppercase",
                    }}
                  >
                    Тренировки
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",

                    marginTop: 16,
                  }}
                >
                  {userTrain.length > 0 &&
                    userTrain.map((train, index) => (
                      <UserTrain key={index} train={train} />
                    ))}
                  {userTrain.length == 0 && (
                    <View style={{ alignItems: "center", marginTop: 32 }}>
                      <Text style={{ fontSize: 16, color: "#888" }}>
                        За выбранный период тренировки не найдены
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <Tab />
    </View>
  );
};

export default UserPage;
