import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./src/components/home/Home"
import Post from "./src/components/post/Post"
import Chat from "./src/components/chat/Chat"
import Profile from "./src/components/profile/Profile"
import Icon from 'react-native-vector-icons/Ionicons';
// import { Home, Login, Chat, Create, Profile, Post } from '';
import Login from "./src/components/auth/login/Login"
import { View, StyleSheet, Text } from 'react-native';
// import { colors } from './utils/colors';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'Chat':
            iconName = 'chatbubble-outline';
            break;
          case 'Create':
            iconName = 'add-circle-outline';
            break;
          case 'Profile':
            iconName = 'person-outline';
            break;
          default:
            iconName = 'help-circle-outline';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#8D8DAA',
      tabBarStyle: {
        borderTopWidth: 0,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"blue",
       
        
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Chat" component={Chat} />
    <Tab.Screen name="Create" component={Post} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {isLogin ? <AppStack /> : <AuthStack />}
        <StatusBar style="auto"  />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F3D',
    width: '100%',
    height: '100%',
  },
});
