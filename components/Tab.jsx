import { View, Text } from "react-native";
import React from "react";
import Thunder from "./icons/thunder";
import Lenta from "./icons/lenta";
import Cash from "./icons/cash";
import User from "./icons/user";

export default function Tab() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 56,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      {[
        { icon: <Thunder size={24} color="#1A1A1A" />, title: "Thunder" },
        { icon: <Lenta size={24} color="#1A1A1A66" />, title: "Lenta" },
        { icon: <Cash size={24} color="#1A1A1A66" />, title: "Cash" },
        { icon: <User size={24} color="#1A1A1A66" />, title: "User" },
      ].map((item, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.icon}
          <Text
            style={{
              color: index == 0 ? "#1A1A1A" : "#1A1A1A66",
              fontSize: 12,
              marginTop: 2,
            }}
          >
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
}
