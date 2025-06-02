import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function WeightInput() {
  const [weight, setWeight] = useState("50");

  const handleChange = (text) => {
    let numericText = text.replace(/[^0-9]/g, "");

    if (numericText === "") {
      setWeight("");
      return;
    }

    let num = parseInt(numericText);

    if (num < 0) {
      num = 20;
    } else if (num > 200) {
      num = 200;
    }

    setWeight(num.toString());
  };

  return (
    <View>
      <Text
        style={{
          marginTop: 5,
          fontSize: 30,
          color: "#191919",
          marginBottom: 80,
        }}
      >
      Твой вес
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
          КГ
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent:'center',
          borderWidth: 1,
          height: 55,
          width: "100%",
          borderColor: "#70707040",
          borderRadius: 5,
          marginBottom:100
        }}
      >
        <TextInput
          style={{
            maxWidth:50,
            fontSize:22,
            fontWeight:500
          }}
          value={weight}
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
            КГ
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
