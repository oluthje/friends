import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from 'react-native'
import * as Constants from "../../constants.js"
import HalfModal from "./HalfModal.js"
import ColorPalette from 'react-native-color-palette'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function GroupModal(props) {
  return (
    <HalfModal visible={props.visible} onClose={props.onClose} >
      <TextInput
        style={styles.input}
        onChangeText={props.setName}
        value={props.name}
        placeholder={"New group"}
        autoFocus={true}
      />
      <View style={{ flexDirection:"row" }}>
        <Button
          title="Cancel"
          color={Constants.THEME.BUTTON}
          onPress={props.onClose}
        />
        <Button
          title="Save" disabled={false}
          color={Constants.THEME.BUTTON}
          onPress={props.handleSubmit}
        />
      </View>
      <View style={{ marginHorizontal: "15%" }}>
        <ColorPalette
          onChange={props.handleSetColor}
          defaultColor={props.color}
          colors={Constants.COLORS}
          title={""}
          icon={
            <MaterialCommunityIcons name="check" size={20} />
          }
        />
      </View>
      {props.children}
    </HalfModal>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});