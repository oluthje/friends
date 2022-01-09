import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import * as Constants from "./../constants.js"

export default function Card(props) {
  return (
    <TouchableOpacity style={styles.container} onLongPress={props.onLongPress}>
      {props.title ? <Text style={styles.title} >{props.title}</Text> : null}
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
    fontSize: Constants.CARD_TITLE_FONTSIZE,
  },
})