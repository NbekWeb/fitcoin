import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function FirstStepCard({
  image,
  title,
  right = false,
  selected = false,
  onPress = () => {},
}) {
  return (
    <View
      style={{
        width: "48%",
        marginBottom: 15,
        alignItems: right ? "flex-end" : "start",
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "column", alignItems: "center", width: 110 }}
      >
        <Image
          source={image}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            resizeMode: "cover",
            borderWidth: selected ? 8 : 0,
            borderColor: selected ? "#00AAFF" : "transparent",
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            color: "#000",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
