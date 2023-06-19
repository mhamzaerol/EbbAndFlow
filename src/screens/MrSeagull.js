import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { GoBackArrowIcon } from 'src/components/svg/GoBackArrowIcon';
import { useDispatch, useSelector } from 'react-redux';
import { goPrevPage } from 'src/redux/actions';
import CrossIcon from 'src/components/svg/CrossIcon';
import { goNextPage } from 'src/redux/actions';
import PaperPlaneTiltIcon from 'src/components/svg/PaperPlaneTiltIcon';
import axios from 'axios';
import { addSeagullChat } from 'src/redux/actions';
import { SeagullChat } from 'src/redux/datatypes';

export default function ChatBotScreen() {

  const [input, setInput] = useState('');
  const [renderPercentageSeagull, setRenderPercentageSeagull] = useState(1);
  const scrollViewRef = React.useRef();
  
  const curDate = useSelector(state => state.temporaryData.curDate);
  const userMood = useSelector(state => state.persistentData.moodRecords.find(moodRecord => moodRecord.check('date', curDate)));
  const messages = useSelector(state => {
    const messages = state.persistentData.seagullChats.filter(
      (seagullChat) => seagullChat.check('date', curDate) || seagullChat.check('date', new Date(1900, 1, 1))
    );
    messages.sort((a, b) => a.get('index') - b.get('index'));
    return messages;
  });
  
  const dispatch = useDispatch();

  async function animateMessage(percentage) {
    setRenderPercentageSeagull(percentage);
    scrollViewRef.current.scrollToEnd({ animated: true });
    if(percentage < 1) {
      setTimeout(() => {
        animateMessage(percentage + 0.1);
      }, 300);
    }
  }

  async function communicateMrSeagull() {

    let history = messages.map(message => ({
      role: message.isMrSeagull ? 'system' : 'user',
      content: message.text
    }));

    // TODO: get user diary and mood record from redux!!!!!
    const userDiary = 'Today was very difficult, I felt very sad because my friend did not want to play with me :((';
    const moodInfo = 'My mood record for today: Intensity -> ' + userMood.get('intensity') + '/100 and Valence -> ' + userMood.get('valence') + '/100';

    history[0].content = history[0].content.replace('${userDiary}', userDiary).replace('${userMood}', moodInfo);

    try {
      // Send POST request to backend
      const response = await axios.post('http://mhamzaerol.pythonanywhere.com/api', {
        history: history,
        password: 'intro-to-swe-project-ebb-and-flow-api-for-mr-seagull'
      });

      const aiMessage = response.data.message;
      animateMessage(0);
      dispatch(addSeagullChat(new SeagullChat(curDate, messages.length, true, aiMessage)));
    } catch (error) {
      console.error(error);
    }
  }

  function sendMessage() {
    if (input.length > 0) {
      dispatch(addSeagullChat(new SeagullChat(curDate, messages.length, false, input)));
      setInput('');
      setTimeout(() => {
        setRenderPercentageSeagull(-1);
      }, 250);
    }
  }

  useEffect(() => {

    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 250);

    if(messages[messages.length - 1].get('isMrSeagull') === false) {
      communicateMrSeagull();
    }

  }, [messages && messages.length]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => dispatch(goPrevPage())}>
          <GoBackArrowIcon />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 50, height: 50, marginRight: 1 }}
            source={require("images/icons8-seagull-100.png")}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Mr. Seagull
          </Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(goNextPage("Home"))}>
          <CrossIcon />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.chatContainer}
      >
        <ScrollView ref={scrollViewRef}>
          {messages.map((message, index) => (
            index > 0 && 
            <View key={index} style={message.isMrSeagull ? styles.chatbotMessage : styles.userMessage}>
              {
                index == messages.length - 1 && message.isMrSeagull ? (
                  <Text>{message.text.slice(0, Math.floor(message.text.length * renderPercentageSeagull))}</Text>
                ) :
                <Text>{message.text}</Text>
              }
            </View>
          ))}
          {
            renderPercentageSeagull < 0 && 
            <View key={'...'} style={styles.chatbotMessage}>
              <Text>...</Text>
            </View>
          }
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={input}
            onChangeText={(text) => setInput(text)}
            multiline={true}
          />

          {/* <Button title="Send" onPress={sendMessage} /> */}
          <TouchableOpacity onPress={sendMessage} style={{ paddingLeft: 10 }}>
            <PaperPlaneTiltIcon width="32" height="32" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    // something light color
    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize:18,
    fontWeight:'bold',
    marginTop: 10,
    marginBottom: 5,

  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  chatbotMessage: {
    alignSelf: "flex-start",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
});

