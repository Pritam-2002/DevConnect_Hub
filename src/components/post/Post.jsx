import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { writeAsStringAsync, documentDirectory } from 'expo-file-system';

const HackathonPostPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    hackathonlink: '',
    author: '',
    image: null,
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    if (Object.values(form).some((field) => field === '' || field === null)) {
      Alert.alert('Error', 'Please fill out all fields and add an image.');
      return;
    }

    try {
      const fileUri = documentDirectory + 'user.js';
      await writeAsStringAsync(fileUri, JSON.stringify(form, null, 2));
      setForm({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        hackathonlink: '',
        author: '',
        image: null,
      })
      Alert.alert('Success', 'Hackathon posted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create a Hackathon Post</Text>
      
      <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
        {form.image ? (
          <Image source={{ uri: form.image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Drop your image here, or <Text style={styles.browseText}>browse</Text></Text>
            <Text style={styles.supportText}>Supports: JPG, JPEG2000, PNG</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {['title', 'description', 'startDate', 'endDate', 'location', 'hackathonlink', 'author'].map((field) => (
        <View key={field} style={styles.inputContainer}>
          <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${field}`}
            value={form[field]}
            onChangeText={(value) => handleChange(field, value)}
          />
        </View>
      ))}
<View style={{marginBottom:30}}>
<Button title="Submit" onPress={handleSubmit} />
</View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  imageUploadContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
  browseText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  supportText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default HackathonPostPage;
