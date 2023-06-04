import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { GoBackArrowIcon } from 'src/components/svg/GoBackArrowIcon';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { goPrevPage } from 'src/redux/actions';
import CrossIcon from 'src/components/svg/CrossIcon';
import { goNextPage } from 'src/redux/actions';
import PaperPlaneTiltIcon from 'src/components/svg/PaperPlaneTiltIcon';

export default function ChatBotScreen({ navigation }) {

  const randomMessages = [
    "How are you?",
    "Hello!",
    "I hope your day was fine",
    "I'm here to listen to you",
    "Tell me how I can help you",
    "Explain your feelings to me",
    "I understand you",
    "I am here to help you",
    "I am listening to you",
  ]

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollViewRef = React.useRef();

  function sendMessage() {
    if (input.length > 0) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      // simulate chatbot response
      setTimeout(() => {
        setMessages([...messages, { text: input, sender: 'user' }, { text: randomMessages[Math.floor(Math.random() * randomMessages.length)], sender: 'chatbot' }]);
      }, 1000);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 250);
  }, [messages]);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => dispatch(goPrevPage())}>
          <GoBackArrowIcon />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <Image
              style={{width: 50, height: 50, marginRight: 1}}
              source={require("images/icons8-seagull-100.png")}
            />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          Mr. Seagull
        </Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(goNextPage('Home'))}>
          <CrossIcon />
        </TouchableOpacity>
      </View>


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.chatContainer}
      >
        <ScrollView ref={scrollViewRef}>
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
            multiline={true}
          />

          {/* <Button title="Send" onPress={sendMessage} /> */}
          <TouchableOpacity onPress={sendMessage} style={{ paddingLeft: 10 }}>
            <PaperPlaneTiltIcon width='32' height='32' />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    // something light color
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
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
