import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function App() {
  const [mode, setMode] = useState("square"); // "square" or "cube"
  const [range, setRange] = useState({ min: 2, max: 50 });
  const [number, setNumber] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const min = range.min;
    const max = mode === "square" ? range.max : 15; // default for cubes
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(num);
    setAnswer("");
  };

  const checkAnswer = () => {
    if (!number) return;

    const correct =
      mode === "square" ? number * number : number * number * number;

    if (parseInt(answer) === correct) {
      setScore(score + 1);
      Alert.alert("✅ Correct!");
    } else {
      Alert.alert(`❌ Wrong! Correct answer: ${correct}`);
    }
    generateQuestion();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Square & Cube Practice</Text>

      <View style={styles.buttonRow}>
        <Button title="Squares" onPress={() => { setMode("square"); generateQuestion(); }} />
        <Button title="Cubes" onPress={() => { setMode("cube"); generateQuestion(); }} />
      </View>

      {number && (
        <Text style={styles.question}>
          {mode === "square"
            ? `What is ${number}² ?`
            : `What is ${number}³ ?`}
        </Text>
      )}

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={answer}
        onChangeText={setAnswer}
        placeholder="Enter your answer"
      />

      <Button title="Check" onPress={checkAnswer} />

      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  buttonRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  question: { fontSize: 20, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, width: "80%", marginBottom: 15, textAlign: "center" },
  score: { fontSize: 18, marginTop: 20 },
});
