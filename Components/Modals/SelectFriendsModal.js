import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native'
import * as Constants from "../../constants.js"
import HalfModal from "./HalfModal.js"

export default function SelectFriendsModal(props) {
  const friendIds = props.friendIds
  const friends = props.friends
  const setFriendIds = props.setFriendIds
  const groupId = props.groupId

  const handleSubmit = () => {
    props.onSubmit(friendIds, groupId)
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
    <HalfModal visible={props.visible} onClose={props.onClose} >
      <View style={styles.container}>
        {items(true)}
        <View style={styles.dividor} />
        {items(false)}
        <View style={{ flexDirection:"row" }}>
          <Button
            title="Cancel"
            onPress={() => props.onClose()}
          />
          <Button
            title="Save" disabled={false}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </HalfModal>
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