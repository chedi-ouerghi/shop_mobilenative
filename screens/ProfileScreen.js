import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [username, setUsername] = useState('');
      const navigation = useNavigation();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          // Assume the username is stored in AsyncStorage after login
          const storedUsername = await AsyncStorage.getItem('username');
          setUsername(storedUsername || 'User');
        }
      } catch (error) {
        console.error('Error retrieving user information:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Our Site</Text>
              <Icon name="user" size={100} color="#000" style={styles.icon} />

          <Text style={styles.username}>{username}</Text>
             <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
      <Text style={styles.textoin}>join US</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light gray background for a modern look
    padding: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Dark gray color for text
    marginBottom: 20,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
 // Light border color for the icon
    marginBottom: 20,
      alignItems: 'center',
      position: 'relative',
    left:'7%'  // White background for better contrast
    },
  iconContainer: { alignItems: 'center', position: 'relative', left:'0%',backgroundColor:'#000' ,    padding: 15,
    borderRadius: 12,},
  username: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333', // Dark gray color for text
    },
  textoin: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
});

export default ProfileScreen;
