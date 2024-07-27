import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = () => {
  const navigation = useNavigation();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      setCartCount(cartItems.length);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre d\'articles du panier:', error);
    }
  };

  useEffect(() => {
    fetchCartCount(); // Initial fetch

    const interval = setInterval(() => {
      fetchCartCount();
    }, 1000); // Rafraîchit toutes les secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle à la destruction du composant
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.iconContainer}>
        <Icon name="home" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ListProduct')} style={styles.iconContainer}>
        <Icon name="list" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.centerIconContainer}>
        <Icon name="user" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.iconContainer}>
        <View style={styles.cartContainer}>
          <Icon name="shopping-cart" size={24} color="#000" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: '10%',
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
