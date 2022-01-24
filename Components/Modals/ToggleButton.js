import React from 'react'
import {
  Button,
} from 'react-native'
import * as Constants from "../../constants.js"

export default function ToggleButton(props) {
  const options = props.options
  const index = props.index

  const toggleOptions = () => {
    const newIndex = (index + 1) % options.length
    props.onOptionChange(newIndex)
  }

  return (
    <Button onPress={() => toggleOptions()} title={options[index]} color={Constants.THEME.BUTTON} />
  )
}