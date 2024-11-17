import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import ApiService, { UserProfile } from '../services/api';

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (userData: Partial<UserProfile>) => Promise<void>;
  isLoading: boolean;
  isLoggedIn: boolean;
  user: UserProfile | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

// This hook can be used to access the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === '(auth)';
      const inTabsGroup = segments[0] === '(tabs)';
      
      if (isLoggedIn && (segments[0] === 'login' || segments[0] === 'register')) {
        // If logged in and trying to access auth screens, redirect to home
        router.replace('/(tabs)');
      } else if (!isLoggedIn && inTabsGroup) {
        // If not logged in and trying to access protected screens, redirect to login
        router.replace('/login');
      }
    }
  }, [isLoading, isLoggedIn, segments]);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const userProfile = await ApiService.getUserProfile();
        setUser(userProfile);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      await signOut();
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await ApiService.login(email, password);
      if (response.success && response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        setUser(response.user || null);
        setIsLoggedIn(true);
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateProfile = async (userData: Partial<UserProfile>) => {
    try {
      const updatedUser = await ApiService.updateUserProfile(userData);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, updateProfile, isLoading, isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
