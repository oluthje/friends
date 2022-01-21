import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native'
import * as Constants from "../../constants.js"
import GroupModal from "./GroupModal.js"

export default function EditGroupModal(props) {
  const [name, setName] = useState()
  const [color, setColor] = useState(Constants.COLORS[0])
  const friendIds = props.friendIds
  const friends = props.friends
  const setFriendIds = props.setFriendIds
  const group = props.group

  useEffect(() => {
    setName(group.name)
    setColor(group.color)
  }, [group])

  const handleSubmit = () => {
    props.onSubmit(name, color, group.id, friendIds)
    props.onClose()
  }

  const handleFriendPress = (friend) => {
    if (!friendIds.includes(friend.id)) {
      setFriendIds([...friendIds, friend.id])
    } else {
      setFriendIds(friendIds.filter(id => id !== friend.id))
    }
  }

  const items = return_selected => {
    let items = []
    for (i in friends) {
      const friend = friends[i]
      if (return_selected) {
        if (!friendIds.includes(friend.id)) {
          continue
        }
      } else if (friendIds.includes(friend.id)) {
        continue
      }

      items.push(
        <TouchableOpacity key={friend.id} onPress={() => handleFriendPress(friend)} style={styles.item} >
          <Text>{friend.name}</Text>
        </TouchableOpacity>
      )
    }

    return items
  }

  return (
    <GroupModal
      visible={props.visible}
      onClose={props.onClose}
      name={name}
      setName={setName}
      handleSubmit={handleSubmit}
      handleSetColor={setColor}
    >
      <View style={styles.container}>
        {items(true)}
        <View style={styles.dividor} />
        {items(false)}
      </View>
    </GroupModal>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  item: {
    backgroundColor: "white",
    alignItems: "baseline",
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
    padding: 5,
    marginVertical: 2
  },
  dividor: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    margin: 20,
  },
});