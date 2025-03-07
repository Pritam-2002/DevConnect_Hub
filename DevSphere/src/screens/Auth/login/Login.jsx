// <<<<<<< HEAD:DevSphere/src/screens/auth/login/Login.jsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
// import CheckBox from '@react-native-community/checkbox';
import {Checkbox} from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <LinearGradient colors={['#0077B5', '#005087']} style={styles.container}>
      <View style={styles.whiteBox}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          To keep connected with us please login with your personal info
        </Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="black"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rememberForgotContainer}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => {
              setRememberMe(!rememberMe);
            }}
            // style={styles.checkbox}
          />
          <Text style={styles.rememberText}>Remember me?</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    height: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  rememberText: {
    color: '#666',
  },
  forgotPasswordText: {
    color: '#005087',
    fontWeight: 'bold',
    marginLeft: '10', // Pushes it to the right
  },
  loginButton: {
    backgroundColor: '#005087',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

// import {ScrollView, StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const Login = () => {
//   return (
//     <ScrollView style={{backgroundColor: 'white', flex: 1}}>
//       <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 20}}>
//         Login
//       </Text>
//     </ScrollView>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({});
// >>>>>>> 64ddaeb0eb56db70c25a665c90823701240958c5:DevSphere/src/screens/Auth/login/Login.jsx
