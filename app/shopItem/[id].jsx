import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/Feather";
import React, { useEffect, useState, useRef } from "react";
import useShop from "../../hooks/shop";
import useUser from "../../hooks/user";
import { useRouter, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { Modal, Portal, Button, TextInput } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const ShopItem = () => {
  const addressRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("+7");
  const [address, setAddress] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const insets = useSafeAreaInsets();
  const shop = useShop();
  const { product, loading, getOne, buy } = shop;
  const { user, getUser } = useUser();

  const router = useRouter();
  const [count, setCount] = useState(1);
  const { id } = useLocalSearchParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const formatPrice = (value) => {
    if (!value) return "";
    const number = parseInt(String(value).replace(/[^\d]/g, ""), 10);
    return number.toLocaleString("ru-RU");
  };

  const getFullImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `https://api2.study-sales.ru/${url}`;
  };

  const buying = () => {
    showModal();
    // Toast.show({
    //   type: "error",
    //   text1: "Недостаточно монет",
    //   text2: "У вас недостаточно монет для покупки.",
    // });
    // router.push("/dashboard/shop");
    // buy(id, () => {
    //   router.push("/dashboard/shop");
    // });
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      goBack();
    }
  };

  const increase = () => {
    setCount(count + 1);
  };
  function goBack() {
    router.push("/dashboard/shop");
  }
  function canceled() {
    hideModal();
    setPhone("+7");
    setAddress("");
    goBack();
  }
  function buyed() {
    if (user?.coin && product?.coin * count <= user?.coin) {
      if (!phone || phone.length < 12) {
        Toast.show({
          type: "error",
          text1: "Неверный номер телефона",
          text2: "Пожалуйста, введите корректный номер телефона.",
        });
        return;
      }
      if (!address || address.length < 5) {
        Toast.show({
          type: "error",
          text1: "Неверный адрес",
          text2: "Пожалуйста, введите корректный адрес доставки.",
        });
        return;
      } else {
        buy(
          {
            marketplace: id,
            phone: phone.replace("+", ""),
            address,
            quantity: count,
          },
          () => {
            canceled();
          }
        );
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Недостаточно монет",
        text2: "У вас недостаточно монет для покупки.",
      });
      hideModal();
    }
  }

  useEffect(() => {
    getOne(id);
    getUser();
  }, [id]);

  if (!shop) return null;

  return (
    <View style={{ height }}>
      <ScrollView
        style={{
          width,
          borderRadius: 10,
          marginTop: Constants.statusBarHeight,
          paddingHorizontal: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <View>
            <View
              style={{
                marginBottom: 12,
              }}
            >
              <Icon
                name="chevron-left"
                size={30}
                color="#000"
                onPress={goBack}
              />
            </View>

            {product?.images?.length > 0 && (
              <View
                style={{
                  height: 250,
                  position: "relative",
                }}
              >
                <Carousel
                  width={width - 24}
                  height={250}
                  loop
                  autoPlay={false}
                  data={product.images}
                  scrollAnimationDuration={150}
                  onSnapToItem={(index) => setActiveIndex(index)}
                  renderItem={({ item }) => (
                    <View
                      key={item.id}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 250,
                        flex: 1,
                        width: width - 24,
                      }}
                    >
                      <Image
                        source={{ uri: getFullImageUrl(item.image) }}
                        style={{
                          width: width - 24,
                          height: 250,
                          borderRadius: 10,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    flex: 1,
                    width: width - 24,
                    left: 0,
                    bottom: 10,
                    position: "absolute",
                  }}
                >
                  {product.images.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        index === activeIndex && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              </View>
            )}

            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#1A1A1A",
                textAlign: "center",
                marginTop: 10,
                marginHorizontal: 4,
                marginBottom: 6,
              }}
            >
              {product?.name}
            </Text>

            <Text
              style={{
                color: "rgba(26, 26, 26, 0.6)",
                fontSize: 14,
                fontWeight: "500",
                marginBottom: 12,
              }}
            >
              {product?.description}
            </Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          paddingHorizontal: 12,
          paddingTop: 10,
          paddingBottom: insets.bottom + 5,
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../assets/img/coin.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#1A1A1A",
              }}
            >
              {formatPrice(product?.coin * count)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={decrease}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                backgroundColor: "#C9F24D",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1A1A1A",
                }}
              >
                <Icon name="minus" size={20} color="#1A1A1A" />
              </Text>
            </Pressable>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                paddingHorizontal: 5,
              }}
            >
              {count}
            </Text>

            <Pressable
              onPress={increase}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                backgroundColor: "#C9F24D",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#1A1A1A",
                }}
              >
                <Icon name="plus" size={20} color="#1A1A1A" />
              </Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          onPress={buying}
          style={{
            height: 40,
            backgroundColor: "#C9F24D",
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#1A1A1A",
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            Оформить заказ
          </Text>
        </Pressable>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
            Подтвердите заказ
          </Text>

          <TextInput
            label="Номер телефона"
            value={phone}
            onChangeText={(text) => {
              let cleaned = text.replace(/\D/g, "");
              let formatted = "+7";

              if (cleaned.startsWith("7")) cleaned = cleaned.substring(1);
              if (cleaned.length > 0)
                formatted += " " + cleaned.substring(0, 3);
              if (cleaned.length > 3)
                formatted += " " + cleaned.substring(3, 6);
              if (cleaned.length > 6)
                formatted += "-" + cleaned.substring(6, 8);
              if (cleaned.length > 8)
                formatted += "-" + cleaned.substring(8, 10);

              setPhone(formatted);
              if (cleaned.length === 10) {
                addressRef.current?.focus();
              }
            }}
            keyboardType="phone-pad"
            mode="outlined"
            style={{
              marginBottom: 12,
              backgroundColor: "#F5F5F5",
              borderRadius: 6,
            }}
            outlineColor="#E0E0E0"
            activeOutlineColor="#C9F24D"
            textColor="#1A1A1A"
          />

          <TextInput
            label="Адрес доставки"
            value={address}
            ref={addressRef}
            multiline
            numberOfLines={3}
            onChangeText={setAddress}
            mode="outlined"
            style={{
              marginBottom: 20,
              backgroundColor: "#F5F5F5",
              borderRadius: 6,
            }}
            outlineColor="#E0E0E0"
            activeOutlineColor="#C9F24D"
            textColor="#1A1A1A"
          />

          <Button
            mode="contained"
            onPress={buyed}
            style={{ backgroundColor: "#C9F24D" }}
          >
            Купить
          </Button>

          <Button onPress={canceled} style={{ marginTop: 10 }}>
            Отмена
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "rgba(201, 242, 77, .4)",
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  activeDot: {
    backgroundColor: "#C9F24D",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default ShopItem;
