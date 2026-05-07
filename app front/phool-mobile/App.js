/**
 * PHOOL BASKET - MAIN APPLICATION ENTRY POINT
 * 
 * STRUCTURE:
 * ARCHITECTURE:
 * 1. Global Context Providers (Cart, User, Favorites, etc.)
 * 2. React Navigation Stack
 * 3. Modular Screen Organization
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// --- 1. CONTEXT IMPORTS ---
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { UserProvider } from './context/UserContext';
import { PaymentProvider } from './context/PaymentContext';
import { AddressProvider } from './context/AddressContext';

// --- 2. SCREEN IMPORTS ---
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainTabNavigator from './navigation/MainTabNavigator';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ProductListScreen from './screens/ProductListScreen'; // Use this for category products
import SearchScreen from './screens/SearchScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import AddressesScreen from './screens/AddressesScreen';
import AddAddressScreen from './screens/AddAddressScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import AddCardScreen from './screens/AddCardScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import SellerDashboardScreen from './screens/SellerDashboardScreen';
import AddProductScreen from './screens/AddProductScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      {/* 3. WRAPPING ALL CONTEXT PROVIDERS */}
      <UserProvider>
        <CartProvider>
          <FavoritesProvider>
            <PaymentProvider>
              <AddressProvider>
                <NavigationContainer>
                  <Stack.Navigator 
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                  >
                    {/* 4. AUTHENTICATION FLOW */}
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    
                    {/* 5. MAIN APPLICATION (Tabs) */}
                    <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                    
                    {/* 6. SHOPPING & PRODUCT FLOW */}
                    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
                    <Stack.Screen name="ProductList" component={ProductListScreen} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="Checkout" component={CheckoutScreen} />
                    <Stack.Screen name="CategoryProducts" component={ProductListScreen} />
                    <Stack.Screen name="Search" component={SearchScreen} />
                    <Stack.Screen name="OrderSuccess" component={OrdersScreen} />
                    <Stack.Screen name="Orders" component={OrdersScreen} />
                    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
                    
                    {/* 7. USER PROFILE & SETTINGS */}
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                    <Stack.Screen name="Addresses" component={AddressesScreen} />
                    <Stack.Screen name="AddAddress" component={AddAddressScreen} />
                    <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
                    <Stack.Screen name="AddCard" component={AddCardScreen} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen} />
                    <Stack.Screen name="Favorites" component={FavoritesScreen} />

                    {/* 8. SELLER TOOLS */}
                    <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
                    <Stack.Screen name="AddProduct" component={AddProductScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </AddressProvider>
            </PaymentProvider>
          </FavoritesProvider>
        </CartProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
