import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import * as Consts from "./../constants.js"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ToggleableTag(props) {
  const containerStyle = props.selected ? styles.containerSelected : styles.containerUnselected
  const titleStyle = props.selected ? styles.titleSelected : styles.titleUnselected

  return (
    <TouchableHighlight
      style={[styles.container, containerStyle, props.style]}
      underlayColor="#DDDDDD"
      onPress={() => props.onTagToggle(props.id)}
    >
      <View style={styles.oneLine} >
        <MaterialCommunityIcons
          name={props.selected ? "check-bold" : "plus"}
          size={20}
          color={props.selected ? "white" : props.color}
        />
        <Text style={[styles.title, titleStyle]} >{props.selected ? props.title : props.title}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
	container: {
    padding: 6,
    borderRadius: 30,
    margin: 2,
    borderColor: Consts.THEME.BUTTON,
  },
  containerSelected: {
    backgroundColor: Consts.THEME.BUTTON,
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
    color: Consts.THEME.BUTTON,
  },
  oneLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})