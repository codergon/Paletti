import React from 'react';
import {Plus} from 'phosphor-react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type NewColorButtonProps = {
  openColorModal: () => void;
};

const NewColorButton = ({openColorModal}: NewColorButtonProps) => {
  const insets = useSafeAreaInsets();
  const openAddColor = () => openColorModal();

  return (
    <TouchableOpacity
      onPress={openAddColor}
      style={[
        styles.btn,
        {
          bottom: insets.bottom + 50,
        },
      ]}>
      <Plus size={22} color="#fff" weight="bold" />
    </TouchableOpacity>
  );
};

export default NewColorButton;

const styles = StyleSheet.create({
  btn: {
    right: 30,
    bottom: 0,
    width: 54,
    height: 54,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
});
