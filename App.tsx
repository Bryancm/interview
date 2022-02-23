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
import {SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import testBoard from './test-board-1.json';
import testBoard2 from './test-board-2.json';
import dictionary from './dictionary.json';
import {TileButton} from './components/TileButton';
import {Colors} from './colors';

interface Tile {
  letter: string;
  selected: boolean;
  canBeSelected: boolean;
}

const App = () => {
  const [board, setBoard] = useState<Array<Array<Tile>> | null>(null);
  const [word, setWord] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const fillBoard = () => {
    try {
      let newBoard: Array<Array<Tile>> = [[], [], [], []];
      const letters = testBoard2.board;
      let letterIndex = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newBoard[i][j] = {letter: letters[letterIndex], selected: false, canBeSelected: false};
          letterIndex++;
        }
      }
      setBoard(newBoard);
    } catch (error) {
      console.log('FILL_BOARD_ERROR: ', error);
    }
  };

  const clearCanBeSelected = (board: Array<Array<Tile>>) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        board[i][j].canBeSelected = false;
      }
    }
  };

  const setCanBeSelected = (board: Array<Array<Tile>>, index: Array<number>) => {
    const i = index[0];
    const j = index[1];

    if (i - 1 >= 0) board[i - 1][j].canBeSelected = true;
    if (i + 1 <= 3) board[i + 1][j].canBeSelected = true;
    if (j - 1 >= 0) board[i][j - 1].canBeSelected = true;
    if (j + 1 <= 3) board[i][j + 1].canBeSelected = true;

    if (i - 1 >= 0 && j - 1 >= 0) board[i - 1][j - 1].canBeSelected = true;
    if (i - 1 >= 0 && j + 1 <= 3) board[i - 1][j + 1].canBeSelected = true;
    if (i + 1 <= 3 && j - 1 >= 0) board[i + 1][j - 1].canBeSelected = true;
    if (i + 1 <= 3 && j + 1 <= 3) board[i + 1][j + 1].canBeSelected = true;
  };

  const selectLetter = (index: Array<number>) => {
    if (board) {
      const i = index[0];
      const j = index[1];
      const newBoard = [...board];
      if (word && !newBoard[i][j].canBeSelected) return setMessage('You can only select neighbor tiles');
      if (word && newBoard[i][j].selected) return;
      clearCanBeSelected(newBoard);
      setCanBeSelected(newBoard, index);
      if (!newBoard[i][j].selected) setWord(word + newBoard[i][j].letter);
      newBoard[i][j].selected = true;
      setBoard(newBoard);
      setMessage('');
    }
  };

  const clear = () => {
    fillBoard();
    setWord('');
    setMessage('');
  };

  useEffect(() => {
    fillBoard();
  }, []);

  if (!board)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </SafeAreaView>
    );

  const validWord = dictionary.words.includes(word.toLowerCase());
  const color = validWord ? Colors.green : Colors.red;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.secondaryText}>Clear word</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={clear} style={styles.clearButton}>
          <Text style={[styles.text, {color: '#FAFAFA'}]}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {board.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((tile, j) => (
              <TileButton
                key={j}
                letter={tile.letter}
                selected={tile.selected}
                canBeSelected={tile.canBeSelected}
                validWord={validWord}
                selectLetter={selectLetter}
                index={[i, j]}
              />
            ))}
          </View>
        ))}
      </View>
      {message !== '' && <Text style={styles.message}>{message}</Text>}
      <View style={styles.footer}>
        <Text style={[styles.text, {color}]}>{word}</Text>
        {word !== '' && <Text style={[styles.secondaryText, {color}]}>{validWord ? 'Valid' : 'Invalid'}</Text>}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '900',
    color: '#444444',
    letterSpacing: 4,
  },
  secondaryText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'gray',
  },
  message: {
    fontSize: 14,
    fontWeight: '300',
    color: '#444444',
    marginTop: '5%',
  },
  clearButton: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
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
