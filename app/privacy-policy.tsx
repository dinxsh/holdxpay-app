import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function PrivacyPolicyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
          <Text style={[styles.lastUpdated, { color: colors.text }]}>
            Last updated: March 20, 2024
          </Text>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              1. Information We Collect
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              We collect information that you provide directly to us, including your name, email address, 
              and any other information you choose to provide. We also automatically collect certain 
              information about your device when you use our services.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              2. How We Use Your Information
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              We use the information we collect to provide, maintain, and improve our services, 
              to process your transactions, communicate with you, and comply with legal obligations.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              3. Information Sharing
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              We do not share your personal information with third parties except as described in this 
              privacy policy. We may share your information with service providers who assist us in 
              providing our services.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              4. Security
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              We take reasonable measures to help protect your personal information from loss, theft, 
              misuse, unauthorized access, disclosure, alteration, and destruction.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              5. Your Rights
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              You have the right to access, update, or delete your personal information. You can 
              exercise these rights by contacting us through the support channels provided in the app.
            </Text>
          </View>

          <View style={[styles.section, { borderBottomWidth: 0 }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              6. Contact Us
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              If you have any questions about this Privacy Policy, please contact us at 
              privacy@holdxplay.com
            </Text>
          </View>
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
    padding: 20,
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
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
    marginBottom: 24,
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    opacity: 0.8,
  },
}); 