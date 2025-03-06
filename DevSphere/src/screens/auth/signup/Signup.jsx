import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [expertise, setExpertise] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (!response.didCancel && response.assets) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <LinearGradient colors={['#0077B5', '#005087']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.whiteBox}>
          <Text style={styles.title}>Sign Up</Text>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {photo ? (
              <Image source={{uri: photo}} style={styles.profileImage} />
            ) : (
              <MaterialCommunityIcons name="camera" size={40} color="gray" />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="black"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="black"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Expertise (e.g. UI/UX, React)"
            placeholderTextColor="black"
            value={expertise}
            onChangeText={setExpertise}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={!showPassword}
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
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profileImage: {width: 100, height: 100, borderRadius: 50},
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 15,
    width: '100%',
  },
  inputField: {flex: 1, color: 'black'},
  signupButton: {
    backgroundColor: '#005087',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  signupButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});

export default SignupScreen;
