import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const onClickAdd = enteredText => {
    // Added this as Math.random was generating the same number
    const firstNumber = Math.random();
    const secondNumebr = Math.random();
    const final = (firstNumber - secondNumebr).toString();
    // Here, currentGoals is a function which takes the current value of courseGoals
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { key: final, value: enteredText }
    ]);
    setIsModal(false);
  };

  const onDeleteHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.key !== goalId);
    });
  };

  const onCancel = () => {
    setIsModal(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Course" onPress={() => setIsModal(true)} />
      <GoalInput
        onClickAdd={onClickAdd}
        visible={isModal}
        onCancel={onCancel}
      />
      <FlatList
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.key}
            title={itemData.item.value}
            onDelete={onDeleteHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30
  }
});
