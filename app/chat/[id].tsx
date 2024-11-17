import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface Message {
  _id: string;
  text: string;
  timestamp: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isSent: boolean;
  isRead: boolean;
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Find the chat details based on the ID
  const findChatDetails = () => {
    // This is sample data - replace with your actual data source
    const chats = [
      {
        _id: '1',
        user: {
          firstName: 'John',
          lastName: 'Doe',
          username: 'johndoe',
        },
      },
      {
        _id: '2',
        user: {
          firstName: 'Sarah',
          lastName: 'Smith',
          username: 'sarahsmith',
        },
      },
      // ... add all your sample chats here
    ];
    return chats.find(chat => chat._id === id);
  };

  const chatDetails = findChatDetails();

  // Set the navigation title when component mounts
  useEffect(() => {
    if (chatDetails) {
      navigation.setOptions({
        headerTitle: `@${chatDetails.user.username}`,
      });
    }
  }, [chatDetails, navigation]);

  // Sample data - replace with API call later
  const [messages, setMessages] = useState<Message[]>([
    {
      _id: '1',
      text: 'Hey, how are you doing?',
      timestamp: '2024-03-20T14:30:00',
      sender: {
        _id: '123',
        firstName: 'John',
        lastName: 'Doe'
      },
      isSent: true,
      isRead: true
    },
    {
      _id: '2',
      text: 'I\'m good, thanks! How about you?',
      timestamp: '2024-03-20T14:31:00',
      sender: {
        _id: 'current_user',
        firstName: 'Current',
        lastName: 'User'
      },
      isSent: true,
      isRead: true
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        _id: Date.now().toString(),
        text: message.trim(),
        timestamp: new Date().toISOString(),
        sender: {
          _id: 'current_user',
          firstName: 'Current',
          lastName: 'User'
        },
        isSent: true,
        isRead: false
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.sender._id === 'current_user';

    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <View style={[
          styles.messageBubble,
          { 
            backgroundColor: isCurrentUser ? colors.tint : colors.card,
            borderBottomRightRadius: isCurrentUser ? 0 : 15,
            borderBottomLeftRadius: isCurrentUser ? 15 : 0,
          }
        ]}>
          <Text style={[
            styles.messageText,
            { color: isCurrentUser ? 'white' : colors.text }
          ]}>
            {item.text}
          </Text>
          <Text style={[
            styles.messageTime,
            { color: isCurrentUser ? 'rgba(255,255,255,0.7)' : colors.text + '80' }
          ]}>
            {formatMessageTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Type a message..."
          placeholderTextColor={colors.text + '80'}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, { backgroundColor: colors.tint }]}
          onPress={sendMessage}
        >
          <FontAwesome name="send" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 15,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    maxHeight: 100,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});