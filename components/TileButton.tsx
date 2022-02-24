import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../colors';

interface Props {
  letter: string;
  selectLetter: (index: number[]) => void;
  index: number[];
  selected: boolean;
  canBeSelected: boolean;
  validWord: boolean;
}

export const TileButton: FC<Props> = ({letter, index, selectLetter, selected, validWord, canBeSelected}) => {
  let gradientColors = selected ? [Colors.green, Colors.greenDark] : [Colors.yellow, Colors.orange];
  let borderWidth = selected ? 0 : 3;
  let borderColor = canBeSelected ? Colors.blue : Colors.red;
  if (selected && !validWord) gradientColors = [Colors.red, Colors.redDark];
  const onPress = () => selectLetter(index);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.tile]}>
      <LinearGradient colors={gradientColors} style={[styles.linearGradient, {borderWidth, borderColor}]}>
        <Text style={[styles.text, styles.textShadow]}>{letter}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    overflow: 'hidden',
    borderRadius: 6,
    width: 60,
    height: 60,
    margin: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 4,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
