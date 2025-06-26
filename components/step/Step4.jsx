import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function WeightInput({ height, setHeight }) {
  const handleChange = (text) => {
    let numericText = text.replace(/[^0-9]/g, "");

    if (numericText === "") {
      setHeight("");
      return;
    }

    let num = parseInt(numericText);

    if (num < 0) {
      num = 150;
    } else if (num > 200) {
      num = 300;
    }

    setHeight(num.toString());
  };

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
        Твой рост
      </Text>
      <View
        style={{
          width: 120,
          height: 45,
          borderRadius: 10,
          backgroundColor: "#69696940",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 500,
            height: 30,
            width: 50,
            borderRadius: 5,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          CM
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          height: 55,
          width: "100%",
          borderColor: "#70707040",
          borderRadius: 5,
          marginBottom: 100,
        }}
      >
        <TextInput
          style={{
            maxWidth: 50,
            fontSize: 22,
            fontWeight: 500,
          }}
          value={height}
          onChangeText={handleChange}
          keyboardType="numeric"
          maxLength={3}
        />
        <View
          style={{
            marginLeft: 6,
            borderLeftWidth: 1,
            borderColor: "#696969",
          }}
        >
          <Text
            style={{
              marginLeft: 6,
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            CM
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    marginTop: 8,
    color: "#666",
  },
});
