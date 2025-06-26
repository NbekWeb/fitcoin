import { View ,Text,Image} from "react-native";

export default function CoinCard({coin=0}) {
  return (
    <View
      style={{
        marginTop: 8,
        marginRight: 8,
        marginLeft: "auto",
        backgroundColor: "#fff",
        height: 26,
        width: "auto",
        borderRadius: 13,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginRight: 4,
          color: "#1A1A1A",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        {coin}
      </Text>
      <Image
        source={require("../../assets/img/coin.png")}
        className=""
        style={{
          width: 16,
          height: 16,
          resizeMode: "cover",
          marginRight: 4,
        }}
      />
      <Text
        style={{
          color: "#1A1A1A99",
          fontSize: 12,
        }}
      >
        Заработано
      </Text>
    </View>
  );
}
