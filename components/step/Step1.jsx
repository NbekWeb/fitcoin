import { View, Text } from "react-native";
import FirstStepCard from "../FirstStepCard";

export default function Step1({ train, setTrain, data }) {
 function changeSelected(id) {
    setTrain(id);
  }

  return (
    <View className="flex-1">
      <Text
        style={{
          marginTop: 5,
          fontSize: 30,
          color: "#191919",
          marginBottom: 50,
        }}
      >
        Что тебе по душе?
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        {data.map((item, index) => (
          <FirstStepCard
            key={item.id}
            image={{ uri: item.image }}
            title={item.name}
            right={index % 2 !== 0}
            selected={item.id === train}
            onPress={() => changeSelected(item.id)}
          />
        ))}
      </View>
    </View>
  );
}
