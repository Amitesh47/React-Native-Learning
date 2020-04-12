import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = props => {
  const [userInput, setUserInput] = useState("");

  const inputHandler = enteredText => {
    setUserInput(enteredText);
  };

  const clearInputHandler = () => {
    props.onClickAdd(userInput);
    setUserInput("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goals"
          style={styles.input}
          onChangeText={inputHandler}
          value={userInput}
        />
        <View style={styles.buttonContainer}>
          <View style = {styles.buttons}>
            <Button title="CANCEL" onPress={props.onCancel} color="red" />
          </View>
          <View style = {styles.buttons}>
            <Button
              title="ADD"
              onPress={clearInputHandler} // onPress = { () => props.onClickAdd(userInput)} -> alternative
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  input: {
    borderColor: "black",
    padding: 5,
    borderWidth: 1,
    width: "70%",
    marginBottom: 10
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%"
  },

  buttons:{
    width:'40%'
  }
});

export default GoalInput;
