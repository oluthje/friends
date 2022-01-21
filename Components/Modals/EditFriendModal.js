import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableHighlight,
} from 'react-native'
import * as Constants from "../../constants.js"
import HalfModal from "./HalfModal.js"
import ToggleButton from "./ToggleButton.js"
import ToggleableTag from "../ToggleableTag.js"

export default function EditFriendModal(props) {
  const [name, setName] = useState("")
  const [intimacyIndex, setIntimacyIndex] = useState(0)
  const [selectedGroupIds, setSelectedGroupIds] = useState([])
  const friend = props.friend

  useEffect(() => {
    setName(friend.name)
    setSelectedGroupIds(friend.selectedGroupIds)

    for (index in Constants.INTIMACIES) {
      if (Constants.INTIMACIES[index] == friend.intimacy) {
        setIntimacyIndex(index)
        break
      }
    }
  }, [friend])

  const handleSubmit = () => {
    if (name !== "") {
      props.onSubmit(name, Constants.INTIMACIES[intimacyIndex], friend.id, selectedGroupIds)
      props.onClose()
      setName("")
    }
  }

  const handleTagToggle = (id) => {
    if (selectedGroupIds.includes(id)) {
      setSelectedGroupIds(selectedGroupIds.filter(groupId => groupId !== id))
    } else {
      setSelectedGroupIds([...selectedGroupIds, id])
    }
  }

  return (
    <HalfModal visible={props.visible} onClose={props.onClose} >
      <TextInput
        style={styles.input}
        onChangeText={setName}
        onEndEditing={() => handleSubmit()}
        value={name}
        placeholder={"Edit friend"}
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 20 }}>
        {friend.groups ? friend.groups.map((group) =>
          <ToggleableTag
            title={group.name}
            color={group.color}
            key={group.id}
            id={group.id}
            style={{ marginHorizontal: 2 }}
            onTagToggle={handleTagToggle}
            selected={selectedGroupIds.includes(group.id)}
          />
        ) : null}
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
  groupTagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 20,
  },
});