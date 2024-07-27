import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,Linking } from 'react-native';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
     const handlePhonePress = () => {
    Linking.openURL('tel:+21612345678'); // Replace with your contact number
  };

  const handleSubmit = () => {
    // Display success message
    Alert.alert('Success', 'Your message has been sent successfully!');
    // Clear form fields
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
          <Text style={styles.header}>Contact Us</Text>
         
      <View style={styles.contactContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Send</Text>
              </TouchableOpacity>
              
          </View>
               <TouchableOpacity onPress={handlePhonePress} style={styles.contactButton}>
          <Text style={styles.contactText}>Call Us</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactContainer: {
    flexDirection: 'column',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Align text to the top in the textarea
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    },
    contactButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
        alignItems: 'center',
        justifyContent:'flex-end',
        width: '35%',
    marginTop:5
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ContactUs;
