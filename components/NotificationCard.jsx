import { Pressable, Text,View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

export default function NotificationCard({
  type = "add",
  title = "",
  content = "",
  read = true,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        height: 66,
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        marginBottom: 12,
        padding: 8,
        flexDirection: "row",
      }}
    >
      <LinearGradient
        colors={["rgba(231,250,85,0.4)", "rgba(201,242,77,0.4)"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          width: 46,
          height: 46,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12,
          marginRight: 12,
          position: "relative",
        }}
      >
        <LinearGradient
          colors={["#BED700", "#4ECB00"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {type == "add" && (
            <Icon
              name="plus"
              size={18}
              color="#fff"
              onPress={() => router.push("/auth/login")}
            />
          )}
          {type == "minus" && (
            <Icon
              name="arrow-left"
              size={16}
              color="#fff"
              onPress={() => router.push("/auth/login")}
            />
          )}
          {type == "mail" && (
            <Icon
              name="mail"
              size={15}
              color="#fff"
              onPress={() => router.push("/auth/login")}
            />
          )}
        </LinearGradient>
      </LinearGradient>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          width: "100%",
        }}
      >
        {title && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            {title}
          </Text>
        )}
        {content && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#1A1A1A66",
              marginTop: 2,
            }}
          >
            {content}
          </Text>
        )}
      </View>
      {!read && (
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            borderWidth: 3,
            borderColor: "#F4F4F4",
            borderRadius: 10,
          }}
        >
          <LinearGradient
            colors={["#E7FA55", "#C9F24D"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              1
            </Text>
          </LinearGradient>
        </View>
      )}
    </Pressable>
  );
}
