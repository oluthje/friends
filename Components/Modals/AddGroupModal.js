import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  PlatformColor,
  Text,
} from 'react-native'
import * as Constants from "../../constants.js"
import HalfModal from "./HalfModal.js"
import ColorPalette from 'react-native-color-palette'

const COLORS = [
  PlatformColor('systemRedColor'),
  PlatformColor('systemOrangeColor'),
  PlatformColor('systemYellowColor'),
  PlatformColor('systemGreenColor'),
  PlatformColor('systemTealColor'),
  PlatformColor('systemBlueColor'),
  PlatformColor('systemIndigoColor'),
  PlatformColor('systemPurpleColor'),
]

export default function AddFriendModal(props) {
  const [name, setName] = useState("")
  const [color, setColor] = useState(COLORS[0])

  const handleSubmit = () => {
    if (name !== "") {
      props.onSubmit(name, color)
      props.onClose()
      setName("")
      setColor(COLORS[0])
    }
  }

  const handleSetColor = (obj) => {
    setColor(obj)
    console.log(obj)
  }

  return (
    <HalfModal visible={props.visible} onClose={props.onClose} >
      <TextInput
        style={styles.input}
        onChangeText={setName}
        onEndEditing={() => handleSubmit()}
        value={name}
        placeholder={"New group"}
        autoFocus={true}
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
      <View style={{ marginHorizontal: "15%" }}>
        <ColorPalette
          onChange={color => handleSetColor(color)}
          defaultColor={color}
          colors={COLORS}
          title={""}
          icon={
            <Text>√</Text>
          }
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