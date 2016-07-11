import React from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'


const TodoForm = (props) => (
  <View style={styles.container}>
    <TextInput value={props.newTodo} onChangeText={props.handleInputChange} style={styles.input} />
    <TouchableOpacity onPress={props.handlePress}style={styles.button}>
      <Text style={styles.text}>Add Todo</Text>
    </TouchableOpacity>
  </View>
)

export default TodoForm

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  input: {
    width: 200,
    height: 50
  },
  text: {
    fontFamily: 'roboto',
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 20,
    color: '#191919'
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFE850',
    width: 150,
    borderRadius: 20,
    // alignItems: 'center'
  }
})
