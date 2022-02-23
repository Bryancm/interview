import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../colors';
interface Props {
  letter: string;
  selectLetter: (index: Array<number>) => void;
  index: Array<number>;
  selected: boolean;
  canBeSelected: boolean;
  validWord: boolean;
}

export const TileButton: FC<Props> = ({letter, index, selectLetter, selected, validWord, canBeSelected}) => {
  let backgroundColor = selected ? Colors.green : Colors.orange;
  let borderWidth = selected ? 0 : 3;
  let borderColor = canBeSelected ? Colors.blue : Colors.red;
  if (selected && !validWord) backgroundColor = Colors.red;
  const onPress = () => selectLetter(index);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.tile, {backgroundColor, borderWidth, borderColor}]}>
      <Text style={[styles.text, styles.textShadow]}>{letter}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    color: '#FFFFFF',
    borderRadius: 8,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
});
