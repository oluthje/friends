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
          onPress={props.onClose}
        />
        <Button
          title="Save" disabled={false}
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
            <Text>√</Text>
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