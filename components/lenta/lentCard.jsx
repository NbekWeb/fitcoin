import { View, Text, Image, Pressable, Dimensions } from "react-native";
import React, { use, useState } from "react";
import useLenta from "../../hooks/useLenta";
import Toast from "react-native-toast-message";
import FAIcon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

export default function LentCard({ item = {} }) {
  const { postSubscribe, postLike } = useLenta();
  const [isLiked, setIsLiked] = useState(item?.is_liked);
  const [likesCount, setLikesCount] = useState(item?.likes_count || 0);

  const handleLike = () => {
    postLike(item.id, () => {
      const newValue = !isLiked;
      setIsLiked(newValue);
      setLikesCount((prev) => (newValue ? prev + 1 : prev - 1));

      Toast.show({
        type: newValue ? "success" : "info",
        text1: newValue ? "Понравилось!" : "Лайк удалён",
      });
    });
  };

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
  const [isSubscribed, setIsSubscribed] = useState(item?.user?.is_subscribed);
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
          paddingHorizontal: 12,
        }}
      >
        <Image
          source={
            item?.user?.avatar
              ? {
                  uri: item.user.avatar.startsWith("http")
                    ? item.user.avatar
                    : `https://api2.study-sales.ru/media/${item.user.avatar}`,
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
            {item?.user?.full_name}
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
      <View>
        <Text
          style={{
            marginVertical: 10,
            paddingHorizontal: 12,
            paddingTop: 5,
            fontSize: 20,
            fontStyle: "italic",
            textTransform: "uppercase",
            color: "#1A1A1A",
          }}
        >
          {item?.training?.name}
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
            {item?.training?.distance} км
          </Text>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "#1A1A1A",
            }}
          >
            {formatDuration(item?.duration)}
          </Text>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "#1A1A1A",
            }}
          >
            {item?.kkla} ккал
          </Text>
        </View>
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
          {item?.training?.training?.name}
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
            +{item?.training?.coin}
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
      <View
        style={{
          marginTop: 20,
          height: 300,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: item?.training?.image }}
          style={{ width: width, height: 300 }}
          resizeMode="cover"
        />
        <View
          style={{
            position: "absolute",
            right: 12,
            bottom: 12,
            backgroundColor: "#FFFFFF",
            height: 34,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 12,
            paddingHorizontal: 8,
          }}
        >
          {likesCount > 0 && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1A1A1A",
                marginRight: 6,
              }}
            >
              {likesCount}
            </Text>
          )}
          <Pressable onPress={handleLike}>
            <FAIcon
              name={isLiked ? "heart" : "heart-o"}
              size={18}
              color={isLiked ? "#FF004D" : "#1A1A1A"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
