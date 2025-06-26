import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolateColor,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import ThreeArrow from "../icons/threeArrow";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width - 40;
const BUTTON_SIZE = 44;
const MAX_TRANSLATE = SLIDE_WIDTH - BUTTON_SIZE;

export default function SlideToStartButton({ onSlideComplete, title = "" }) {
  const translateX = useSharedValue(0);
  const router = useRouter();

  const progressStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, MAX_TRANSLATE * 0.2],
      ["transparent", "#E7FA55"]
    );

    return {
      width: translateX.value + BUTTON_SIZE,
      backgroundColor,
    };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSlideComplete = () => {
    if (onSlideComplete) onSlideComplete();
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = Math.min(Math.max(0, e.translationX), MAX_TRANSLATE);
    })
    .onEnd(() => {
      if (translateX.value > MAX_TRANSLATE * 0.3) {
        translateX.value = withSpring(
          MAX_TRANSLATE,
          { damping: 10, stiffness: 1000, mass: 0.2 },
          () => runOnJS(handleSlideComplete)()
        );
      } else {
        translateX.value = withSpring(0);
      }
    });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, progressStyle]} />
      <Text style={styles.label}> {title}</Text>
      <View style={styles.arrow}>
        <ThreeArrow />
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.button, animatedStyle]}>
          <Icon name="arrow-right" size={24} color="#000" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SLIDE_WIDTH,
    height: BUTTON_SIZE + 8,
    backgroundColor: "#212122",
    borderRadius: BUTTON_SIZE / 2 + 4,
    justifyContent: "center",
    overflow: "hidden",
    paddingLeft: 4,
  },
  label: {
    position: "absolute",
    alignSelf: "center",
    color: "#FFFFFF80",
    fontSize: 16,
    fontWeight: "700",
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: "#E7FA55",
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  progress: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: BUTTON_SIZE / 2 + 4,
    zIndex: 0,
  },
  arrow: {
    position: "absolute",
    right: 10,
  },
});
