import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useEffect, useRef } from "react";

export default function TrainIdCard({ data = {}, selected = false, onPress }) {
  const borderWidthAnim = useRef(new Animated.Value(selected ? 2 : 0)).current;
  const borderColorAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(borderWidthAnim, {
        toValue: selected ? 2 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(borderColorAnim, {
        toValue: selected ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [selected]);

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E7FA55", "#E7FA55"],
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={{
          width: "49%",
          height: 157,
          borderColor: borderColor,
          borderWidth: borderWidthAnim,
          marginTop: 10,
          borderRadius: 16,
          padding: selected ? 6 : 0,
        }}
      >
        <ImageBackground
          source={{ uri: data?.image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
          imageStyle={{ borderRadius: 10 }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 24,
                    width: 60,
                    borderRadius: 12,
                    backgroundColor: "#fff",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      lineHeight: 13,
                      marginTop: 1,
                      textAlign: "center",
                      color: "#1A1A1A",
                      fontWeight: 700,
                    }}
                  >
                    {data?.coin}
                  </Text>
                  <Image
                    source={require("../../assets/img/coin.png")}
                    style={{
                      width: 18,
                      height: 18,
                      resizeMode: "contain",
                      marginLeft: 3,
                    }}
                  />
                </View>
                {data?.is_completed && (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "#C9F24D",
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="check" size={15} color="#1A1A1A" />
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                padding: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 16,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {data?.name}{" "}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
