import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Gifs from './src/Gifs';
import Header from './src/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Gifs/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1c1c'
  },
});
