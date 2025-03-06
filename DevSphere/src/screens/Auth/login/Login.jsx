import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <ScrollView style={{backgroundColor: 'white', flex: 1}}>
      <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 20}}>
        Login
      </Text>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
