import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '../contexts/AuthContext';
import ApiService from '../services/api';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { signIn } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: '', username: '', email: '', password: '' };

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    console.log('🚀 Starting registration process...');
    console.log('📝 Form Data:', {
      email,
      username,
      name,
      passwordLength: password.length,
    });

    if (validateForm()) {
      console.log('✅ Form validation passed');
      setIsLoading(true);
      try {
        console.log('📤 Sending registration request to API...');
        const response = await ApiService.register({
          email,
          password,
          username,
          name,
        });

        console.log('📥 Received API response:', {
          success: response.success,
          hasToken: !!response.token,
          hasUser: !!response.user,
          timestamp: new Date().toISOString(),
        });

        if (response.success && response.token) {
          console.log('✅ Registration successful, attempting sign in...');
          await signIn(email, password);
          console.log('🔄 Redirecting to home screen...');
        } else {
          console.error('❌ Registration failed:', {
            error: response.error,
            timestamp: new Date().toISOString(),
          });
          Alert.alert(
            'Registration Failed',
            response.error || 'Please try again with different credentials'
          );
        }
      } catch (error) {
        console.error('❌ Registration Error:', {
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          timestamp: new Date().toISOString(),
          stack: error instanceof Error ? error.stack : undefined,
          error: JSON.stringify(error, null, 2)
        });
        
        Alert.alert(
          'Registration Error',
          error instanceof Error ? error.message : 'An unexpected error occurred'
        );
      } finally {
        console.log('🏁 Registration process completed');
        setIsLoading(false);
      }
    } else {
      console.warn('❌ Form validation failed:', {
        errors,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Register</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Full Name"
        placeholderTextColor={colors.text}
        value={name}
        onChangeText={setName}
        editable={!isLoading}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Username"
        placeholderTextColor={colors.text}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!isLoading}
      />
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Email"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <View style={styles.passwordContainer}>
        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <TextInput
            style={[styles.passwordInput, { color: colors.text }]}
            placeholder="Password"
            placeholderTextColor={colors.text}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!isLoading}
          />
          <Pressable 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color={colors.text}
            />
          </Pressable>
        </View>
      </View>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint, opacity: isLoading ? 0.7 : 1 }]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Creating Account...' : 'Register'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')} disabled={isLoading}>
        <Text style={[styles.linkText, { color: colors.tint }]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  passwordContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },
  eyeIcon: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
