import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function UserTrain({ train = {} }) {
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0 с.";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    let result = "";
    if (h > 0) result += `${h} ч. `;
    if (m > 0) result += `${m} м. `;
    if (s > 0 || (!h && !m)) result += `${s} с.`;

    return result.trim();
  };

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: "#E2E2E2",
        marginTop: 16,
        paddingTop: 16,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "#1A1A1A",
          textTransform: "uppercase",
          fontStyle: "italic",
          marginBottom: 9,
          paddingHorizontal: 14,
        }}
      >
        {train?.training?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          paddingHorizontal: 14,
        }}
      >
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#1A1A1A",
          }}
        >
          {train?.training?.distance} км
        </Text>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#1A1A1A",
          }}
        >
          {formatDuration(train?.duration)}
        </Text>
        <Text
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#1A1A1A",
          }}
        >
          {train?.kkla} ккал
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 12,
          paddingHorizontal: 14,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#1A1A1A",
          }}
        >
          {train?.training?.training?.name}
        </Text>
        <View
          style={{
            padding: 4,
            backgroundColor: "#C9F24D",
            borderRadius: 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1A1A1A",
              marginRight: 4,
            }}
          >
            +{train?.training?.coin}
          </Text>
          <View>
            <Image
              source={require("../../assets/img/coin.png")}
              style={{
                width: 16,
                height: 16,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </View>
      <Image
        source={{
          uri: train?.training?.image,
        }}
        style={{
          width: width,
          height: 176,
          resizeMode: "cover",
          borderRadius: 8,
          marginTop: 12,
        }}
      />
    </View>
  );
}
