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

export default function HalfModal(props) {
  const [text, setText] = useState()
  const visible = props.visible

  const handleSubmit = () => {
    if (text !== "") {
      props.onSubmit(text)
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