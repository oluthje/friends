import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import * as Constants from "../../constants.js"
import ToggleableTag from "../ToggleableTag.js"
import FriendModal from "./FriendModal.js"

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
    <FriendModal
      visible={props.visible}
      onClose={props.onClose}
      name={name}
      setName={setName}
      intimacyIndex={intimacyIndex}
      setIntimacyIndex={setIntimacyIndex}
      handleSubmit={handleSubmit}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 20 }}>
        {friend.groups ? friend.groups.map((group) =>
          <ToggleableTag
            title={group.name}
            color={group.color}
            key={group.id}
            id={group.id}
            style={{ marginHorizontal: 2 }}
            onTagToggle={handleTagToggle}
            selected={selectedGroupIds ? selectedGroupIds.includes(group.id) : false}
          />
        ) : null}
      </View>
    </FriendModal>
  )
}

const styles = StyleSheet.create({
  groupTagContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 20,
  },
});