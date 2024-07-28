import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      let cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      // Ajoutez une quantité par défaut de 1 si elle n'est pas définie
      const updatedCartItems = cartItems.map(item => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCart(updatedCartItems);
      calculateTotal(updatedCartItems);
    };
    fetchCart();
  }, []);

  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    setTotal(totalAmount);
  };

  const applyPromoCode = () => {
    alert('Promo code applied: ' + promoCode);
  };

  const deleteItem = async (itemToDelete) => {
    const updatedCart = cart.filter(item => item.id !== itemToDelete.id);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const updateQuantity = async (item, delta) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        const newQuantity = cartItem.quantity + delta;
        if (newQuantity > 0) {
          return { ...cartItem, quantity: newQuantity };
        }
      }
      return cartItem;
    });
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item, -1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item, 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item)} style={styles.deleteButton}>
        <Image source={{ uri: 'https://i.pinimg.com/236x/f6/d0/af/f6d0af482a5a1116dbbd2fd3ff95e58c.jpg' }} style={styles.deleteIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteItem(item)} style={styles.deleteProductButton}>
        <Text style={styles.deleteProductButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomNavbar cartCount={cart.length} />

      {cart.length === 0 ? (
        <Text style={styles.emptyCartMessage}>No products in the cart</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()} // Assurez-vous que chaque item a un id unique
          renderItem={renderCartItem}
          style={styles.cartList}
        />
      )}
      
      <View style={styles.promoContainer}>
        <TextInput
          style={styles.promoInput}
          placeholder="Enter promo code"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity style={styles.applyButton} onPress={applyPromoCode}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <Text style={styles.discountText}>Discount: -0.00</Text>
        <Text style={styles.finalText}>Final Total: ${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('PaymentScreen')}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomNavbar = ({ cartCount }) => {
  return (
    <SafeAreaView style={navbarStyles.container}>
      <View style={navbarStyles.content}>
        <Text style={navbarStyles.title}>Cart</Text>
        <View style={navbarStyles.cartContainer}>
          <Image source={{ uri: 'https://i.pinimg.com/236x/f6/d0/af/f6d0af482a5a1116dbbd2fd3ff95e58c.jpg' }} style={navbarStyles.cartIcon} />
          <Text style={navbarStyles.cartCount}>{cartCount}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 60,
  },
  cartList: {
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
  promoContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
  },
  totalCard: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  finalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyCartMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 50,
  },
});

const navbarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  cartCount: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
