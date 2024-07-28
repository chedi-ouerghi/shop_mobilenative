// AppNavigator.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import ListProduct from '../screens/ListProduct';
import ListProductBrand from '../screens/ListProductBrand';
import Header from '../components/Header';
import CustomHeader from '../components/Header';
import LogoHeader from '../components/LogoHeader';
import AddProductScreen from '../screens/AddProductScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentScreen from '../screens/PaymentScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <LogoHeader /> 
<Stack.Navigator
          // initialRouteName="HomeScreen"
          initialRouteName="LoginScreen"
  screenOptions={({ route }) => ({
    headerShown: true,
    header: () => <CustomHeader />,
  })}
        >
                    <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
  <Stack.Screen name="HomeScreen" component={HomeScreen} />
  <Stack.Screen name="ListProduct" component={ListProduct} />
  <Stack.Screen name="DetailScreen" component={DetailScreen} />
  <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="ListProductBrand" component={ListProductBrand} /> 
          <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> 
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
</Stack.Navigator>

        <Header /> 
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Ensure the Header is at the bottom
  },
});

export default AppNavigator;
