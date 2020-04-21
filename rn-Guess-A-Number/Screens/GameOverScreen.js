import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import DefaulStyles from "../Constants/default-styles";
import MainButton from '../Components/MainButton';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={DefaulStyles.titleText}>GAME OVER!!!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/original.png")}
          style={styles.image}
        />
      </View>
      <Text style={DefaulStyles.titleText}>
        No of Rounds : {props.roundsTaken}
      </Text>
      <Text style={DefaulStyles.titleText}>
        Number Selected : {props.selectedNumber}
      </Text>
      <View style={styles.newGameButton}>
        <MainButton onPress={props.newGameHandler} >NEW GAME</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 10
  },

  image: {
    width: "100%",
    height: "100%"
  },

  newGameButton : {
    width : '60%',
    marginTop : 8,
    alignItems: 'center'
  }
});

export default GameOverScreen;
