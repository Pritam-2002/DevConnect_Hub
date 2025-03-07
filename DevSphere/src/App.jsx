import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Home, Login, Chat, Create, Profile} from './screens';
import {View, StyleSheet} from 'react-native';
import {colors} from './utils/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({color, size}) => {
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
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
      },
    })}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Chat" component={Home} />
    <Tab.Screen name="Create" component={Home} />
    <Tab.Screen name="Profile" component={Home} />
  </Tab.Navigator>
);

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {isLogin ? <AppStack /> : <AuthStack />}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1F3D',
  },
});

export default App;
