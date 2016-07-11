import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import TodoForm from './TodoForm'
import { connect } from 'react-redux'

// Actions

const {height, width} = Dimensions.get('window');

export class _Todo extends Component {
  static defaultProps = {
    todos: []
  }

  constructor() {
    super()
    this.state = {
      newTodo: ''
    }
  }

  // componentWillMount() {
  //   console.log('hello')
  //   fetch('http://192.168.1.9:3000/todos')
  //     .then((data) => data.json())
  //     .then((todos) => this.setState({todos}))
  // }

  handlePress() {
    // const id = this.createUniqueId()
    const todo = {
      text: this.state.newTodo,
      done: false,
      // id: id
    }
    this.props.createTodo(todo)
    this.setState({
      newTodo: ''
    })
    // fetch('http://192.168.1.9:3000/todos', {
    //   method: "POST",
    //   body: JSON.stringify(todo),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then((data) => data.json())
    //   .then((todo) => {
    //     this.setState({
    //       todos: [...this.state.todos, todo],
    //       newTodo: ''
    //     })
    //   })
    // const todos = [...this.state.todos, todo]
    // this.setState({
    //   todos: todos,
    //   newTodo: ''
    // })
  }

  handleInputChange(text) {
    const newTodo = text
    this.setState({
      newTodo: newTodo
    })
  }

  // createUniqueId() {
  //   this.id = this.id || 0
  //   return this.id++
  // }

  handleTodoClick(id) {
    const todos = this.state.todos
    const todo = todos.find((todo) => todo.id === id)
    todo.done = !todo.done
    fetch(`http://192.168.1.9:3000/todos/${id}`,{
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => data.json())
      .then((newTodo) => {
        todos.forEach(function(todo) {
            if (todo.id === newTodo.id) {
              todo.done = newTodo.done
            }
        })
        this.setState({todos: todos})
      })
    // todos.find(todo => todo.id === id).done = !todos.find(todo => todo.id === id).done
  }

  handleDeleteClick(id) {
    const { todos } = this.state
    todos.splice(index, 1)
    this.setState({todos})
  }

  renderTodo(todo, i) {
    return (
      <View key={todo.id} style={styles.todo}>
        <Text onPress={this.handleTodoClick.bind(this, todo.id)}>
          {todo.text}
        </Text>
        <TouchableOpacity>
          <Text>{todo.done === true ? 'Undone' : 'Done'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Awesome Todo App</Text>
        <TodoForm
          newTodo={this.state.newTodo}
          handleInputChange={this.handleInputChange.bind(this)}
          handlePress={this.handlePress.bind(this)}/>
        <View style={styles.todosContainer}>
          <View style={styles.undone}>
            <Text style={styles.todoHeader}>Undone</Text>
            {this.props.todos.filter(todo => todo.done === false).map(this.renderTodo.bind(this))}
          </View>
          <View style={styles.done}>
            <Text style={styles.todoHeader}>Done</Text>
            {this.props.todos.filter(todo => todo.done === true).map(this.renderTodo.bind(this))}
          </View>
        </View>
      </View>
    )
  }
}

const mapActionsToProps = (dispatch) => ({
  createTodo(todo) {
    dispatch({type: 'CREATE_TODO', payload: todo})
  }
})

const mapState = (state) => ({
  todos: state.todos
})

export const Todo = connect(mapState, mapActionsToProps)(_Todo)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FF3C5A'
  },
  header: {
    fontWeight: '300',
    color: '#00FF80',
    fontSize: 30,
    textAlign: 'center',
    height: 60
  },
  input: {
    width: 200,
    height: 50
  },
  todosContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30
  },
  undone: {
    flex: 0.5,
    // width: width / 2,
    borderRightColor: '#000000',
    borderRightWidth: 1,
    backgroundColor: 'green'
  },
  done: {
    flex: 0.5,
    // width: width / 2,
    backgroundColor: 'blue'
  },
  todo: {
    flexDirection: 'row'
  },
  todoHeader: {
    alignSelf: 'center',
    fontSize: 20,
    color: "#00FF80"
  },
  text: {
    fontFamily: 'roboto',
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 20,
    color: '#191919'
  }
})

