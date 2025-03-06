import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Login} from './screens/auth/login/Login';
// import {fonts} from './utils/fonts';
// import {LoginScreen} from './main/auth/login';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Login />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
