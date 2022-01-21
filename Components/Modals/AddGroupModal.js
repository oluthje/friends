import React, { useState } from 'react'
import {
  StyleSheet,
} from 'react-native'
import * as Constants from "../../constants.js"
import GroupModal from "./GroupModal.js"

export default function AddFriendModal(props) {
  const [name, setName] = useState("")
  const [color, setColor] = useState(Constants.COLORS[0])

  const handleSubmit = () => {
    if (name !== "") {
      props.onSubmit(name, color)
      props.onClose()
      setName("")
      setColor(Constants.COLORS[0])
    }
  }

  return (
    <GroupModal
      visible={props.visible}
      onClose={props.onClose}
      name={name}
      setName={setName}
      handleSubmit={handleSubmit}
      handleSetColor={setColor}
    />
  )
}

const styles = StyleSheet.create({
});