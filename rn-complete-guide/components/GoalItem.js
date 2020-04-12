import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GoalItem = props => {
  return (
    <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.itemList}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemList: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "yellow",
    marginVertical: 10,
    padding: 10
  }
});

export default GoalItem;
