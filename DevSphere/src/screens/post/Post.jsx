import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';

const HackathonPost = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    hackathonlink: '',
    author: '',
    photo: null,
  });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleInputChange = (field, value) => {
    setForm({...form, [field]: value});
  };

  const handleDateChange = (field, event, selectedDate) => {
    setShowStartPicker(false);
    setShowEndPicker(false);
    if (selectedDate) {
      setForm({...form, [field]: selectedDate});
    }
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (!response.didCancel && response.assets) {
        setForm({...form, photo: response.assets[0].uri});
      }
    });
  };

  const handleSubmit = () => {
    console.log('Posting Data:', form);
    // Here you would send the data to your backend API
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Select Post Photo</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {form.photo ? (
          <Image source={{uri: form.photo}} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to upload a photo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleInputChange('title', text)}
        value={form.title}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleInputChange('description', text)}
        value={form.description}
        multiline
      />

      <Text style={styles.label}>Start Date</Text>
      <Button
        title="Pick Start Date"
        onPress={() => setShowStartPicker(true)}
      />
      {showStartPicker && (
        <DateTimePicker
          value={form.startDate}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange('startDate', e, date)}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <Button title="Pick End Date" onPress={() => setShowEndPicker(true)} />
      {showEndPicker && (
        <DateTimePicker
          value={form.endDate}
          mode="date"
          display="default"
          onChange={(e, date) => handleDateChange('endDate', e, date)}
        />
      )}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleInputChange('location', text)}
        value={form.location}
      />

      <Text style={styles.label}>Hackathon Link</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleInputChange('hackathonlink', text)}
        value={form.hackathonlink}
      />

      <Text style={styles.label}>Author</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => handleInputChange('author', text)}
        value={form.author}
      />

      <Button title="Post Hackathon" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#1E1F3D',
    flex: 1,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D2E4A',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: '#8D8DAA',
    fontSize: 16,
  },
};

export default HackathonPost;
