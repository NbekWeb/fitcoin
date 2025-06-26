import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const ShopCard = ({ data }) => {
  const formatPrice = (value) => {
    if (!value) return "";
    const number = parseInt(String(value).replace(/[^\d]/g, ""), 10);
    return number.toLocaleString("en-US");
  };

  const router = useRouter();
  const goTo = () => router.push(`/shopItem/${data.id}`);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View
      style={{
        width: width / 2 - 20,
        borderRadius: 10,
        marginTop: 10,
        position: "relative",
      }}
    >
      {data?.images?.length > 0 && (
        <View
          style={{
            height: 150,
            position: "relative",
          }}
        >
          <Carousel
            width={width / 2 - 20}
            height={150}
            data={data.images}
            loop
            autoPlay={false}
            scrollAnimationDuration={150}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.slide} key={item.id}>
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.image} />
                )}
              </View>
            )}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
              width: width / 2 - 20,
              left: 0,
              bottom: 10,
              position: "absolute",
            }}
          >
            {data.images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === activeIndex && styles.activeDot]}
              />
            ))}
          </View>
        </View>
      )}

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontSize: 14,
          fontWeight: "600",
          marginTop: 10,
          paddingLeft: 6,
          paddingRight: 6,
          color: "#1A1A1A",
        }}
      >
        {data.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 6,
          marginRight: 6,
          marginTop: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/img/coin.png")}
            style={{
              width: 14,
              height: 14,
              objectFit: "contain",
              marginRight: 4,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#1A1A1A66",
            }}
          >
            {formatPrice(data.price)}
          </Text>
        </View>

        <Pressable
          onPress={goTo}
          style={{
            height: 36,
            backgroundColor: "#C9F24D",
            borderRadius: 6,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          <Text
            style={{
              color: "#1A1A1A",
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            Купить
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 150,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
  },
  dot: {
    backgroundColor: "rgba(201, 242, 77, .4)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  activeDot: {
    backgroundColor: "#C9F24D",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default ShopCard;
