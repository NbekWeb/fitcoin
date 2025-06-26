import { View, Text, ScrollView, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import useNotification from "../hooks/useNotification";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modal, Portal, Button } from "react-native-paper";

export default function Notification() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = Dimensions.get("window");
  const { getAllNotifications, notifications, readNotification } =
    useNotification();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(-1);

  function openModal(id, i) {
    setSelected(i);
    setVisible(true);
    if (!notifications?.serializer?.[i].is_read) {
      readNotification(id, notifications?.serializer?.[i].message, () => {
        getAllNotifications();
      });
    }
  }
  function goBack() {
    router.push("/dashboard/training");
  }
  useEffect(() => {
    getAllNotifications();
  }, []);
  let unreadCount;
  if (!!notifications?.serializer && notifications?.serializer?.length) {
    unreadCount = notifications?.serializer?.filter((n) => !n.is_read).length;
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: height,
        width: width,
        backgroundColor: "#F4F4F4",
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: insets.bottom,
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View
            style={{
              backgroundColor: "#fff",
              margin: 12,
              borderRadius: 12,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#1A1A1A",
                textAlign: "center",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {notifications?.serializer?.[selected]?.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#1A1A1A66",
                textAlign: "center",
              }}
            >
              {notifications?.serializer?.[selected]?.message}
            </Text>
          </View>
        </Modal>
      </Portal>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => goBack()}>
            <MaterialIcons name="chevron-left" size={30} color="#1A1A1A" />
          </Pressable>
          <Text
            style={{
              textTransform: "uppercase",
              fontStyle: "italic",
              fontSize: 20,
              paddingLeft: 4,
            }}
          >
            Уведомления
          </Text>
        </View>
        {unreadCount > 0 && (
          <LinearGradient
            colors={["#E7FA55", "#C9F24D"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {unreadCount}
            </Text>
          </LinearGradient>
        )}
      </View>
      {notifications?.serializer && notifications?.serializer.length > 0 && (
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}
        >
          <ScrollView>
            {notifications?.serializer.map((item, i) => (
              <NotificationCard
                read={item?.is_read}
                type="mail"
                title="+1000 FITCOINS"
                content={item?.message}
                key={item?.id}
                onPress={() => {
                  openModal(item.id, i);
                }}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {!notifications.serializer && (
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            color: "#212121",
            textAlign: "center",
            fontWeight: 600,
            opacity: "0.5",
          }}
        >
          Пока ничего нет!
        </Text>
      )}
    </View>
  );
}
