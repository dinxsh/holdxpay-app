import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useRouter } from 'expo-router';
import ApiService from '@/services/api';

export default function PasswordResetScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'email' | 'token'>('email');

  const handleRequestReset = async () => {
    try {
      await ApiService.requestPasswordReset(email);
      Alert.alert(
        'Success',
        'Please check your email for the reset token',
        [{ text: 'OK', onPress: () => setStep('token') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email');
    }
  };

  const handleResetPassword = async () => {
    try {
      await ApiService.resetPassword(token, newPassword);
      Alert.alert(
        'Success',
        'Password has been reset successfully',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to reset password');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {step === 'email' ? (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Enter your email to receive a reset token
          </Text>
          
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.background,
              color: colors.text,
            }]}
            placeholder="Enter your email"
            placeholderTextColor={colors.text + '80'}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleRequestReset}
          >
            <Text style={styles.buttonText}>Send Reset Token</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Enter Reset Token</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Enter the token received in your email and your new password
          </Text>
          
          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.background,
              color: colors.text,
            }]}
            placeholder="Enter reset token"
            placeholderTextColor={colors.text + '80'}
            value={token}
            onChangeText={setToken}
          />

          <TextInput
            style={[styles.input, { 
              backgroundColor: colors.background,
              color: colors.text,
            }]}
            placeholder="Enter new password"
            placeholderTextColor={colors.text + '80'}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleResetPassword}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.7,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
}); 