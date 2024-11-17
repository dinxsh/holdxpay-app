import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  joinDate: string;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  from: {
    name: string;
    date: string;
  };
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { signOut } = useAuth();
  const router = useRouter();

  // Sample user data - replace with actual user data
  const userProfile: UserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    role: 'Developer',
    joinDate: '2024-01-01',
  };

  // Add sample reviews data
  const reviews: Review[] = [
    {
      _id: '1',
      rating: 5,
      comment: 'Excellent work and great communication!',
      from: {
        name: 'Sarah Johnson',
        date: '2024-03-15',
      },
    },
    {
      _id: '2',
      rating: 5,
      comment: 'Very professional and delivered on time.',
      from: {
        name: 'Michael Brown',
        date: '2024-03-10',
      },
    },
    {
      _id: '3',
      rating: 4,
      comment: 'Good experience working together.',
      from: {
        name: 'Emily Davis',
        date: '2024-03-05',
      },
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name="star"
        size={14}
        color={index < rating ? '#FFC107' : colors.text + '20'}
        style={{ marginRight: 2 }}
      />
    ));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Profile Info</Text>
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: colors.tint }]}
              onPress={() => console.log('Edit profile')}
            >
              <FontAwesome name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <View 
              style={[
                styles.avatar, 
                { backgroundColor: colors.tint + '20' }
              ]}
            >
              <Text style={[styles.avatarText, { color: colors.tint }]}>
                {userProfile.firstName[0].toUpperCase()}
                {userProfile.lastName[0].toUpperCase()}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text }]}>Name</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {`${userProfile.firstName} ${userProfile.lastName}`}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text }]}>Username</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  @{userProfile.username}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text }]}>Email</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {userProfile.email}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text }]}>Role</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {userProfile.role}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.text }]}>Member Since</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {new Date(userProfile.joinDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Settings Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Account Settings</Text>
          </View>

          <TouchableOpacity 
            style={styles.settingRow}
            onPress={() => router.push('/password-reset')}
          >
            <View style={styles.settingInfo}>
              <FontAwesome name="lock" size={16} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Change Password</Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color={colors.text + '80'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingRow}
            onPress={() => router.push('/notification-settings')}
          >
            <View style={styles.settingInfo}>
              <FontAwesome name="bell" size={16} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color={colors.text + '80'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingRow, { borderBottomWidth: 0 }]}
            onPress={() => router.push('/privacy-policy')}
          >
            <View style={styles.settingInfo}>
              <FontAwesome name="shield" size={16} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>Privacy</Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color={colors.text + '80'} />
          </TouchableOpacity>
        </View>

        {/* Reviews Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Reviews</Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.ratingText, { color: colors.text }]}>4.8</Text>
              <View style={styles.starsContainer}>
                {renderStars(5)}
              </View>
            </View>
          </View>

          {reviews.map((review) => (
            <View 
              key={review._id}
              style={[styles.reviewItem, { borderBottomColor: colors.border + '20' }]}
            >
              <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                  <Text style={[styles.reviewerName, { color: colors.text }]}>
                    {review.from.name}
                  </Text>
                  <Text style={[styles.reviewDate, { color: colors.text }]}>
                    {new Date(review.from.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.starsContainer}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={[styles.reviewComment, { color: colors.text }]}>
                {review.comment}
              </Text>
            </View>
          ))}
        </View>

        {/* Additional Info Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Additional Information</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>Time Zone</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>UTC+00:00</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>Language</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>English</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>Account Type</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>Professional</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.text }]}>Last Login</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>Today at 12:30 PM</Text>
            </View>
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={[styles.versionText, { color: colors.text }]}>
            Version 1.0.0
          </Text>
          <Text style={[styles.copyrightText, { color: colors.text }]}>
            © 2024 HoldXPlay. All rights reserved.
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.card }]}
          onPress={signOut}
        >
          <FontAwesome 
            name="sign-out" 
            size={18} 
            color="#FF4842"
          />
          <Text style={[styles.logoutText, { color: '#FF4842' }]}>
            Logout
          </Text>
        </TouchableOpacity>

        {/* Extra bottom spacing */}
        <View style={styles.bottomSpacing} />
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
  },
  infoContainer: {
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginLeft: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewItem: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    opacity: 0.8,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  versionInfo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.5,
  },
  bottomSpacing: {
    height: 50,  // Extra bottom spacing
  },
});
