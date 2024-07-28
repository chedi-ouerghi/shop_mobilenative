import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity

  // Animation for the screen
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Call animation when component mounts
  React.useEffect(() => {
    fadeIn();
  }, []);

  const validateInputs = () => {
    let isValid = true;
    setCardNumberError('');
    setExpiryDateError('');
    setCvvError('');

    if (!cardNumber) {
      setCardNumberError('Card number is required');
      isValid = false;
    } else if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      setCardNumberError('Invalid card number');
      isValid = false;
    }

    if (!expiryDate) {
      setExpiryDateError('Expiry date is required');
      isValid = false;
    }

    if (!cvv) {
      setCvvError('CVV is required');
      isValid = false;
    } else if (cvv.length !== 3 || isNaN(cvv)) {
      setCvvError('Invalid CVV');
      isValid = false;
    }

    return isValid;
  };

  const handlePayment = async () => {
    if (validateInputs()) {
      try {
        // Process payment logic here

        // Clear cart data from local storage
        await AsyncStorage.removeItem('cart');

        // Display success alert
        Alert.alert(
          'Payment Successful',
          'Your payment was successful. We will contact you within 2 days.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        console.error('Failed to clear cart data:', error);
        Alert.alert('Error', 'An error occurred while processing your payment.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Payment Details</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: cardNumberError ? 'red' : '#ccc' }]}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            maxLength={16}
          />
          {cardNumberError ? <Text style={styles.errorText}>{cardNumberError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: expiryDateError ? 'red' : '#ccc' }]}
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
            maxLength={5}
            onBlur={() => {
              // Add space for formatting MM/YY
              if (expiryDate.length === 2 && !expiryDate.includes('/')) {
                setExpiryDate(expiryDate + '/');
              }
            }}
          />
          {expiryDateError ? <Text style={styles.errorText}>{expiryDateError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { borderColor: cvvError ? 'red' : '#ccc' }]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            maxLength={3}
          />
          {cvvError ? <Text style={styles.errorText}>{cvvError}</Text> : null}
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
