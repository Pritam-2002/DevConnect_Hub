import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoginScreen from './screens/auth/login/Login';

import {fonts} from './utils/fonts';
import SignupScreen from './screens/auth/signup/Signup';

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <LoginScreen /> */}
      <SignupScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
