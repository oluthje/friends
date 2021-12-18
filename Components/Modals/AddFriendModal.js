import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native'
import * as Constants from "../../constants.js"
import HalfModal from "./HalfModal.js"
import ToggleButton from "./ToggleButton.js"

export default function AddFriendModal(props) {
  const [name, setName] = useState("")
  const [intimacyIndex, setIntimacyIndex] = useState(0)

  const handleSubmit = () => {
    if (name !== "") {
      props.onSubmit(name, Constants.INTIMACIES[intimacyIndex])
      props.onClose()
      setName("")
    }
  }

  return (
    <HalfModal visible={props.visible} onClose={props.onClose} >
      <TextInput
        style={styles.input}
        onChangeText={setName}
        onEndEditing={() => handleSubmit()}
        value={name}
        placeholder={"New friend"}
        autoFocus={true}
      />
      <ToggleButton
        options={Constants.INTIMACIES}
        index={intimacyIndex}
        onOptionChange={setIntimacyIndex}
      />
      <View style={{ flexDirection:"row" }}>
        <Button
          style={styles.saveButton}
          title="Cancel"
          onPress={() => props.onClose()}
        />
        <Button
          style={styles.saveButton}
          title="Save" disabled={false}
          onPress={() => handleSubmit()}
        />
      </View>
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