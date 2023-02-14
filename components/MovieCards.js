import { FlatList, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import movies from '../data/movies'
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

const MovieCards = () => {
    const data = movies;
    const navigation = useNavigation();
  return (
    <View>
      <FlatList showsVerticalScrollIndicator={false} horizontal={false} numColumns={2} ListHeaderComponent={Header} data={data} renderItem={({item})=>(
        <Pressable style={{margin: 10, marginHorizontal: 15}}>
            <Image style={{aspectRatio: 2/3, height: 240, borderRadius: 10}} source={{uri: item.image}}/>
            <Text style={{fontSize: 15,marginTop:10, width: 170}}>{item.name}</Text>
            <Text style={{color: "gray", marginTop: 4, fontSize: 14}}>U/A • {item.language}</Text>
            <Text style={{ marginTop: 4, fontSize: 14}}>{item.genre}</Text>
            <Pressable onPress={
              ()=>navigation.navigate("Movies", {name: item.name, image: item.image })
            } style={{backgroundColor: '#ffc40c', padding: 6, borderRadius: 6, marginTop: 5, width: "50%"}}>
                <Text style={{fontSize: 13, textAlign: 'center'}}>BOOK</Text>
            </Pressable>
        </Pressable>
      )}/>  
    </View>
  )
}

export default MovieCards
