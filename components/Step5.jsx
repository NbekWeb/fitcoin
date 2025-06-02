import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function Card() {
  const [selected, setSelected] = useState(-1);
  function changeSelected(i) {
    setSelected(i);
  }
  const items = [
    { image: require("../assets/img/weight-icon.png"), title: "Сбросить вес" },
    { image: require("../assets/img/mus-icon.png"), title: "Мускулатура" },
    { image: require("../assets/img/gan-icon.png"), title: "Фитнесс скилы" },
    {
      image: require("../assets/img/weight-icon.png"),
      title: "Получить Fitcoin",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 5,
          fontSize: 30,
          color: "#191919",
          marginBottom: 80,
        }}
      >
        Твоя цель
      </Text>
      <View>
        {items.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => changeSelected(i)}
            style={{
              borderWidth: 1,
              borderColor: selected == i ? "transparent" : "#69696940",
              backgroundColor: selected == i ? "#E1F854" : "transparent",
              height: 54,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 25,
              borderRadius: 4,
            }}
          >
            <Image source={item.image} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: selected == i ? 600 : 500,
                color: "#000",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
