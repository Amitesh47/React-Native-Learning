import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from '../Constants/colors'

const MainButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{...styles.buttons, ...props.style}}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttons : {
    backgroundColor : Colors.primary,
    paddingHorizontal : 10,
    paddingVertical : 15,
    borderRadius : 30,
    alignItems: 'center'
  },

  buttonText : {
    color: 'white',
    fontFamily : 'open-sans',
    fontSize : 14
  }
});

export default MainButton;
