import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  Pressable,
  Alert
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MoviesCards } from "../Context";
import { useStripe } from "@stripe/stripe-react-native";

const TheatreScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { seats, setSeats,occupied } = useContext(MoviesCards);
  const onSeatSelect = (item) =>{
    const seatSelected = seats.find((seat) => seat === item);
    if(seatSelected){
     setSeats( seats.filter((seat) => seat !== item))
    }else {
        setSeats([...seats, item])
    }
  }
  const displaySeats = [...seats]
  const fee = 87;
  const noOfSeats = seats.length;
  const priceValue = noOfSeats * 240;
  const total = seats.length > 0 ? fee + noOfSeats * 240 : 0;

const stripe = useStripe();

  const subscribe = async() => {
    const response = await fetch("http://localhost:8080/payment", {
      method: "POST",
      body: JSON.stringify({
        amount:Math.floor(total * 100),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) return Alert.alert(data.message);
    const clientSecret = data.clientSecret;
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    else{
        occupied.push(...seats);
        navigation.navigate("Ticket",{
          name:route.params.name,
          mall:route.params.mall,
          timeSelected:route.params.time,
          total:total,
          image:route.params.image,
          date:route.params.date,
          selectedSeats:displaySeats,
          priceValue:priceValue,
        })
        setSeats([]);
      }
  
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
          marginRight: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 15 }}>
              {route.params.name}
            </Text>
            <Text style={{ color: "gray" }}>{route.params.mall}</Text>
          </View>
        </View>
        <AntDesign name="sharealt" size={22} color="black" />
      </View>
      <Text
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
          fontSize: 16,
        }}
      >
        {route.params.time}
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginTop: 5,
          fontSize: 13,
          color: "gray",
        }}
      >
        CLASSIC (180)
      </Text>
      <FlatList
        style={{ marginLeft: 12, marginTop: 20 }}
        horizontal={false}
        numColumns={7}
        data={route.params.seats}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onSeatSelect(item)}

            style={{
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 4,
              marginRight: 12,
              marginBottom: 15,
              width: 42,
            }}
          >
            {seats.includes(item) ? (
            <Text style={{ textAlign: "center", fontSize: 13, backgroundColor: '#ffc40c' , padding: 10}}>{item}</Text>
            ) : (
                <Text style={{ textAlign: "center", fontSize: 13, color: "gray", margin: 10 }}>
                    {item}
                </Text>
            )
        }

          </Pressable>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          backgroundColor: "#d8d8d8",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
          }}
        >
          <FontAwesome name="square" size={28} color="#ffc40c" />
          <Text style={{ fontSize: 12 }}>Selected</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
          }}
        >
          <FontAwesome name="square" size={28} color="white" />
          <Text style={{ fontSize: 12 }}>Vacant</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: 15,
          }}
        >
          <FontAwesome name="square" size={28} color="gray" />
          <Text style={{ fontSize: 12 }}>Occupied</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 14, color: "gray", marginBottom: 5 }}>
            Show end time approx 6:51pm
          </Text>
          {seats.length > 0 ? (
                <Text style={{  fontSize: 17 }}>{seats.length} seats selected</Text>
            ) : (
        <Text style={{ fontSize: 17 }}>No seats selected</Text>
            )}
        </View>
        <View
          style={{
            backgroundColor: "#d8d8d8",
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            height: 50,
          }}
        >
          <Text>Now with ticket cancellation</Text>
        </View>
      </View>
      <View
        style={{ backgroundColor: "#ffc40c", padding: 15, marginTop: 50 }}
      >
        <Pressable onPress={subscribe}>
           
       {seats.length > 0 ? (
                <Text style={{ textAlign: "center", fontSize: 17 }}>PAY ₹{total}</Text>
            ) : (
        <Text style={{ fontSize: 17 , textAlign: "center"}}>PAY  ₹0</Text>
            )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TheatreScreen;

const styles = StyleSheet.create({});
