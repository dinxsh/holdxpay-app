import React from 'react';
import { Stack, useRouter, usePathname, useNavigation } from 'expo-router';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useFonts, 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import Logo from './components/svgLogo';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function ProfileIcon({ color, onPress }: { color: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.profileIconContainer}>
      <FontAwesome name="user-circle" size={30} color={color} />
    </TouchableOpacity>
  );
}

// Create a new HeaderRight component
function HeaderRight({ colors, router }: { colors: any; router: any }) {
  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity 
        style={styles.headerIcon}
        onPress={() => console.log('Settings pressed')}
      >
        <FontAwesome 
          name="cog" 
          size={20} 
          color={colors.text + '80'}
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.headerIcon}
        onPress={() => router.push('/profile-details')}
      >
        <FontAwesome 
          name="user-circle" 
          size={22} 
          color={colors.text + '80'}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const pathname = usePathname();

  const getHeaderTitle = () => {
    if (pathname.startsWith('/chat/')) {
      return '';
    }

    if (pathname === '/profile-details') {
      return 'Profile';
    }

    if (pathname === '/(tabs)' || pathname === '/(tabs)/index') {
      return () => <Logo width={45} height={45} />;
    }

    if (pathname === '/(tabs)/chats') {
      return 'Chats';
    }

    if (pathname === '/(tabs)/profile') {
      return 'Profile';
    }

    if (pathname === '/login' || pathname === '/register') {
      return '';
    }

    return () => <Logo width={40} height={40} />;
  };

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.tint + '20',
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontFamily: 'Inter_600SemiBold',
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#161c24',
          },
          headerBackVisible: !pathname.startsWith('/(tabs)'),
          headerRight: pathname === '/(tabs)' ? 
            () => <HeaderRight colors={colors} router={router} />
            : undefined,
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerTitle: getHeaderTitle(),
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="profile-details" 
          options={{ 
            headerTitle: 'Profile',
            headerShown: true,
            presentation: 'card',
          }} 
        />
        <Stack.Screen 
          name="chat/[id]"
          options={{ 
            headerShown: true,
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="password-reset"
          options={{ 
            headerTitle: 'Reset Password',
            presentation: 'card',
          }}
        />
        <Stack.Screen 
          name="notification-settings"
          options={{ 
            headerTitle: 'Notifications',
            presentation: 'card',
          }}
        />
        <Stack.Screen 
          name="privacy-policy"
          options={{ 
            headerTitle: 'Privacy Policy',
            presentation: 'card',
          }}
        />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  profileIconContainer: {
    padding: 15,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 16,
  },
  headerIcon: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
