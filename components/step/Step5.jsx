import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Step5({ purpose, data, setPurpose }) {
  function changeSelected(id) {
    setPurpose(id);
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginTop: 5,
          fontSize: 30,
          color: "#191919",
          marginBottom: 80,
        }}
      >
        Твоя цель
      </Text>
      <View>
        {data.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => changeSelected(item.id)}
            style={{
              borderWidth: 1,
              borderColor: purpose == item.id ? "transparent" : "#69696940",
              backgroundColor: purpose == item.id ? "#E1F854" : "transparent",
              height: 54,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 25,
              borderRadius: 4,
            }}
          >
            <Image
              source={{ uri: item.icon }}
              style={{ width: 30, height: 24, resizeMode: "contain" }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: purpose == i ? 600 : 500,
                color: "#000",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
