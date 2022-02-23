/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FC, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import testBoard from './test-board-1.json';
import testBoard2 from './test-board-2.json';
import dictionary from './dictionary.json';

interface Tile {
  letter: string;
  selected: boolean;
}

interface Props {
  letter: string;
  selectLetter: (index: Array<number>) => void;
  index: Array<number>;
  selected: boolean;
  validWord: boolean;
}

const Button: FC<Props> = ({letter, index, selectLetter, selected, validWord}) => {
  let backgroundColor = selected ? '#A3DA8D' : '#FFAD60';
  if (selected && !validWord) backgroundColor = '#D9534F';
  const onPress = () => selectLetter(index);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.button, {backgroundColor}]}>
      <Text style={styles.sectionTitle2}>{letter}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [board, setBoard] = useState<Array<Array<Tile>> | null>(null);
  const [word, setWord] = useState<string>('');

  const fillBoard = () => {
    try {
      let newBoard: Array<Array<Tile>> = [[], [], [], []];
      const letters = testBoard2.board;
      let letterIndex = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newBoard[i][j] = {letter: letters[letterIndex], selected: false};
          letterIndex++;
        }
      }
      setBoard(newBoard);
    } catch (error) {
      console.log('FILL_ERROR: ', error);
    }
  };

  const selectLetter = (index: Array<number>) => {
    if (board) {
      const newBoard = [...board];
      if (!newBoard[index[0]][index[1]].selected) {
        const newWord = word + newBoard[index[0]][index[1]].letter;
        setWord(newWord);
      }
      newBoard[index[0]][index[1]].selected = true;
      setBoard(newBoard);
    }
  };

  const clear = () => {
    fillBoard();
    setWord('');
  };

  useEffect(() => {
    fillBoard();
  }, []);

  if (!board)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.sectionTitle}>Loading...</Text>
      </SafeAreaView>
    );

  const validWord = dictionary.words.includes(word.toLowerCase());
  const color = validWord ? '#A3DA8D' : '#D9534F';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 18, fontWeight: '300', color: 'gray'}}>Clear word</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={clear}
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
          }}>
          <Text style={{fontSize: 24, fontWeight: '400'}}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {board.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((tile, j) => (
              <Button
                key={j}
                letter={tile.letter}
                selected={tile.selected}
                validWord={validWord}
                selectLetter={selectLetter}
                index={[i, j]}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.sectionTitle, {color}]}>{word}</Text>
        {word !== '' && (
          <Text style={[{fontSize: 18, fontWeight: '300'}, {color}]}>{validWord ? 'Valid' : 'Invalid'}</Text>
        )}
      </View>
    </SafeAreaView>
  );
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
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#444444',
    letterSpacing: 4,
  },
  sectionTitle2: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 4,
  },
  closeButton: {},
  header: {
    marginBottom: '15%',
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: '15%',
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#444444',
    borderWidth: 2,
    padding: 8,
  },
});

export default App;
