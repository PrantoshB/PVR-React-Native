import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import MovieCards from '../components/MovieCards'

const HomeScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: "#f0f0f0", flex: 1}}>
      <MovieCards/>
    </SafeAreaView> )
}

export default HomeScreen

const styles = StyleSheet.create({})