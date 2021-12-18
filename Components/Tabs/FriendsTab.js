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
import HalfModal from "../HalfModal"
import Card from "../Card.js"
import AddFriendModal from "../AddFriendModal.js"
import EditFriendModal from "../EditFriendModal.js"

export default function FriendsTab(props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [friendProps, setFriendProps] = useState({})
  const commonProps = props.commonProps
  const friends = commonProps.friends

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

  const handleEditFriend = (name, intimacy, id) => {
    setFriendProps({
      name: name,
      intimacy: intimacy,
      id: id,
    })
    setShowEditModal(true)
  }

  const renderCard = ({ item, index }) => (
    <Card title={item[0].intimacy} key={index}>
      <FriendsList
        elements={item}
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
        // name={friendProps ? friendProps.name : null}
        // intimacy={friendProps ? friendProps.intimacy : null}
        // id={friendProps ? friendProps.id : null}
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
  }
});