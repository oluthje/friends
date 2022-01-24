import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from 'react-native'
import * as Constants from "../../constants.js"
import HalfModal from "./HalfModal.js"
import ToggleButton from "./ToggleButton.js"

export default function AddFriendModal(props) {
  return (
    <HalfModal visible={props.visible} onClose={props.onClose} >
      <TextInput
        style={styles.input}
        onChangeText={props.setName}
        value={props.name}
        placeholder={"New friend"}
        autoFocus={true}
      />
      <ToggleButton
        options={Constants.INTIMACIES}
        index={props.intimacyIndex}
        onOptionChange={props.setIntimacyIndex}
      />
      <View style={{ flexDirection:"row" }}>
        <Button
          color={Constants.THEME.BUTTON}
          title="Cancel"
          onPress={props.onClose}
        />
        <Button
          color={Constants.THEME.BUTTON}
          title="Save" disabled={false}
          onPress={props.handleSubmit}
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