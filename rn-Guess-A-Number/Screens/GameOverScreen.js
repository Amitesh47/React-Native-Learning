import React , {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image , Dimensions, ScrollView} from "react-native";

import DefaulStyles from "../Constants/default-styles";
import MainButton from '../Components/MainButton';

const GameOverScreen = props => {
  const [availableWidth, setAvailableWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const updateLayout = () => {
      setAvailableWidth(Dimensions.get('window').width)
    }

    Dimensions.addEventListener('change',updateLayout);

    return () => {
      Dimensions.removeEventListener('change',updateLayout)
    }
  })
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical : 10
  },

  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
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
