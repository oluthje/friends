import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function Tag(props) {
  return (
    <View style={[styles.oval, { backgroundColor: props.color }, { width: props.width }]} >
      <Text style={{ color: 'white' }} >{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  oval: {
    padding: 5,
    borderRadius: 12,
  }
})