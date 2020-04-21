import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./Components/Header";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import GameOverScreen from "./Screens/GameOverScreen";

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf")
  });
};

export default function App() {
  const [chosenNumber, setChosenNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  const newGameHandler = () => {
    setRounds(0);
    setChosenNumber(null);
    setDataLoaded(false)
  };

  const startGameHandler = selectedNumber => {
    setChosenNumber(selectedNumber);
  };

  const gameOverHandler = count => {
    setRounds(count);
  };

  let content = <StartGameScreen startGameHandler={startGameHandler} />;

  if (chosenNumber && rounds <= 0) {
    content = (
      <GameScreen userChoice={chosenNumber} gameOverHandler={gameOverHandler} />
    );
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        roundsTaken={rounds}
        selectedNumber={chosenNumber}
        newGameHandler={newGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
