import {
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useEffect, useRef, useState } from "react";

export default function StartAnimation({ animated = false, onFinish }) {
  const { height, width } = Dimensions.get("window");

  const [currentNumber, setCurrentNumber] = useState(3);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

useEffect(() => {
  if (animated) {
    let count = 3;
    const interval = setInterval(() => {
      setCurrentNumber(count);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 150, 
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            friction: 6, 
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 350, 
          useNativeDriver: true,
        }),
      ]).start();

      count--;

      if (count === 0) {
        clearInterval(interval);

        if (onFinish) {
          setTimeout(() => {
            onFinish();
          }, 400); 
        }
      }
    }, 400); 
  }
}, [animated]);


  return (
    <View
      style={{
        backgroundColor: "#000",
        flex: 1,
        height: height,
        width: width,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex:2
      }}
    >
      <Image
        source={require("../../assets/img/topr.png")}
        className=""
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          zIndex: 10,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <Image
        source={require("../../assets/img/botl.png")}
        className=""
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          zIndex: 10,
          position: "absolute",
          bottom: -15,
          left: 0,
        }}
      />
      <Image
        source={require("../../assets/img/bg-img.png")}
        className=""
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
          zIndex: 10,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      {animated && (
        <Animated.Text
          style={{
            fontSize: 190,
            color: "#fff",
            position: "absolute",
            top: height / 2 - 95,
            left: width / 2 - 45,
            fontWeight: "700",
            opacity,
            transform: [{ scale }],
            zIndex: 20,
          }}
        >
          {currentNumber}
        </Animated.Text>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: width / 2 - 14,
        }}
      >
        <Icon name="chevron-down" size={40} color="#DCF853" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: "max-content",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "0",
    transform: [{ translateY: "-50%" }],
    zIndex: 11,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    color: "#D7F651",
    fontSize: 48,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
  },
});
