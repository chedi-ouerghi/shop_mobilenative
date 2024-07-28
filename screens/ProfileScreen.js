import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const storedUsername = await AsyncStorage.getItem('username');
          setUsername(storedUsername || 'User');
          setEmail('');
          setTitle('');
          setLocation('');
        }
      } catch (error) {
        console.error('Error retrieving user information:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('username', username);
      // Vous pouvez également sauvegarder les autres informations ici
      setIsEditing(false);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error saving user information:', error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'file:///mnt/data/78bcca52e99e9d7ab76eea405581e454.jpg' }} // Changez ceci par l'URI de votre image
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon} onPress={() => setIsEditing(true)}>
          <Text style={styles.editIconText}>✏️</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.profileLabel}>PROFILE PHOTO</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>NAME</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          ) : (
            <Text style={styles.infoValue}>{username}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>EMAIL</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          ) : (
            <Text style={styles.infoValue}>{email || `${username}@example.com`}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>TITLE</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
          ) : (
            <Text style={styles.infoValue}>{title || 'Principal Product Designer'}</Text>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>LOCATION</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
          ) : (
            <Text style={styles.infoValue}>{location || 'San Francisco, CA'}</Text>
          )}
        </View>
        </View>
      {isEditing && (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
        </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom:50
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  editIconText: {
    fontSize: 18,
    color: '#007BFF',
  },
  profileLabel: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoLabel: {
    color: '#888',
  },
  infoValue: {
    color: '#000',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 5,
    width: '50%',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
