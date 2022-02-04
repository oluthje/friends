import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AddGroupModal from "../Modals/AddGroupModal.js"
import EditGroupModal from "../Modals/EditGroupModal.js"
import Card from "../Card"
import * as Constants from "../../constants.js"
import ActionButton from 'react-native-action-button'
import FriendsList from "../FriendsList"
import Tag from "../Tag.js"

export default function GroupsTab({ commonProps }) {
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [showFriendsModal, setShowFriendsModal] = useState(false)
  const [friendIds, setFriendIds] = useState([])
  const [selectedGroup, setSelectedGroup] = useState()
  const groups = commonProps.groups

  const createGroupDeleteAlert = (group) =>
    Alert.alert(
      `Delete the group '${group.name}'?`,
      "",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => commonProps.onRemoveGroup(group) }
      ]
    );

  const setUpFriendsModal = group => {
    setShowFriendsModal(true)
    setSelectedGroup(group)
    setFriendIds(group.friends ? group.friends : [])
  }

  const getFriendsByIds = ids => {
    let friends = []
    for (i in commonProps.friends) {
      const friend = commonProps.friends[i]
      if (ids.includes(friend.id)) {
        friends.push(friend)
      }
    }
    return friends
  }

  const renderCard = ({ item, index }) => (
    <Card onLongPress={() => createGroupDeleteAlert(item)} key={index} >
      <View style={styles.oneLine} >
        <Text style={{ fontWeight: 'bold', fontSize: Constants.CARD_TITLE_FONTSIZE }} >{item.name}</Text>
        <Tag style={{ height: 19, margin: 0 }} color={item.color} width="10%" />
      </View>
      <View style={styles.oneLine}>
        <FriendsList
          disabled={true}
          elements={getFriendsByIds(item.friends)}
        />
        <View style={{alignSelf: "flex-end"}} >
          <Button title={"Edit"} color={Constants.THEME.BUTTON} onPress={() => setUpFriendsModal(item)} ></Button>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container} >
      {groups.length === 0 ? <Text style={styles.hintText} >Try adding a group!</Text> : null}
      <SafeAreaView style={styles.container} >
        <FlatList
          data={groups}
          renderItem={renderCard}
          style={styles.cardsContainer}
        />
      </SafeAreaView>
      <AddGroupModal
        visible={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onSubmit={commonProps.onAddGroup}
        placeholder="New Group"
      />
      <EditGroupModal
        visible={showFriendsModal}
        onClose={() => setShowFriendsModal(false)}
        onSubmit={commonProps.onEditGroup}
        friendIds={friendIds}
        setFriendIds={setFriendIds}
        friends={commonProps.friends}
        group={selectedGroup ? selectedGroup : false}
      />
      <ActionButton
        buttonColor={Constants.THEME.BUTTON}
        onPress={() => setShowGroupModal(true)}
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
  hintText: {
    color: 'grey',
    textAlign: 'center',
  },
  oneLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});