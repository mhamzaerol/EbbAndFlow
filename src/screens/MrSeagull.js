import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, Button, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { GoBackArrowIcon } from 'src/components/svg/GoBackArrowIcon';
import { useDispatch } from 'react-redux';
import { goPrevPage } from 'src/redux/actions';
import CrossIcon from 'src/components/svg/CrossIcon';
import { goNextPage } from 'src/redux/actions';
import PaperPlaneTiltIcon from 'src/components/svg/PaperPlaneTiltIcon';
import axios from 'axios';

export default function ChatBotScreen({ navigation }) {

  const [messages, setMessages] = useState([
    {
      text: 'Hello, I am Mr. Seagull, your personal assistant.\n\nI checked your mood record and diary, and I am ready to assist you.\n\nIn case you want to discuss something specific, please let me know.\n\nOtherwise, I can share my help and advice on how to help you with your situation.',
      sender: 'system'
    }
  ]);
  const [input, setInput] = useState('');
  const scrollViewRef = React.useRef();

  let initialPromptTemplate = 'From now on, you are the personal assistant of me. Your task is to help me with my situation. Here is my diary of today:\n\n${userDiary}\n\n\
  Also, I provide you with my mood record:\n\n${userMood}\n\nPlease adjust your response accordingly. Namely, \
  please take the mood record into account when you respond to me and help me with what I mention you in my diary. \
  It is possible that I may not have provided a diary record or a mood record. In that case, adjust your response accordingly.\n\
  Do not forget that your role is to help me and improve my mood and feelings. Also, you should guide me as well!!'

  async function communicateMrSeagull(messages) {
    setMessages([...messages, { text: '...', sender: 'system' }]);
    const history = messages.map(message => ({
      role: message.sender,
      content: message.text
    }));

    // TODO: get user diary and mood record from redux
    const userDiary = 'Today was very difficult, I felt very sad because my friend did not want to play with me :((';
    const userMood = 'My mood record for today: intensity: 60/100 and valence: 30/100';

    // insert the prompt that conditions the bot, at the beginning of the history
    history.unshift({
      role: 'user', 
      content: initialPromptTemplate.replace('${userDiary}', userDiary).replace('${userMood}', userMood)
    });

    console.log(history);

    try {
      // Send POST request to backend
      const response = await axios.post('http://mhamzaerol.pythonanywhere.com/api', {
        history: history
      });
      // Add AI message to local state
      const aiMessage = response.data.message;
      // setMessages([...messages, { text: aiMessage, sender: 'system' }]);

      // make it progressive
      let messageLen = aiMessage.length;
      for(let i = 0; i < 10; i++) {
        setTimeout(() => {
          setMessages([...messages, { text: aiMessage.slice(0, Math.floor(messageLen * (i+1) / 10)), sender: 'system' }]);
        }, 250 * i);
      }
      // setMessages([...messages.slice(0, -1), { text: aiMessage, sender: 'system' }]);
    } catch (error) {
      console.error(error);
    }
  }
  
  function sendMessage() {
    if (input.length > 0) {
      // Add user message to local state
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
  
      communicateMrSeagull(newMessages);
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
