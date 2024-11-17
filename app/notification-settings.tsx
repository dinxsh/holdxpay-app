import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  type: 'email' | 'push' | 'sms';
  enabled: boolean;
}

export default function NotificationSettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'Payment Received',
      description: 'Get notified when you receive a payment',
      type: 'push',
      enabled: true,
    },
    {
      id: '2',
      title: 'New Message',
      description: 'Get notified when you receive a new message',
      type: 'push',
      enabled: true,
    },
    {
      id: '3',
      title: 'Transaction Updates',
      description: 'Get notified about your transaction status changes',
      type: 'email',
      enabled: true,
    },
    {
      id: '4',
      title: 'Security Alerts',
      description: 'Get notified about important security updates',
      type: 'email',
      enabled: true,
    },
    {
      id: '5',
      title: 'Marketing Updates',
      description: 'Receive updates about new features and promotions',
      type: 'email',
      enabled: false,
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'push':
        return 'bell';
      case 'email':
        return 'envelope';
      case 'sms':
        return 'comment';
      default:
        return 'bell';
    }
  };

  const toggleSetting = (id: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          {settings.map((setting) => (
            <View 
              key={setting.id}
              style={[
                styles.settingRow,
                { borderBottomColor: colors.border + '20' }
              ]}
            >
              <View style={styles.settingIcon}>
                <FontAwesome 
                  name={getTypeIcon(setting.type)} 
                  size={16} 
                  color={colors.tint}
                />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  {setting.title}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.text }]}>
                  {setting.description}
                </Text>
                <View style={styles.settingType}>
                  <Text style={[styles.settingTypeText, { color: colors.text }]}>
                    via {setting.type.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Switch
                value={setting.enabled}
                onValueChange={() => toggleSetting(setting.id)}
                trackColor={{ false: colors.border, true: colors.tint + '50' }}
                thumbColor={setting.enabled ? colors.tint : '#f4f3f4'}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    opacity: 0.7,
    marginBottom: 6,
  },
  settingType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTypeText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    opacity: 0.5,
  },
}); 