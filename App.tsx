/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  text: string;
  selectLetter: (index: Array<number>) => void;
  index: Array<number>;
}

const Button: FC<Props> = ({text, index, selectLetter}) => {
  const onPress = () => selectLetter(index);
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text>{text}</Text>
    </Pressable>
  );
};

const App = () => {
  const [board, setBoard] = useState<Array<Array<string>> | null>(null);
  const [word, setWord] = useState<string>('');

  if (!board)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.sectionTitle}>Loading...</Text>
      </SafeAreaView>
    );

  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  button: {
    color: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#D9534F',
    backgroundColor: '#FFAD60',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
