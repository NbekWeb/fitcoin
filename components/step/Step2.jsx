import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text as RNText,
} from "react-native";
import { Button, Text, Appbar } from "react-native-paper";

const Step2 = ({ years, setYears }) => {

  const ages = Array.from({ length: 61 - 12 }, (_, i) => i + 12);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={{
            marginTop: 5,
            fontSize: 30,
            color: "#191919",
          }}
        >
          Твой возраст
        </Text>

        <FlatList
          style={{ maxHeight: 300, marginTop: "auto", marginBottom: "auto" }}
          data={ages}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={13}
          getItemLayout={(data, index) => ({
            length: 40,
            offset: 40 * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setYears(item)}>
              <View
                style={[
                  styles.ageItem,
                  years == item && styles.selected,
                ]}
              >
                <RNText
                  style={[
                    styles.ageText,
                    years == item && styles.selectedText,
                  ]}
                >
                  {item}
                </RNText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  list: {
    alignItems: "center",
  },
  ageItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 1,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: "rgba(0, 0, 0, 0.54)",
  },
  ageText: {
    fontSize: 18,
    color: "#3A4750",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
});
