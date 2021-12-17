import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
  Button,
} from 'react-native'
import * as Constants from "../constants.js"

export default function HalfModal(props) {
  const [text, setText] = useState()
  const [selected, setSelected] = useState()
  const [intimacyIndex, setIntimacyIndex] = useState(0)
  const visible = props.visible

  const handleSubmit = () => {
    if (text !== "") {
      props.onSubmit(text, Constants.INTIMACIES[intimacyIndex])
      props.onClose()
      setText("")
    }
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {props.onClose()}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              onEndEditing={() => handleSubmit()}
              value={text}
              placeholder={props.placeholder}
              autoFocus={true}
            />
            <ToggleButton
              options={Constants.INTIMACIES}
              startIndex={intimacyIndex}
              onOptionChange={(option) => setIntimacyIndex(option)}
            />
            <View style={{ flexDirection:"row" }}>
              <Button
                style={styles.saveButton}
                title="Cancel"
                onPress={() => props.onClose()}
              ></Button>
              <Button
                style={styles.saveButton}
                title="Save" disabled={false}
                onPress={() => handleSubmit()}
              ></Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

function ToggleButton(props) {
  const [option, setOption] = useState(props.startIndex ? props.startIndex : 0)
  const options = props.options

  const toggleOptions = () => {
    const newValue = (option + 1) % options.length
    console.log(newValue)
    props.onOptionChange(newValue)
    setOption(newValue)
  }

  return (
    <Button onPress={() => toggleOptions()} title={options[option]} />
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    height: '50%',
    marginTop: 'auto',
    marginHorizontal: 'auto',
    width: '100%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  saveButton: {
    alignItems: "right",
  },
  input: {
    height: 50,
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30,
  },
});