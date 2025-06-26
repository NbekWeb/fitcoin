import { View, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function TrainCard({ type = 0, data = {} }) {
  const router = useRouter();


  return (
    <TouchableOpacity
      onPress={() => router.push(`trains/${data?.id}`)}
      style={{
        flex: 1,
        height: 160,
        position: "relative",
      }}
    >
      {(type % 4 == 3 || type % 4 == 0) && (
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
          {data?.coin}
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
        source={{ uri: data?.image }}
        style={{
          height: "100%",
          width: "100%",
          resizeMode: "cover",
          borderRadius: 16,
        }}
      />
    </TouchableOpacity>
  );
}
