import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import ApiService from '@/services/api';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

interface Connection {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
}

interface Message {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
  message: string;
  date: string;
}

interface Task {
  _id: string;
  name: string;
  assignedBy: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  price: string;
  type: string;
  status: 'pending' | 'completed' | 'in_progress';
}

const getRandomColor = (name: string) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getStatusColor = (status: string, colors: any) => {
  switch (status) {
    case 'pending':
      return `${colors.tint}33`; // 20% opacity
    case 'in_progress':
      return `${colors.tint}66`; // 40% opacity
    case 'completed':
      return colors.tint;
    default:
      return colors.tint;
  }
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [connections, setConnections] = React.useState<Connection[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const router = useRouter();

  const fetchConnections = async (pageNumber: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ApiService.getConnections(pageNumber, 10);
      
      if (response.success) {
        if (pageNumber === 1) {
          setConnections(response.connections);
        } else {
          setConnections(prev => [...prev, ...response.connections]);
        }
        
        // Check if there are more pages
        if (response.pagination) {
          setHasMore(response.pagination.page < response.pagination.totalPages);
        }
      } else {
        setError(response.error || 'Failed to fetch connections');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchConnections();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchConnections(nextPage);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    fetchConnections(1);
  };

  // Sample messages data (replace with actual API data later)
  const recentMessages: Message[] = [
    {
      _id: '1',
      user: {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
      },
      message: 'Hey, how are you doing?',
      date: '2024-03-20 14:30',
    },
    {
      _id: '2',
      user: {
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
      },
      message: 'Can we discuss the project tomorrow?',
      date: '2024-03-20 13:15',
    },
  ];

  // Add sample data after recentMessages
  const tasks: Task[] = [
    {
      _id: '1',
      name: 'Website Design',
      assignedBy: {
        firstName: 'John',
        lastName: 'Smith'
      },
      createdAt: '2024-03-20',
      price: '$500',
      type: 'Design',
      status: 'in_progress'
    },
    {
      _id: '2',
      name: 'Mobile App Development',
      assignedBy: {
        firstName: 'Sarah',
        lastName: 'Johnson'
      },
      createdAt: '2024-03-19',
      price: '$1,200',
      type: 'Development',
      status: 'pending'
    }
  ];

  // Sample challenges data
  const challenges: Task[] = [
    {
      _id: '1',
      name: '30-Day Coding Challenge',
      assignedBy: {
        firstName: 'Alice',
        lastName: 'Brown'
      },
      createdAt: '2024-03-18',
      price: 'Free',
      type: 'Coding',
      status: 'in_progress'
    },
    {
      _id: '2',
      name: 'Fitness Challenge',
      assignedBy: {
        firstName: 'Bob',
        lastName: 'Green'
      },
      createdAt: '2024-03-17',
      price: 'Free',
      type: 'Fitness',
      status: 'pending'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        overScrollMode="always"
      >
        {/* Tasks Card - Now First */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>My Tasks</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={[styles.iconButton, { backgroundColor: colors.tint }]}
                onPress={() => {
                  console.log('Add task pressed');
                }}
              >
                <FontAwesome name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.tasksContainer}>
            {tasks.map((task) => (
              <View 
                key={task._id} 
                style={styles.taskRow}
              >
                <View style={styles.taskMainInfo}>
                  <View 
                    style={[
                      styles.profileImage, 
                      { backgroundColor: getRandomColor(task.assignedBy.firstName) }
                    ]}
                  >
                    <Text style={styles.profileLetter}>
                      {task.assignedBy.firstName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.taskDetails}>
                    <Text style={[styles.taskName, { color: colors.text }]}>
                      {task.name}
                    </Text>
                    <View style={styles.taskSubInfo}>
                      <Text style={[styles.assignedBy, { color: colors.text }]}>
                        {`${task.assignedBy.firstName} ${task.assignedBy.lastName}`}
                      </Text>
                      <Text style={[styles.taskDate, { color: colors.text }]}>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.taskMetaInfo}>
                  <Text style={[styles.taskPrice, { color: colors.tint }]}>
                    {task.price}
                  </Text>
                  <View style={[
                    styles.taskStatus,
                    { backgroundColor: getStatusColor(task.status, colors) }
                  ]}>
                    <Text style={styles.statusText}>
                      {task.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Challenges Card - Now Second */}
        <View style={[styles.card, { backgroundColor: colors.card, marginTop: 20 }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>My Challenges</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={[styles.iconButton, { backgroundColor: colors.tint }]}
                onPress={() => {
                  console.log('Add challenge pressed');
                }}
              >
                <FontAwesome name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.tasksContainer}>
            {challenges.map((challenge) => (
              <View 
                key={challenge._id} 
                style={styles.taskRow}
              >
                <View style={styles.taskMainInfo}>
                  <View 
                    style={[
                      styles.profileImage, 
                      { backgroundColor: getRandomColor(challenge.assignedBy.firstName) }
                    ]}
                  >
                    <Text style={styles.profileLetter}>
                      {challenge.assignedBy.firstName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.taskDetails}>
                    <Text style={[styles.taskName, { color: colors.text }]}>
                      {challenge.name}
                    </Text>
                    <View style={styles.taskSubInfo}>
                      <Text style={[styles.assignedBy, { color: colors.text }]}>
                        {`${challenge.assignedBy.firstName} ${challenge.assignedBy.lastName}`}
                      </Text>
                      <Text style={[styles.taskDate, { color: colors.text }]}>
                        {new Date(challenge.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.taskMetaInfo}>
                  <Text style={[styles.taskPrice, { color: colors.tint }]}>
                    {challenge.price}
                  </Text>
                  <View style={[
                    styles.taskStatus,
                    { backgroundColor: getStatusColor(challenge.status, colors) }
                  ]}>
                    <Text style={styles.statusText}>
                      {challenge.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Messages Card - Now Third */}
        <View style={[styles.card, { backgroundColor: colors.card, marginTop: 20 }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Recent Messages</Text>
          </View>
          
          <View style={styles.messagesContainer}>
            {recentMessages.map((message) => (
              <View 
                key={message._id} 
                style={styles.messageRow}
              >
                <View 
                  style={[
                    styles.profileImage, 
                    { backgroundColor: getRandomColor(message.user.firstName) }
                  ]}
                >
                  <Text style={styles.profileLetter}>
                    {message.user.firstName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.messageDetails}>
                  <Text style={[styles.userName, { color: colors.text }]}>
                    {`${message.user.firstName} ${message.user.lastName}`}
                  </Text>
                  <View style={styles.messageContent}>
                    <Text 
                      style={[styles.messageText, { color: colors.text }]}
                      numberOfLines={1}
                    >
                      {message.message}
                    </Text>
                    <Text style={[styles.messageDate, { color: colors.text }]}>
                      {new Date(message.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={[styles.showMoreButton, { borderTopColor: colors.border }]}
            onPress={() => {
              router.push('/(tabs)/chats');
            }}
          >
            <Text style={[styles.showMoreText, { color: colors.tint }]}>
              Show More
            </Text>
          </TouchableOpacity>
        </View>

        {/* Connections Card - Now Last */}
        <View style={[styles.card, { backgroundColor: colors.card, marginTop: 20 }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Connections</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={[styles.iconButton, { backgroundColor: colors.tint }]}
                onPress={() => {
                  console.log('Search pressed');
                }}
              >
                <FontAwesome name="search" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.iconButton, { backgroundColor: colors.tint }]}
                onPress={handleRefresh}
              >
                <FontAwesome name="refresh" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.iconButton, { backgroundColor: colors.tint }]}
                onPress={() => {
                  console.log('Add connection pressed');
                }}
              >
                <FontAwesome name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.tableContainer}>
            {connections.map((connection) => (
              <TouchableOpacity 
                key={connection._id} 
                style={styles.tableRow}
                onPress={() => {
                  console.log('Row pressed:', connection._id);
                }}
              >
                <View style={styles.userColumn}>
                  <Text style={[styles.userName, { color: colors.text }]}>
                    {`${connection.user.firstName} ${connection.user.lastName}`}
                  </Text>
                  <Text style={[styles.username, { color: colors.text }]}>
                    @{connection.user.username}
                  </Text>
                </View>
                <View style={styles.emailColumn}>
                  <Text style={[styles.email, { color: colors.text }]} numberOfLines={1}>
                    {connection.user.email}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {loading && (
              <View style={styles.loadingContainer}>
                <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
              </View>
            )}
            
            {!loading && !hasMore && connections.length > 0 && (
              <Text style={[styles.endText, { color: colors.text }]}>No more connections</Text>
            )}
            
            {!loading && connections.length === 0 && (
              <Text style={[styles.emptyText, { color: colors.text }]}>No connections found</Text>
            )}
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
    paddingBottom: 100,
  },
  card: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 5,
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
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  userColumn: {
    flex: 1,
    marginRight: 12,
  },
  emailColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  username: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    opacity: 0.8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileLetter: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  connectionDetails: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    opacity: 0.7,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    padding: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  endText: {
    textAlign: 'center',
    padding: 12,
    opacity: 0.5,
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    opacity: 0.5,
    fontSize: 14,
  },
  messagesContainer: {
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  messageDetails: {
    flex: 1,
  },
  messageUserInfo: {
    marginBottom: 4,
  },
  messageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  messageText: {
    fontSize: 14,
    flex: 1,
    marginRight: 10,
    fontFamily: 'Inter_400Regular',
    opacity: 0.8,
  },
  messageDate: {
    fontSize: 12,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  showMoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
  showMoreText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  tasksContainer: {
    marginBottom: 10,
  },
  taskRow: {
    paddingVertical: 12,
    flexDirection: 'column',
    gap: 8,
  },
  taskMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDetails: {
    flex: 1,
    marginLeft: 12,
  },
  taskName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  assignedBy: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.7,
  },
  taskMetaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 52, // profileImage width + marginLeft
  },
  taskDate: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
    marginLeft: 8,
  },
  taskPrice: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  taskStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
  taskSubInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
});
