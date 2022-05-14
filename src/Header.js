import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

const Header = () => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#1d1c1c",
      zIndex: 100,
      paddingTop: 50,
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
    },
    logo: {
      width: 100,
      height: 20,
      resizeMode: "contain",
    },
  });
