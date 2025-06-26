import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Lock({ onPress, type = "unlock" }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#337479",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DEF853",
      }}
    >
      <Icon name={type} size={24} color="#000000" />
    </Pressable>
  );
}
