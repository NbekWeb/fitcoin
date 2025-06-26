import { View, Text, Pressable, Image } from "react-native";
import { Searchbar } from "react-native-paper";
import React, { useState, useEffect, useRef, use } from "react";
import useLenta from "../../hooks/useLenta";
import SearchCard from "../../components/lenta/SearchCard";
import LentCard from "../../components/lenta/lentCard";

export default function Lenta() {
  const [searchQuery, setSearchQuery] = useState("");
  const { getAllUserLenta, userLenta, getSearchResults, searchResults } =
    useLenta();

  const debounceTimeout = useRef(null);
  const onChangeSearch = (query) => {
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      getSearchResults(query);
    }, 300);
  };
  useEffect(() => {
    getAllUserLenta();
  }, []);
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          textAlign: "center",
          color: "#1A1A1A",
          fontWeight: 600,
          fontStyle: "italic",
          marginBottom: 20,
        }}
      >
        Лента
      </Text>
      <View style={{ paddingHorizontal: 12, marginBottom: 25 }}>
        <Searchbar
          placeholder="Поиск пользователя"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            elevation: 0,
          }}
          inputStyle={{
            fontSize: 14,
            color: "#1A1A1A",
            fontWeight: 500,
            marginVertical: 0,
          }}
          theme={{
            colors: {
              primary: "#1A1A1A",
            },
          }}
        />
      </View>
      {userLenta.length > 0 && !searchQuery && (
        <View>
          {userLenta.map((item) => (
            <LentCard key={item.id} item={item} />
          ))}
        </View>
      )}

      {userLenta.length == 0 && !searchQuery && (
        <View
          style={{
            padding: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: 500,
              color: "#1A1A1A66",
            }}
          >
            Лента пуста!
          </Text>
        </View>
      )}

      {!!searchQuery && searchResults.length == 0 && (
        <View
          style={{
            padding: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: 500,
              color: "#1A1A1A66",
            }}
          >
            Ничего не найдено
          </Text>
        </View>
      )}

      {!!searchQuery && !!searchResults && searchResults.length > 0 && (
        <View style={{ paddingLeft: 12, paddingRight: 12 }}>
          {searchResults.map((item) => (
            <SearchCard key={item.id} item={item} />
          ))}
        </View>
      )}
    </View>
  );
}
