import React, { useEffect } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import useShop from "../../hooks/shop";
import ShopCard from "../../components/shop/card";

const Shop = () => {
  const { products, loading, getAll } = useShop();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <ScrollView>
      {loading && <ActivityIndicator size="large" color="blue" />}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingLeft: 12,
          paddingRight: 12,
          marginTop: 10,
          flex: 1,
        }}
      >
        {(products || []).map((item) => (
          <ShopCard key={item.id} data={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Shop;
