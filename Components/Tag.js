import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function Tag(props) {
  const propStyles = {
    backgroundColor: props.color,
    width: props.width,
    maxWidth: 50,
  }
  return (
    <View style={[styles.container, props.style, propStyles]} >
      <Text style={styles.title} >{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 12,
    margin: 2,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  }
})