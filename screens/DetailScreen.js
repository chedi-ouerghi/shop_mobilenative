import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SharedElement } from 'react-navigation-shared-element';

const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  // Animation values
  const gradientValue = useRef(new Animated.Value(0)).current;
  const imageValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Function to start the gradient animation
  const startGradientAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientValue, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(gradientValue, {
          toValue: 0,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  // Function to animate the image to the cart
  const animateImageToCart = () => {
    Animated.parallel([
      Animated.timing(imageValue, {
        toValue: { x: 210, y: 350 },
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0.7,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      addToCart();
    });
  };

  const addToCart = async () => {
    try {
      // Check if the user is authenticated
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        alert('Please login to add items to cart');
        navigation.navigate('LoginScreen');
        return;
      }

      // Fake API call for adding item to cart
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        token,
        product,
      });

      if (response.status === 201) {
        // Update cart in AsyncStorage
        let cart = await AsyncStorage.getItem('cart');
        cart = cart ? JSON.parse(cart) : [];
        cart.push(product);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        const cartCount = cart.length;
        await AsyncStorage.setItem('cartCount', cartCount.toString());

        navigation.navigate('CartScreen');
      } else {
        alert('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    startGradientAnimation();
  }, []);

  const backgroundColor = gradientValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#b5c5d896', '#38516fc2'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.background,
          {
            backgroundColor,
          },
        ]}
      />
      <View style={styles.ViewImage}>
      <SharedElement id={`item.${product.id}.photo`}>
        <Animated.Image
          source={product.image} // Make sure this is a valid image source
          style={[
            styles.productImage,
            {
              transform: [
                { translateX: imageValue.x },
                { translateY: imageValue.y },
                { scale: scaleValue },
              ],
            },
          ]}
          resizeMode="cover"
        />
        </SharedElement>
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
          <Text style={styles.productDetail}>Size: {product.size.join(', ')}</Text>
          <Text style={styles.productDetail}>Material: {product.material}</Text>
          <TouchableOpacity onPress={animateImageToCart} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  ViewImage: {
    backgroundColor: '#5a718c',
    padding: 10,
    width: '98%',
    height:'40%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
      position: 'absolute',
    top: '-2.5%',
  left: '1%',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 16, // Added padding for the bottom
  },
  productImage: {
    width: '60%',
    height: '100%',
    alignSelf: 'center',
    
  },
  detailsContainer: {
    padding: 16,
    alignItems: 'center',
        position: 'absolute',
    top: '40%',
    left: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  width:'100%'
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  priceContainer: {
    marginTop: 16,
    padding: 8,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    width: '60%',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  productDetail: {
    fontSize: 16,
    marginTop: 8,
    color: '#333',
  },
  addButton: {
    marginTop: 24,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
