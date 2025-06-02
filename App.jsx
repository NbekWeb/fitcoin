import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, View ,Pressable} from "react-native";
import "./global.css";
import { Link } from "expo-router";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeAreaView
        className="flex-1 bg-red-500 items-center justify-center"
        edges={["top", "bottom"]}
      >
        <View className="bg-blue-500 p-4 rounded-lg h-full w-full">
          <Text className="font-bold text-white text-2xl">just test a</Text>
          <Link href="/about" asChild>
            <Pressable className="mt-4 bg-blue-600 px-4 py-2 rounded">
              <Text className="text-white">Go to About</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
