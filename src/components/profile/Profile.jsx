import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample hackathon data
const HACKATHON_DATA = [
  {
    id: '1',
    title: 'TechCrunch Disrupt',
    description: 'Join the world\'s leading tech hackathon with $50,000 in prizes',
    date: 'May 15-17, 2025',
    location: 'San Francisco, CA',
    image: 'https://via.placeholder.com/150',
    tags: ['AI', 'Blockchain', 'Web3'],
    registrationOpen: true,
  },
  {
    id: '2',
    title: 'HackMIT',
    description: 'MIT\'s premier hackathon for students around the globe',
    date: 'June 5-7, 2025',
    location: 'Cambridge, MA',
    image: 'https://via.placeholder.com/150',
    tags: ['Machine Learning', 'IoT', 'FinTech'],
    registrationOpen: true,
  },
  {
    id: '3',
    title: 'EU Hackathon',
    description: 'European Commission\'s annual coding marathon',
    date: 'July 20-22, 2025',
    location: 'Berlin, Germany',
    image: 'https://via.placeholder.com/150',
    tags: ['GovTech', 'CleanTech', 'HealthTech'],
    registrationOpen: false,
  },
  {
    id: '4',
    title: 'Hack the North',
    description: 'Canada\'s biggest hackathon with 1000+ participants',
    date: 'August 12-14, 2025',
    location: 'Toronto, Canada',
    image: 'https://via.placeholder.com/150',
    tags: ['AR/VR', 'Cloud Computing', 'DevOps'],
    registrationOpen: true,
  },
  {
    id: '5',
    title: 'Tokyo Tech Fest',
    description: 'Asia\'s premier technology hackathon',
    date: 'September 8-10, 2025',
    location: 'Tokyo, Japan',
    image: 'https://via.placeholder.com/150',
    tags: ['Robotics', 'Smart Cities', '5G'],
    registrationOpen: true,
  },
];

export default function HomePage() {
  const [notificationCount, setNotificationCount] = useState(3);

  const renderHackathonCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.cardDetails}>
          <View style={styles.cardDetailItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.cardDetailText}>{item.location}</Text>
          </View>
          <View style={styles.cardDetailItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.cardDetailText}>{item.date}</Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={[
          styles.registrationBadge, 
          { backgroundColor: item.registrationOpen ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.registrationText}>
            {item.registrationOpen ? 'Registration Open' : 'Registration Closed'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150x50' }} 
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={28} color="#333" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      {/* Title section */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Hackathons</Text>
        <Text style={styles.subtitle}>Discover upcoming coding competitions</Text>
      </View>
      
      {/* Hackathon Cards */}
      <FlatList
        data={HACKATHON_DATA}
        renderItem={renderHackathonCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logo: {
    width: 150,
    height: 40,
  },
  notificationButton: {
    position: 'relative',
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  cardsList: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  cardDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tagBadge: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  registrationBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  registrationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});