import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text as RNText } from 'react-native';
import { Button, Text, Appbar } from 'react-native-paper';

const AgePickerScreen = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState(27);
  const ages = Array.from({ length: 31 - 18 }, (_, i) => i + 18); // 18dan 30gacha

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Шаг 2 из 5" />
        <Appbar.Action icon="close" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.title}>Твой возраст</Text>

        <FlatList
          data={ages}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedAge(item)}>
              <View style={[styles.ageItem, selectedAge === item && styles.selected]}>
                <RNText style={[styles.ageText, selectedAge === item && styles.selectedText]}>
                  {item}
                </RNText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <Button
        mode="contained"
        onPress={() => {
          // Davom etish
        }}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        Следующий шаг
      </Button>
    </View>
  );
};

export default AgePickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 16,
  },
  list: {
    alignItems: 'center',
  },
  ageItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 4,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: '#777',
  },
  ageText: {
    fontSize: 20,
    color: '#555',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    margin: 20,
    backgroundColor: '#E7FF4F',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 18,
  },
});
