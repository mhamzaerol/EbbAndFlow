import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const JournalPage = () => {
  const [title, setTitle] = useState('')
  const [entryText, setEntryText] = useState('');
  const [locked, setLocked] = useState(true);

  const handleSaveEntry = () => {
    // Implement the logic to save the entry to a database or storage here
    // For simplicity, we'll just log the entry text for now
    console.log('Entry Text:', entryText);
    // Reset the state after saving
    setEntryText('');
  }

  const handleBack = () => {
    // Go back to the previous screen
  };

  const handleLock = () => {
    // Toggle the lock state
    setLocked(!locked);
  };

  const handleChat = () => {

  }
  
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <AntDesign name='left' size={30} onPress={handleBack}/>
        <AntDesign
          name={locked ? 'lock' : 'unlock'}
          size={30}
          onPress={handleLock}
        />
      </View>

      <View style={styles.title}>
       <TextInput
        placeholder="Write the title here"
        value={title}
        onChangeText={title => setEntryText(setTitle)}/>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your journal entry here"
        value={entryText}
        onChangeText={text => setEntryText(text)}
      />
      
      <View style ={styles.images}>
          <Image style ={styles.saveImg1}  source={require('/Users/nursultansoodonbekov/Desktop/AwesomeApp/AwesomeProject/images/icons8-boat-96.png')}/>
          <Image style ={styles.saveImg2}  source={require('/Users/nursultansoodonbekov/Desktop/AwesomeApp/AwesomeProject/images/icons8-seagull-100.png')}/>

      </View>


      <View style={styles.button}>
        <View style={styles.save}>
          <Text onPress={handleSaveEntry} style={{fontSize:14}}>Save & Exit</Text>
        </View>
        <View style={styles.talk}>
          <Text onPress={handleChat}>Talk with </Text> 
          <Text onPress={handleChat}>Mr.Seagull</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    height:50
    },
  title:{
    height:50,
    width:311,
    borderWidth: 1,
    borderColor: 'gray',
    paddingTop: 15,
    paddingLeft:20  
  },
  input: {
    height: 400,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 1,
    padding: 5,
    flexDirection:'row',

  },
  button:{
    fontSize:50,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15  
  },
  back:{
    flexDirection:'row',
    marginBottom: 16,
    justifyContent:'space-between'
  },
  save:{
    height:35,
    width:102,
    borderWidth: 1,
    borderColor: 'gray',
    paddingTop: 7,
    paddingLeft:13,
    paddingRight:5,
    paddingBottom:5,
  },
  images:{
    height:35,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  saveImg1:{
    width:'17%', 
    height:'140%',
    marginLeft:'3%'
  },
  saveImg2:{
    width:'17%', 
    height:'140%',
    marginRight:'8%'
  },
  talk:{
    height:35,
    width:102,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign:'center',
    paddingLeft:18,
    fontSize:14
  },

});

export default JournalPage;