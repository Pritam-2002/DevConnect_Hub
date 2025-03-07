import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../../utils/colors';

const BackgorundView = ({children}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>{children}</View>
  );
};

export default BackgorundView;

const styles = StyleSheet.create({});
