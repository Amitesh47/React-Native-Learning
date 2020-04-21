import React from "react";
import { View, StyleSheet,Text } from "react-native";

import Colors from "../Constants/colors";

const NumberContainer = props => {
  return (
    <View style={{ ...styles.numberContainer, ...props.style }}>
      <Text style= {styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 10
  },

  number : {
    fontSize : 20,
    color : Colors.accent
  }
});

export default NumberContainer;
