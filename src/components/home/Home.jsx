import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar,Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HACKATHON_DATA } from '../../../constants/user';

// Sample hackathon data
// const HACKATHON_DATA = [
//   {
//     id: '1',
//     title: 'TechCrunch Disrupt',
//     description: 'Join the world\'s leading tech hackathon with $50,000 in prizes',
//     date: 'May 15-17, 2025',
//     location: 'San Francisco, CA',
//     image: 'data:image/jpeg;base64,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',
//     tags: ['AI', 'Blockchain', 'Web3'],
//     registrationOpen: true,
//   },
//   {
//     id: '2',
//     title: 'HackMIT',
//     description: 'MIT\'s premier hackathon for students around the globe',
//     date: 'June 5-7, 2025',
//     location: 'Cambridge, MA',
//     image: 'https://www.giet.edu/wp-content/uploads/2024/08/Department-Banner-6-X-8-min.jpg',
//     tags: ['Machine Learning', 'IoT', 'FinTech'],
//     registrationOpen: true,
//   },
//   {
//     id: '3',
//     title: 'EU Hackathon',
//     description: 'European Commission\'s annual coding marathon',
//     date: 'July 20-22, 2025',
//     location: 'Berlin, Germany',
//     image: 'https://media.istockphoto.com/id/1125107251/vector/hackathon-background-hack-marathon-coding-event-glitch-poster-and-saturated-binary-data-code.jpg?s=612x612&w=0&k=20&c=aqnvlYk_4_8qIQi8bUbg6LQeNBBl8c-FyuSPyXCNgro=',
//     tags: ['GovTech', 'CleanTech', 'HealthTech'],
//     registrationOpen: false,
//   },
//   {
//     id: '4',
//     title: 'Hack the North',
//     description: 'Canada\'s biggest hackathon with 1000+ participants',
//     date: 'August 12-14, 2025',
//     location: 'Toronto, Canada',
//     image: 'https://cdn.dribbble.com/users/2140049/screenshots/6612096/untitled-1_4x.jpg',
//     tags: ['AR/VR', 'Cloud Computing', 'DevOps'],
//     registrationOpen: true,
//   },
//   {
//     id: '5',
//     title: 'Tokyo Tech Fest',
//     description: 'Asia\'s premier technology hackathon',
//     date: 'September 8-10, 2025',
//     location: 'Tokyo, Japan',
//     image: 'https://www.dsci.in/files/content/page/2023/hackathon2021-banner.jpg',
//     tags: ['Robotics', 'Smart Cities', '5G'],
//     registrationOpen: true,
//   },
// ];

export default function HomePage() {
  const [notificationCount, setNotificationCount] = useState(3);

  const renderHackathonCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={()=>Linking.openURL("https://www.sih.gov.in/")}>
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
      <StatusBar barStyle="dark-content"  />
      
      <View style={styles.header}>
      <Text style={styles.appName}>DevSphere</Text>
      <TouchableOpacity style={styles.contactButton} onPress={()=>{
        console.log("contact pressed")
      }}>
        <Ionicons name="mail" size={24} color="black" />
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
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
 marginTop:30,
    backgroundColor: '#f0f0f0', // Adjust background color
    borderBottomWidth:1,
    borderBottomColor: 'lightgrey',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactButton: {
    padding: 8, // Add padding for touch target
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
    paddingVertical:10,
    marginTop:10
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