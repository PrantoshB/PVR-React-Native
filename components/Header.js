import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
    const types = [
        {
          id: "0",
          name: "IMAX",
        },
        {
          id: "1",
          name: "4DX",
        },
        {
          id: "2",
          name: "PXL",
        },
        {
          id: "3",
          name: "GOLD",
        },
        {
          id: "4",
          name: "PLAYHOUSE",
        },
      ];
  return (
    <View>
      <ImageBackground style={{aspectRatio: 5/2, height: 170 }} source={{
            uri: "https://mcugeeks.com/wp-content/uploads/2022/11/ant-man-3-cast-marvel-1024x576.webp" }}>
        <Pressable style={{ top: 120, left: 20, width: "82%", backgroundColor: 'white' ,padding: 10, borderRadius: 10, height: 130 }}>
            <Text style={{fontSize: 14, color: 'gray', fontWeight: "500"}}>Now in Cinemas</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
               <View>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>ANT-MAN AND THE WASP</Text>
                <Text style={{fontSize: 15, marginTop: 5, color: 'gray', fontWeight: "400"}}>
                    16+ | 2h 15m
                </Text>
                </View>
                <Pressable style={{backgroundColor: '#ffc40c', padding: 10, borderRadius: 6, marginRight: 10}}><Text style={{fontSize: 14, fontWeight: "500", textAlign: 'center'}}>BOOK</Text>
                </Pressable>
            </View>
            <Text style={{fontSize: 15, fontWeight: "500", marginTop: 8}}>Comedy | Adventure</Text>
        </Pressable>
       
      </ImageBackground>
      <View style={{marginTop: 110}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {types.map((item)=>(
                    <View key={item.id} style={{margin:10,borderColor:"C0C0C0",borderWidth:0.4,borderRadius:4,padding:10}}>
                        <Text>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    </View>
    
  )
}

export default Header

const styles = StyleSheet.create({})