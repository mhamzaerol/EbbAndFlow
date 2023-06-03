import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import Svg, { Path } from "react-native-svg";

export function BackIcon(props) {
  return (
    <SafeAreaView>
      <Svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onPress={() => console.log("Back Clicked")}
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.707 5.293a1 1 0 010 1.414L11.414 16l9.293 9.293a1 1 0 01-1.414 1.414l-10-10a1 1 0 010-1.414l10-10a1 1 0 011.414 0z"
          fill="#002"
        />
      </Svg>
    </SafeAreaView>
  )
}

export default function ChatBotScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  function sendMessage() {
    if (input.length > 0) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // simulate chatbot response
      setTimeout(() => {
        setMessages([...messages, { text: input, sender: 'user' }, { text: 'How are you?', sender: 'chatbot' }]);
      }, 1000);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconsContainer}>
        <BackIcon />
        <TouchableOpacity onPress={() => console.log("Exit Clicked")}>
        <Image source={require('assets/cross.png')} />
        </TouchableOpacity>
      </View>

      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.chatContainer}
      >
        <ScrollView>
          {messages.map((message, index) => (
            <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.chatbotMessage}>
              <Text>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={input}
            onChangeText={text => setInput(text)}
          />

          {/* <Button title="Send" onPress={sendMessage} /> */}
          <TouchableOpacity onPress={sendMessage}>
            <Image
              source={require('assets/send.png')}
              style={{ width: 30, height: 30, marginTop: 10, marginLeft: 10 }} // adjust the size as needed
              />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  chatbotMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
});
