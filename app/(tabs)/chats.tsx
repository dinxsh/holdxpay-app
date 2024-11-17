import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

interface ChatPreview {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
}

export default function ChatsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with API call later
  const chats: ChatPreview[] = [
    {
      _id: '1',
      user: {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
      },
      lastMessage: {
        text: 'Hey, how are you doing?',
        timestamp: '2024-03-20T14:30:00',
        isRead: true,
      },
    },
    {
      _id: '2',
      user: {
        firstName: 'Sarah',
        lastName: 'Smith',
        username: 'sarahsmith',
      },
      lastMessage: {
        text: 'The project looks great! Can we discuss the next steps?',
        timestamp: '2024-03-20T10:15:00',
        isRead: false,
      },
    },
    {
      _id: '3',
      user: {
        firstName: 'Michael',
        lastName: 'Johnson',
        username: 'mikej',
      },
      lastMessage: {
        text: 'Ive reviewed the documents you sent.',
        timestamp: '2024-03-19T15:45:00',
        isRead: true,
      },
    },
    {
      _id: '4',
      user: {
        firstName: 'Emily',
        lastName: 'Brown',
        username: 'emilybrown',
      },
      lastMessage: {
        text: 'Thanks for your help yesterday!',
        timestamp: '2024-03-19T09:20:00',
        isRead: true,
      },
    },
    {
      _id: '5',
      user: {
        firstName: 'David',
        lastName: 'Wilson',
        username: 'davidw',
      },
      lastMessage: {
        text: 'When can we schedule the meeting?',
        timestamp: '2024-03-18T16:30:00',
        isRead: false,
      },
    }
  ];

  const getRandomColor = (name: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity 
      style={[styles.chatItem, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/chat/${item._id}`)}
    >
      <View 
        style={[
          styles.avatar, 
          { backgroundColor: getRandomColor(item.user.firstName) }
        ]}
      >
        <Text style={styles.avatarText}>
          {item.user.firstName.charAt(0).toUpperCase()}
        </Text>
      </View>
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {`${item.user.firstName} ${item.user.lastName}`}
          </Text>
          <Text style={[styles.timestamp, { color: colors.text }]}>
            {formatTime(item.lastMessage.timestamp)}
          </Text>
        </View>
        
        <View style={styles.messagePreview}>
          <Text 
            style={[
              styles.lastMessage, 
              { 
                color: colors.text,
                opacity: item.lastMessage.isRead ? 0.6 : 1,
                fontFamily: item.lastMessage.isRead ? 'Inter_400Regular' : 'Inter_600SemiBold',
              }
            ]}
            numberOfLines={1}
          >
            {item.lastMessage.text}
          </Text>
          {!item.lastMessage.isRead && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.tint }]}>
              <Text style={styles.unreadText}>New</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <FontAwesome name="search" size={16} color={colors.text} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search chats..."
          placeholderTextColor={colors.text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <TouchableOpacity 
        style={[styles.groupCard, { backgroundColor: colors.card }]}
        onPress={() => router.push('/groups')}
      >
        <FontAwesome name="users" size={24} color={colors.text} style={styles.groupIcon} />
        <Text style={[styles.groupText, { color: colors.text }]}>Groups</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 45,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  groupIcon: {
    marginRight: 10,
  },
  groupText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  chatList: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    marginRight: 10,
  },
  unreadBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
});
