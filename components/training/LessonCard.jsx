import React, { useState, useRef, useEffect } from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const formatTime = (seconds) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

const LessonCard = ({ start, stop, finish }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  // Load time from storage on mount
  useEffect(() => {
    const loadTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem("lessonTime");
        if (storedTime !== null) {
          setTime(parseInt(storedTime));
        }
      } catch (error) {
        console.error("Failed to load lessonTime:", error);
      }
    };
    loadTime();
  }, []);

  // Start, Stop, Finish handler
  useEffect(() => {
    if (start && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          AsyncStorage.setItem("lessonTime", newTime.toString()).catch(
            (error) => console.error("Failed to save lessonTime:", error)
          );
          return newTime;
        });
      }, 1000);
    }

    if (stop && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (finish) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setTime(0);
      AsyncStorage.removeItem("lessonTime").catch((error) =>
        console.error("Failed to clear lessonTime:", error)
      );
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [start, stop, finish]);
  return (
    <LinearGradient
      colors={["#E7FA55", "#C9F24D"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={{ width: "100%", height: 110, borderRadius: 10 }}
    >
      <Text
        style={{
          color: "#1A1A1A",
          fontWeight: 600,
          fontSize: 52,
          fontStyle: "italic",
          textAlign: "center",
          paddingTop: 8,
        }}
      >
        {formatTime(time)}
      </Text>
      <Text
        style={{
          color: "#1A1A1A80",
          marginTop: 8,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Длительность
      </Text>
    </LinearGradient>
  );
};

export default LessonCard;
