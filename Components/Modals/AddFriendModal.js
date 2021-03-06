import React, { useState } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import * as Constants from "../../constants.js"
import FriendModal from "./FriendModal.js"

export default function AddFriendModal(props) {
  const [name, setName] = useState("")
  const [intimacyIndex, setIntimacyIndex] = useState(0)
  const [checkInInterval, setCheckInInterval] = useState(0)

  const handleSubmit = () => {
    if (name !== "") {
      props.onSubmit(name, Constants.INTIMACIES[intimacyIndex], checkInInterval)
      props.onClose()
      setName("")
    }
  }

  return (
    <FriendModal
      visible={props.visible}
      onClose={props.onClose}
      name={name}
      setName={setName}
      intimacyIndex={intimacyIndex}
      setIntimacyIndex={setIntimacyIndex}
      checkInInterval={checkInInterval}
      setCheckInInterval={setCheckInInterval}
      handleSubmit={handleSubmit}
    />
  )
}

const styles = StyleSheet.create({
});