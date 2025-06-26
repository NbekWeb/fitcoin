import { View, Text, Pressable } from "react-native";
import React from "react";
import Thunder from "./icons/thunder";
import Lenta from "./icons/lenta";
import User from "./icons/user";
import Shop from "./icons/shop";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Tab() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const tabs = [
    {
      icon: Thunder,
      title: "Тренировка",
      route: "/dashboard/training",
    },
    {
      icon: Lenta,
      title: "Лента",
      route: "/dashboard/lenta",
    },
    {
      icon: Shop,
      title: "Магазин",
      route: "/dashboard/shop",
    },
    {
      icon: User,
      title: "Профиль",
      route: "/user",
    },
  ];

  const goTo = (route) => {
    if (pathname !== route) {
      router.push(route);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 50+insets.bottom,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingBottom:insets.bottom,
      }}
    >
      {tabs.map((item, index) => {
        const isActive = pathname === item.route;
        const IconComponent = item.icon;
        return (
          <Pressable
            key={index}
            onPress={() => goTo(item.route)}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconComponent size={24} color={isActive ? "#1A1A1A" : "#1A1A1A66"} />
            <Text
              style={{
                color: isActive ? "#1A1A1A" : "#1A1A1A66",
                fontSize: 12,
                marginTop: 2,
                fontWeight:700
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
