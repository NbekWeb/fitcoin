import { View, Text } from "react-native";
export default function InfoCard({ num, title }) {
  return (
    <View
      style={{
        width: "31%",
        height: 75,
        borderRadius: 16,
        backgroundColor: "#212122",
      }}
    >
      <Text
        style={{
          color: "#E7FA55",
          textAlign: "center",
          marginTop: 12,
          fontSize: 28,
          fontWeight: 700,
        }}
      >
        {num}
      </Text>
      <Text
        style={{
          color: "#FFFFFF80",
          fontSize: 10,
          fontWeight: 500,
          marginTop: 4,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
}
