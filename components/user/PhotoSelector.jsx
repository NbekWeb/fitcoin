import * as ImagePicker from "expo-image-picker";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";

const PhotoSelector = ({ user, changeAvatar }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Требуется разрешение ",
          "Разрешите доступ к выбору изображения!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType?.Image
          ? [ImagePicker.MediaType.Image]
          : ImagePicker.MediaTypeOptions.Images, // fallback
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);

        const fileName = uri.split("/").pop();
        const fileType = fileName.split(".").pop();
        const file = {
          uri,
          name: fileName,
          type: `image/${fileType === "jpg" ? "jpeg" : fileType}`, // iOS ko‘pincha jpg bo‘lsa ham jpeg deb yuborish kerak
        };

        changeAvatar(file);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Ошибка",
        text2: "Не удалось загрузить изображение",
      });
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      {/* {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      )} */}
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#fff",
          marginTop: 15,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Image
          source={
            user?.avatar
              ? { uri: user?.avatar?.uri ? user.avatar?.uri : user.avatar }
              : require("../../assets/img/avatar.png")
          }
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "#fff",
          }}
        />
      </View>

      <TouchableOpacity
        onPress={pickImage}
        style={{
          marginTop: 6,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Изменить фото</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoSelector;
