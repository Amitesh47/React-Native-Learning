import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";

import NumberContainer from "../Components/NumberContainer";
import Card from "../Components/Card";
import DefaultStyles from "../Constants/default-styles";
import MainButton from "../Components/MainButton";

const getRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === exclude) {
    return getRandomNumber(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const renderListItems = (value, roundNo) => {
  return (
    <View key={value} style={styles.listItem}>
      <Text style={DefaultStyles.bodyText}>#{roundNo}</Text>
      <Text style={DefaultStyles.bodyText}>{value}</Text>
    </View>
  );
};

const GameScreen = props => {
  const initialGuess = getRandomNumber(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [passedGuess, setPassedGuess] = useState([initialGuess]);
  const [availableHeight, setAvailableHeight] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, gameOverHandler } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.gameOverHandler(passedGuess.length);
    }
  }, [currentGuess, userChoice, gameOverHandler]);

  const hintHandler = direction => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", "You know you are wrong", [
        {
          text: "Sorry",
          style: "cancel"
        }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextRandomNumber = getRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextRandomNumber);
    setPassedGuess(roundNo => [nextRandomNumber, ...roundNo]);
  };

  if (availableHeight < 400) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.titleText}> Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={hintHandler.bind(this, "lower")}>
            LOWER
          </MainButton>
          <NumberContainer style={styles.numberContainer}>
            <Text>{currentGuess}</Text>
          </NumberContainer>
          <MainButton onPress={hintHandler.bind(this, "higher")}>
            GREATER
          </MainButton>
        </View>

        <View style={styles.list}>
          <ScrollView>
            {passedGuess.map((guess, index) =>
              renderListItems(guess, passedGuess.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.titleText}> Opponent's Guess</Text>
        <NumberContainer style={styles.numberContainer}>
          <Text>{currentGuess}</Text>
        </NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={hintHandler.bind(this, "lower")}>
            LOWER
          </MainButton>
          <MainButton onPress={hintHandler.bind(this, "higher")}>
            GREATER
          </MainButton>
        </Card>
        <View style={styles.list}>
          <ScrollView>
            {passedGuess.map((guess, index) =>
              renderListItems(guess, passedGuess.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    alignItems: "center"
  },

  numberContainer: {
    padding: 10
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%" // Check here for IOS
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10
  },

  list: {
    width: "80%",
    flex: 1,
    marginTop: Dimensions.get("window").height > 600 ? 0 : 10 //Check here for IOS
  },

  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%"
  }
});

export default GameScreen;
