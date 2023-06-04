import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { GoBackArrowIcon } from 'src/components/svg/GoBackArrowIcon';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { goPrevPage } from 'src/redux/actions';
import CrossIcon from 'src/components/svg/CrossIcon';
import { goNextPage } from '../redux/actions';

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

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => dispatch(goPrevPage())}>
          <GoBackArrowIcon/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(goNextPage('Calendar'))}>
          <CrossIcon/>
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
