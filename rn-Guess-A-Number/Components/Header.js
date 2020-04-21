import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from '../Constants/colors'
import DefaultStyles from '../Constants/default-styles'

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={DefaultStyles.titleText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 36,
    backgroundColor: Colors.primary
  },
});

export default Header;
