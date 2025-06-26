import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function MaxMin({ onPress, type = "min" }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        marginTop: 6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DEF853",
      }}
    >
      <Icon
        name={type == "min" ? "maximize" : "minimize"}
        size={24}
        color="#000000"
      />
    </Pressable>
  );
}
