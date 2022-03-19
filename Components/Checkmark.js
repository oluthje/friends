import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Checkmark(props) {
  const [checked, setChecked] = useState(props.checked)

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.checkmark, { borderColor: props.color }]}
      onShowUnderlay={() => setChecked(!checked)}
      onHideUnderlay={() => setChecked(!checked)}
      underlayColor={'white'}
    >
      <View style={{ position: 'absolute' }}>
        {checked ? <MaterialCommunityIcons name="check-bold" color={props.color} size={20} /> : null}
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  checkmark: {
    borderRadius: 30,
    borderWidth: 2,
    padding: 10,
    width: 15,
    height: 15,
    marginRight: 8,
    marginTop: 3,
  },
});