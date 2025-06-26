import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, Provider } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function UserData({ user }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  function logOut() {
    closeMenu();
    AsyncStorage.removeItem("access_token");
    router.push("/welcome");
  }

  function goToEdit() {
    closeMenu();
    router.push("/edit");
  }
  return (
    <View>
      <LinearGradient
        colors={["#E7FA55", "#C9F24D"]}
        start={{ x: 0.866, y: -0.5 }}
        end={{ x: 0, y: 1 }}
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: width,
          height: 125,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></LinearGradient>
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          paddingLeft: 16,
          paddingRight: 16,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#fff",
          }}
        >
          <Image
            source={
              user?.avatar
                ? {
                    uri: user.avatar.startsWith("http")
                      ? user.avatar
                      : `https://api2.study-sales.ru/media/${user.avatar}`,
                  }
                : require("../../assets/img/avatar.png")
            }
            style={{
              width: 100,
              height: 100,
              resizeMode: "cover",
              borderRadius: 50,
              borderWidth: 3,
              borderColor: "#fff",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            height: 56,
            alignItems: "center",
            marginTop: 6,
            marginLeft: 16,
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                fontSize: 20,
                fontStyle: "italic",
              }}
            >
              {user?.full_name}
            </Text>

            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 14,
                fontWeight: 300,
                fontStyle: "italic",
                marginTop: 4,
              }}
            >
              {user.years && `${user.years} года,`}
              {user.weight && `${user.weight} кг,`}
              {user.weight && `${user.height} см`}
            </Text>
          </View>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Icon name="more-vertical" size={25} color="#000" />
              </TouchableOpacity>
            }
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              shadowColor: "transparent",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={goToEdit}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

                borderRadius: 4,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                  marginRight: 8,
                  fontWeight: 700,
                }}
              >
                Редактировать
              </Text>
              <Icon name="edit" size={18} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={logOut}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#FF6347",
                  marginRight: 8,
                  fontWeight: 700,
                }}
              >
                Выйти
              </Text>
              <Icon name="log-out" size={18} color="#FF6347" />
            </TouchableOpacity>
          </Menu>
        </View>
      </View>
    </View>
  );
}
