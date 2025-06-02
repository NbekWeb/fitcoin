import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import Tab from "../components/Tab";
export default function Main() {
  const two = [1, 2];
  const items = [1, 2, 3, 4,5,6];
  return (
    <View
      style={{
        marginTop: 5,
        position: "relative",
        flex: 1,
      }}
    >
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>

      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 14,
                color: "#1A1A1A80",
              }}
            >
              Пятница
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontStyle: "italic",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              12 Апреля
            </Text>
          </View>
          <Pressable
            style={{
              width: 40,
              height: 40,
              position: "relative",
            }}
          >
            <LinearGradient
              colors={["#E7FA55", "#C9F24D"]}
              start={{ x: 0.75, y: 0.25 }}
              end={{ x: 0.25, y: 0.75 }}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 10,
                borderWidth: 3,
                borderRadius: 9,
                borderColor: "#FCFCFC",
                width: 18,
                height: 18,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  lineHeight: 10,
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#1A1A1A",
                }}
              >
                1
              </Text>
            </LinearGradient>
            <LinearGradient
              colors={["#E7FA55", "#C9F24D"]}
              start={{ x: 0.75, y: 0.25 }}
              end={{ x: 0.25, y: 0.75 }}
              style={{
                width: 36,
                marginTop: 4,
                marginRight: 4,
                height: 36,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="notifications" size={20} color="#1A1A1A" />
            </LinearGradient>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          {items.map((j) => (
            <View
              key={j}
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: j > 1 ? 12 : 0,
              }}
            >
              {two.map((i) => (
                <View
                  key={i}
                  style={{
                    width:
                      i % 2 == 1 && j % 2 == 1
                        ? "auto"
                        : i % 2 !== 1 && j % 2 !== 1
                        ? "auto"
                        : 150,
                    flex:
                      i % 2 == 1 && j % 2 == 1
                        ? 1
                        : i % 2 !== 1 && j % 2 !== 1
                        ? 1
                        : 0,
                    height: 160,
                    position: "relative",
                    marginRight: j % 2 == 1 && i % 2 == 1 ? 12 : 0,
                    marginLeft: j % 2 !== 1 && i % 2 !== 1 ? 12 : 0,
                  }}
                >
                  {((i % 2 == 1 && j % 2 == 1) ||
                    (i % 2 !== 1 && j % 2 !== 1)) && (
                    <LinearGradient
                      colors={["#E7FA55", "#C9F24D"]}
                      start={{ x: 0.75, y: 0.25 }}
                      end={{ x: 0.25, y: 0.75 }}
                      style={{
                        width: 30,
                        marginTop: 4,
                        marginRight: 4,
                        height: 30,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        bottom: -3,
                        right: -6,
                        zIndex: 1,
                        borderWidth: 4,
                        borderColor: "#F4F4F4",
                      }}
                    >
                      <Image
                        source={require("../assets/img/play.png")}
                        style={{
                          width: 12,
                          height: 12,
                          resizeMode: "contain",
                        }}
                      />
                    </LinearGradient>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 3,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      position: "absolute",
                      top: 8,
                      right: "20%",
                      zIndex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#1A1A1A",
                        marginRight: 4,
                        marginLeft: 5,
                        fontWeight: 700,
                      }}
                    >
                      200
                    </Text>
                    <Image
                      source={require("../assets/img/coin.png")}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: "containe",
                        borderRadius: 9,
                      }}
                    />
                  </View>

                  <Image
                    source={require("../assets/img/tr.jpg")}
                    style={{
                      height: "100%",
                      width: "100%",
                      resizeMode: "cover",
                      borderRadius: 16,
                    }}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
      <Tab />
    </View>
  );
}
