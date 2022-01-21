import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

export default function ToggleableTag(props) {
  const containerStyle = props.selected ? styles.containerSelected : styles.containerUnselected
  const titleStyle = props.selected ? styles.titleSelected : styles.titleUnselected
  const title = props.selected ? "✓ " + props.title : "+ " + props.title

  return (
    <TouchableHighlight
      style={[styles.container, containerStyle, props.style]}
      underlayColor="#DDDDDD"
      onPress={() => props.onTagToggle(props.id)}
    >
      <Text style={[styles.title, titleStyle]} >{title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
	container: {
    padding: 6,
    borderRadius: 30,
    margin: 2,
    borderColor: 'lightblue',
  },
  containerSelected: {
    backgroundColor: 'lightblue',
    borderWidth: 1,
  },
  containerUnselected: {
    borderWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  titleSelected: {
    color: 'white',
  },
  titleUnselected: {
    color: 'lightblue',
  },
})