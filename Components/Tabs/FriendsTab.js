import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native';
import ActionButton from 'react-native-action-button'
import * as Constants from "../../constants.js"
import FriendsList from "../FriendsList"
import Card from "../Card.js"
import AddFriendModal from "../Modals/AddFriendModal.js"
import EditFriendModal from "../Modals/EditFriendModal.js"

export default function FriendsTab(props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [friendProps, setFriendProps] = useState({})
  const commonProps = props.commonProps
  const friends = commonProps.friends
  const groups = commonProps.groups

  const handleEditFriend = (name, intimacy, id) => {
    let selectedGroupIds = []
    groups.forEach((group) => {
      if (group.friends.includes(id)) {
        selectedGroupIds.push(group.id)
      }
    })

    setFriendProps({
      name: name,
      intimacy: intimacy,
      id: id,
      groups: groups,
      selectedGroupIds: selectedGroupIds,
    })
    setShowEditModal(true)
  }

  const getIntimacyGroups = () => {
    var friendGroups = []
    for (key in Constants.INTIMACIES) {
      const intimacy = Constants.INTIMACIES[key]
      const filteredFriends = friends.filter(friend => friend.intimacy == intimacy)
      if (filteredFriends.length > 0) {
        friendGroups.push(filteredFriends)
      }
    }
    return friendGroups
  }

  const getFriendGroupTags = () => {
    let tag_dict = {}
    friends.forEach((friend) => {
      tag_dict[friend.id] = []
    })

    friends.forEach((friend) => {
      groups.forEach((group) => {
        if (group.friends.includes(friend.id)) {
          tag_dict[friend.id].push([group.name, group.color])
        }
      })
    })

    return tag_dict
  }

  const renderCard = ({ item, index }) => (
    <Card title={item[0].intimacy} key={index}>
      <FriendsList
        elements={item}
        tags={getFriendGroupTags()}
        onRemoveElement={commonProps.onRemoveFriend}
        onItemPress={handleEditFriend}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={getIntimacyGroups()}
          renderItem={renderCard}
          style={styles.cardsContainer}
        />
      </SafeAreaView>
      <AddFriendModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={commonProps.onAddFriend}
      />
      <EditFriendModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={commonProps.onEditFriend}
        friend={friendProps}
      />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => setShowAddModal(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    margin: 20,
  },
});