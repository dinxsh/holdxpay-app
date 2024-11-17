import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Task {
  _id: string;
  name: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'in_progress';
}

interface Challenge {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  progress: number; // percentage
}

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Sample data
  const tasks: Task[] = [
    { _id: '1', name: 'Design Homepage', dueDate: '2024-03-25', status: 'in_progress' },
    { _id: '2', name: 'Develop API', dueDate: '2024-03-28', status: 'pending' },
    { _id: '3', name: 'Test Application', dueDate: '2024-03-30', status: 'completed' },
  ];

  const challenges: Challenge[] = [
    { _id: '1', title: '30-Day Coding Challenge', startDate: '2024-03-01', endDate: '2024-03-30', progress: 75 },
    { _id: '2', title: 'UI Design Sprint', startDate: '2024-03-05', endDate: '2024-03-20', progress: 50 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFC107';
      case 'in_progress':
        return '#00AB55';
      case 'completed':
        return '#4CAF50';
      default:
        return colors.text;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Tasks Section */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Public Tasks</Text>
        {tasks.map((task) => (
          <View key={task._id} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: colors.text }]}>{task.name}</Text>
              <Text style={[styles.itemDate, { color: colors.text }]}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
              <Text style={styles.statusText}>{task.status.replace('_', ' ').toUpperCase()}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Challenges Section */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Public Challenges</Text>
        {challenges.map((challenge) => (
          <View key={challenge._id} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: colors.text }]}>{challenge.title}</Text>
              <Text style={[styles.itemDate, { color: colors.text }]}>
                {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${challenge.progress}%`, backgroundColor: colors.tint }]} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  itemDate: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    color: 'white',
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  progressBar: {
    width: 100,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
});
