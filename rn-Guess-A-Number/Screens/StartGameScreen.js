import React, { useState , useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import Card from "../Components/Card";
import Input from "../Components/Input";
import Colors from "../Constants/colors";
import NumberContainer from "../Components/NumberContainer";
import DefaultStyles from "../Constants/default-styles";
import MainButton from "../Components/MainButton";

const StartGameScreen = props => {
  const [enteredText, setEnteredText] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4)
    }

    Dimensions.addEventListener('change',updateLayout)

    return ( ) => {
      Dimensions.removeEventListener('change',updateLayout)
    }
  })

  const numberInputHandler = text => {
    setEnteredText(text.replace(/[^0-9]/g, ""));
  };

  const resetButtonHandler = () => {
    setEnteredText("");
    setConfirm(false);
  };

  const confrimButtonHandler = () => {
    const chosenNumber = parseInt(enteredText);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number should be between 0 and 99", [
        { text: "Okay", style: "destructive", onPress: resetButtonHandler }
      ]);
    }
    setConfirm(true);
    setEnteredNumber(chosenNumber);
    setEnteredText("");
    Keyboard.dismiss();
  };

  let outputEnteredNumber;

  if (confirm) {
    outputEnteredNumber = (
      <Card style={styles.outputContainer}>
        <Text style={DefaultStyles.titleText}>You Selected</Text>
        <NumberContainer>{enteredNumber}</NumberContainer>
        <MainButton onPress={() => props.startGameHandler(enteredNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset = {30}>
    <TouchableWithoutFeedback // This is done to dismiss the number keyboard on tapping outside it
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.gameScreen}>
        <Text style={styles.gameTitle}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text style={DefaultStyles.bodyText}> Select A Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredText}
          />
          <View style={styles.buttonContainer}>
            <View style={{width : buttonWidth}}>
              <Button
                title="Reset"
                onPress={resetButtonHandler}
                color={Colors.accent}
              />
            </View>
            <View style={{width : buttonWidth}}>
              <Button
                title="Confirm"
                onPress={confrimButtonHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {outputEnteredNumber}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },

  gameTitle: {
    fontSize: 24,
    marginVertical: 10,
    fontFamily: "open-sans-bold"
  },

  inputContainer: {
    width: "80%",
    minWidth : 310,
    maxWidth:'95%',
    alignItems: "center"
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16
  },

  input: {
    width: 80,
    textAlign: "center"
  },

  outputContainer: {
    marginVertical: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default StartGameScreen;
