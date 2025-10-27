import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { mockMessages } from '../data/mockData';

export const ChatScreen = ({ navigation }: any) => {
  const [message, setMessage] = useState('');
  const [messages] = useState(mockMessages);

  const renderMessage = ({ item }: any) => (
    <View style={[styles.messageContainer, item.isMe && styles.myMessageContainer]}>
      {!item.isMe && (
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        />
      )}
      <View style={[styles.messageBubble, item.isMe && styles.myMessageBubble]}>
        <Text style={[styles.messageText, item.isMe && styles.myMessageText]}>
          {item.text}
        </Text>
        <Text style={[styles.messageTime, item.isMe && styles.myMessageTime]}>
          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerName}>Michael Chen</Text>
            <Text style={styles.headerStatus}>Active now</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={24} color={Colors.text.secondary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={Colors.text.disabled}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  headerName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  headerStatus: {
    fontSize: Typography.fontSize.xs,
    color: Colors.success,
  },
  messageList: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.xs,
  },
  messageBubble: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderBottomLeftRadius: 4,
    padding: Spacing.sm + 4,
    maxWidth: '70%',
  },
  myMessageBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: BorderRadius.lg,
  },
  messageText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
  },
  myMessageText: {
    color: Colors.white,
  },
  messageTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  myMessageTime: {
    color: Colors.white,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 4,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  attachButton: {
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.xs,
  },
});
