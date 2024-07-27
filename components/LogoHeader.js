// components/LogoHeader.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const LogoHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: 'https://i.pinimg.com/236x/f6/d0/af/f6d0af482a5a1116dbbd2fd3ff95e58c.jpg' }} // Remplacez par l'URL de votre image
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row', 
    padding: 10,
    backgroundColor: '#fff', // Couleur de fond de l'en-tête
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Couleur de la bordure inférieure
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain', // Assurez-vous que le logo est bien dimensionné
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default LogoHeader;
