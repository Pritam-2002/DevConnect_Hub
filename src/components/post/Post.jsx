import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

const HackathonPostPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    hackathonlink: '',
    author: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (Object.values(form).some((field) => field === '')) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    
    console.log('Form Data:', form);
    Alert.alert('Success', 'Hackathon posted successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create a Hackathon Post</Text>
      
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
      
      <Button title="Submit" onPress={handleSubmit} />
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
    marginTop:50
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

// You can connect this form to your backend with an API call using fetch or axios! Let me know if you’d like me to add that part. 🚀
