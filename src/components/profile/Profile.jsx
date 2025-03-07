import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

const ProfilePage = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      {/* Cover Image */}
      <View style={styles.coverContainer}>
        <Image
          style={styles.coverImage}
          source={{ uri: "https://source.unsplash.com/900x300/?technology" }}
        />
        <Text style={styles.learnRepeat}>Learn & Repeat</Text>
      </View>

      {/* Profile Image & Basic Info */}
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.title}>
          Software Engineer | React Native Developer
        </Text>
        <Text style={styles.location}>Kolkata, India</Text>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>
          Passionate software engineer specializing in mobile & web
          development...
        </Text>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.experienceItem}>
          <Text style={styles.jobTitle}>Senior Developer</Text>
          <Text style={styles.company}>Tech Corp</Text>
          <Text style={styles.jobDuration}>Jan 2020 - Present</Text>
          <Text style={styles.jobDescription}>
            Developing high-quality software solutions...
          </Text>
        </View>
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skills}>
          <Text style={styles.skill}>JavaScript</Text>
          <Text style={styles.skill}>React Native</Text>
          <Text style={styles.skill}>TypeScript</Text>
        </View>
      </View>

      {/* Achievements & Certifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements & Certifications</Text>
        <View style={styles.achievementItem}>
          <Text style={styles.achievementTitle}>
            Certified React Native Developer
          </Text>
          <Text style={styles.achievementOrg}>Udemy</Text>
          <Text style={styles.achievementDate}>Completed: March 2024</Text>
        </View>
        <View style={styles.achievementItem}>
          <Text style={styles.achievementTitle}>
            Winner - Code Sprint Hackathon
          </Text>
          <Text style={styles.achievementOrg}>HackFest 2023</Text>
          <Text style={styles.achievementDate}>Held: December 2023</Text>
        </View>
        <View style={styles.achievementItem}>
          <Text style={styles.achievementTitle}>
            JavaScript Mastery Certificate
          </Text>
          <Text style={styles.achievementOrg}>Coursera</Text>
          <Text style={styles.achievementDate}>Completed: January 2023</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  coverContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  learnRepeat: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 5,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: -50,
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  location: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  section: {
    padding: 15,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: "gray",
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  company: {
    fontSize: 16,
    color: "gray",
  },
  jobDuration: {
    fontSize: 14,
    color: "gray",
  },
  jobDescription: {
    fontSize: 16,
    color: "gray",
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    backgroundColor: "#0073b1",
    color: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  achievementItem: {
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  achievementOrg: {
    fontSize: 16,
    color: "gray",
  },
  achievementDate: {
    fontSize: 14,
    color: "gray",
  },
});

export default ProfilePage;
