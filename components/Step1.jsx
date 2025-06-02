import { View, Text } from "react-native";
import React, { useState } from "react";
import FirstStepCard from "./FirstStepCard";

export default function Step1() {
  const [selected, setSelected] = useState(-1);
  function changeSelected(i) {
    setSelected(i);
  }

  const items = [
    { image: require("../assets/img/beg.png"), title: "Бег" },
    { image: require("../assets/img/xod.png"), title: "Ходьба" },
    { image: require("../assets/img/pp.png"), title: " План питания" },
    { image: require("../assets/img/velo.png"), title: "Велоспорт" },
    { image: require("../assets/img/yoga.png"), title: "Йога" },
    { image: require("../assets/img/health.png"), title: "Здоровье" },
  ];
  return (
    <View className="flex-1">
      <Text
        style={{
          marginTop: 5,
          fontSize: 30,
          color: "#191919",
          marginBottom: 50,
        }}
      >
        Что тебе по душе?
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        {items.map((item, index) => (
          <FirstStepCard
            key={index}
            image={item.image}
            title={item.title}
            right={index % 2 !== 0}
            selected={index == selected}
            onPress={() => changeSelected(index)}
          />
        ))}
      </View>
    </View>
  );
}
