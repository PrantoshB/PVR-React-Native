import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import malls from "../data/malls";

const MovieScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [seatsData, setSeatsData] = useState([]);
  const mallsData = malls;
  const [mall, setMall] = useState([]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Text
            numberOfLines={1}
            style={{ fontSize: 16, fontWeight: "600", marginLeft: 10 }}
          >
            {route.params.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "23%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="search" size={24} color="black" />
          <Ionicons name="filter-outline" size={24} color="black" />
          <Ionicons name="share-outline" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="Safety" size={22} color="#ffc40c" />
          <Text style={{ marginLeft: 5 }}>Your safety is our Priority</Text>
        </View>
      </View>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date("2023-02-14")}
        endDate={new Date("2023-03-10")}
        initialSelectedDate={new Date("2023-02-14")}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      {mallsData.map((item) => (
        <Pressable
          onPress={() => {
            setMall(item.name);
            setSeatsData(item.tableData);
          }}
          key={item.id}
          style={{ margin: 10 }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {item.name}
          </Text>
          {mall.includes(item.name) ? (
            <FlatList
              horizontal={false}
              numColumns={3}
              data={item.showtimes}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Theatre", {
                      mall: mall,
                      name: route.params.name,
                      time: item,
                      seats: seatsData,
                      date: selectedDate,
                      image: route.params.image,
                    });
                  }}
                  style={{
                    borderColor: "green",
                    borderWidth: 1,
                    padding: 5,
                    width: 80,
                    borderRadius: 2,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ textAlign: "center", color: "green" }}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          ) : null}
        </Pressable>
      ))}
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
