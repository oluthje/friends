import React from 'react'
import {
  StyleSheet,
  View,
  Modal,
} from 'react-native'

export default function HalfModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {props.onClose()}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props.children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 15,
    height: '70%',
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
});