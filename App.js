import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }
  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.rootScreen}>
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.startGameContainer}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </View>
    </>
    // <>
    //   <StatusBar style="light" />
    //   <View style={styles.appContainer}>
    //     <Button
    //       title="Add New Goal"
    //       color="#a065ec"
    //       onPress={startAddGoalHandler}
    //     />
    //     <GoalInput
    //       visible={modalIsVisible}
    //       onAddGoal={addGoalHandler}
    //       onCancel={endAddGoalHandler}
    //     />
    //     <View style={styles.goalsContainer}>
    //       <FlatList
    //         data={courseGoals}
    //         renderItem={(itemData) => {
    //           return (
    //             <GoalItem
    //               text={itemData.item.text}
    //               id={itemData.item.id}
    //               onDeleteItem={deleteGoalHandler}
    //             />
    //           );
    //         }}
    //         keyExtractor={(item, index) => {
    //           return item.id;
    //         }}
    //         alwaysBounceVertical={false}
    //       />
    //     </View>
    //   </View>
    // </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  startGameContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "black",
  },
  backgroundImage: {
    opacity: 0.4,
  },
  goalsContainer: {
    flex: 5,
  },
});
