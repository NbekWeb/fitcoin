import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Play({ onPress, type = "pause", size = "min" }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: size == "max" ? 110 : 60,
        height: size == "max" ? 110 : 60,
        backgroundColor: "#DEF853",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 55,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
      }}
    >
      <Icon
        name={type == "pause" ? "play" : "pause"}
        size={size == "max" ? 50 : 30}
        color="#000000"
      />
    </Pressable>
  );
}
