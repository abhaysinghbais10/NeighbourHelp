import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { Alert } from 'react-native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { updateUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // 1. Validation Logic
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // 2. Update User Context (Mock login)
    updateUser({ 
      name: name, 
      email: email 
    });

    // 3. Navigation
    Alert.alert('Success', 'Account created successfully!', [
      { text: 'Continue', onPress: () => navigation.navigate('MainTabs') }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.brandContainer}>
            <View style={styles.logoRow}>
              <View style={styles.logoIconContainer}>
                <Image 
                  source={require('../assets/logo.jpg')} 
                  style={styles.logoIcon} 
                  resizeMode="cover"
                />
              </View>
              <View style={styles.brandTextContainer}>
                <Text style={styles.brandTitle}>Phool Basket</Text>
                <Text style={styles.brandSubtitle}>GIFTS & FLOWERS</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>Create an account to start gifting!</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <User size={20} color="#757575" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={20} color="#757575" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={20} color="#757575" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} color="#757575" /> : <Eye size={20} color="#757575" />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 40 },
  header: { marginTop: 10, marginBottom: 20 },
  backButton: { padding: 10, marginLeft: -10 },
  brandContainer: { alignItems: 'center', marginBottom: 30 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  logoIconContainer: { width: 60, height: 60, borderRadius: 12, overflow: 'hidden', backgroundColor: '#f0f0f0', marginRight: 15 },
  logoIcon: { width: '100%', height: '100%' },
  brandTextContainer: { justifyContent: 'center' },
  brandTitle: { fontSize: 28, fontWeight: '900', color: '#6B38FB', lineHeight: 30 },
  brandSubtitle: { fontSize: 14, fontWeight: 'bold', color: '#00A651', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#757575', marginTop: 10, textAlign: 'center' },
  formContainer: { width: '100%' },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, backgroundColor: '#f9f9f9', paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, fontSize: 16, color: '#333' },
  eyeIcon: { padding: 10 },
  registerButton: { backgroundColor: '#D32F2F', borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 10, elevation: 5 },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  loginText: { color: '#757575', fontSize: 14 },
  loginLink: { color: '#D32F2F', fontSize: 14, fontWeight: 'bold' },
});

export default RegisterScreen;
