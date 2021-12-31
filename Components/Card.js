import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

export default function Card(props) {
  return (
    <TouchableOpacity style={styles.container} onLongPress={props.onLongPress}>
      <Text style={styles.title} >{props.title}</Text>
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
  	fontWeight: 'bold',
    margin: 5,
  }
})