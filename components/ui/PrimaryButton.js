import { StyleSheet, Pressable, Text, View } from "react-native";
import Colors from "../../constants/colors";

export default function PrimaryButton({ children, onPress }) {
  function pressHandler() {
    onPress();
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "red" }}
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.buttonInnerContainer]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 4,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.accent500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    //     color: "white",
    textAlign: "center",
  },
  //ios  - pressed btn style
  pressed: {
    opacity: 0.75,
  },
});
