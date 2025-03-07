import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample connected users data
const CONNECTED_USERS = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'https://via.placeholder.com/150',
    online: true,
    lastSeen: 'now'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://via.placeholder.com/150',
    online: true,
    lastSeen: 'now'
  },
  {
    id: '3',
    name: 'Michael Brown',
    avatar: 'https://via.placeholder.com/150',
    online: false,
    lastSeen: '2 hours ago'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://via.placeholder.com/150',
    online: true,
    lastSeen: 'now'
  },
  {
    id: '5',
    name: 'Alex Garcia',
    avatar: 'https://via.placeholder.com/150',
    online: false,
    lastSeen: '15 minutes ago'
  }
];

// Sample message data
const INITIAL_MESSAGES = [
  {
    id: '1',
    text: 'Hey everyone! How\'s the hackathon project going?',
    sender: '1',
    timestamp: '10:35 AM',
    read: true
  },
  {
    id: '2',
    text: 'We\'re making good progress on the frontend!',
    sender: '2',
    timestamp: '10:37 AM',
    read: true
  },
  {
    id: '3',
    text: 'I\'m still working on the API integration. Should be done in about an hour.',
    sender: '3',
    timestamp: '10:40 AM',
    read: true
  },
  {
    id: '4',
    text: 'Great! I\'ve finished the database schema and working on user authentication now.',
    sender: '4',
    timestamp: '10:42 AM',
    read: true
  },
  {
    id: '5',
    text: 'I need some help with the deployment setup if anyone has time.',
    sender: '5',
    timestamp: '10:45 AM',
    read: false
  }
];

// Current user ID (in a real app, this would come from authentication)
const CURRENT_USER_ID = '1';

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(CONNECTED_USERS);
  const flatListRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Send message function
  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: CURRENT_USER_ID,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  // Find user by ID
  const getUserById = (userId) => {
    return connectedUsers.find(user => user.id === userId);
  };

  // Check if message is from current user
  const isCurrentUser = (userId) => {
    return userId === CURRENT_USER_ID;
  };

  // Render message item
  const renderMessage = ({ item }) => {
    const user = getUserById(item.sender);
    const isOwnMessage = isCurrentUser(item.sender);
    
    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer
      ]}>
        {!isOwnMessage && (
          <Image source={{ uri: user.avatar }} style={styles.messageAvatar} />
        )}
        <View style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble
        ]}>
          {!isOwnMessage && (
            <Text style={styles.messageSender}>{user.name}</Text>
          )}
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  // Render connected user
  const renderConnectedUser = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.userAvatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
        <View style={[
          styles.userStatus,
          { backgroundColor: item.online ? '#4CAF50' : '#9E9E9E' }
        ]} />
      </View>
      <Text style={styles.userName} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Team Chat</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      {/* Connected Users */}
      <View style={styles.connectedUsersContainer}>
        <FlatList
          data={connectedUsers}
          renderItem={renderConnectedUser}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.connectedUsersList}
        />
      </View>
      
      {/* Messages */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          onLayout={() => flatListRef.current?.scrollToEnd()}
        />
        
        {/* Input area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              inputText.trim() === '' ? styles.sendButtonDisabled : {}
            ]}
            onPress={sendMessage}
            disabled={inputText.trim() === ''}
          >
            <Ionicons name="send" size={20} color={inputText.trim() === '' ? '#9E9E9E' : '#fff'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop:60
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerButton: {
    padding: 5,
  },
  connectedUsersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  connectedUsersList: {
    paddingHorizontal: 16,
  },
  userItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 60,
  },
  userAvatarContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userStatus: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: 0,
  },
  userName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    width: '100%',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
    marginTop:20
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  ownMessageBubble: {
    backgroundColor: '#DCF8C6',
  },
  otherMessageBubble: {
    backgroundColor: '#fff',
  },
  messageSender: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  messageTimestamp: {
    fontSize: 11,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
});