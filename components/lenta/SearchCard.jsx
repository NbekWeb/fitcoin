import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import useLenta from "../../hooks/useLenta";
import Toast from "react-native-toast-message";


export default function SearchCard({ item = {} }) {
  const { postSubscribe } = useLenta();
  const [isSubscribed, setIsSubscribed] = useState(item?.is_subscribed);
  const handleSubscribe = () => {
    postSubscribe(item.id, () => {
      const newValue = !isSubscribed;
      setIsSubscribed(newValue);

      Toast.show({
        type: newValue ? "success" : "info",
        text1: newValue ? "Подписка оформлена" : "Вы отписались",
      });
    });
  };

  return (
    <View
      style={{
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={
            item?.avatar
              ? {
                  uri: item.avatar.startsWith("http")
                    ? item.avatar
                    : `https://api2.study-sales.ru/media/${item.avatar}`,
                }
              : require("../../assets/img/avatar.png")
          }
          style={{
            width: 46,
            height: 46,
            resizeMode: "cover",
            borderRadius: 23,
            marginRight: 12,
          }}
        />
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              color: "#1A1A1A",
              fontWeight: 700,
              color: "#1A1A1A",
              marginBottom: 2,
              maxWidth: 160,
              textTransform: "capitalize",
            }}
          >
            {item?.full_name}
          </Text>
        </View>
        <Pressable
          style={{
            marginLeft: "auto",
            height: 38,
            width: 130,
            paddingLeft: 14,
            paddingRight: 14,
            backgroundColor: isSubscribed ? "#FF004D" : "#C9F24D",
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={handleSubscribe}
        >
          <Text
            style={{
              color: isSubscribed ? "#FFFFFF" : "#1A1A1A",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {isSubscribed ? "Отписаться" : "Подписаться"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
