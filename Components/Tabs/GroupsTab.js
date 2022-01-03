import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import { saveObjs, getSavedObjs } from "../../datastorage.js"
import AddGroupModal from "../Modals/AddGroupModal.js"
import SelectFriendsModal from "../Modals/SelectFriendsModal.js"
import Card from "../Card"
import * as Constants from "../../constants.js"
import ActionButton from 'react-native-action-button'
import FriendsList from "../FriendsList"
import Tag from "../Tag.js"

export default function GroupsTab(props) {
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [showFriendsModal, setShowFriendsModal] = useState(false)
  const [friendIds, setFriendIds] = useState([])
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState()

  useEffect(() => {
    getSavedObjs(Constants.GROUPS_KEY, setGroups)
  }, [])

  const handleAddGroup = (name, color) => {
    var group = new Constants.Group(name, color, [])
    setGroups(groups => [...groups, group])
    saveObjs(Constants.GROUPS_KEY, [...groups, group])
  }

  const handleUpdateGroupFriends = (ids) => {
    let newGroups = [...groups]

    for (index in groups) {
      if (groups[index].id == selectedGroup.id) {
        newGroups[index].friends = ids
        break
      }
    }
    
    setGroups(newGroups)
    saveObjs(Constants.GROUPS_KEY, newGroups)
  }

  const handleRemoveGroup = (group) => {
    const new_groups = groups.filter(item => item.id !== group.id)
    setGroups(new_groups)
    saveObjs(Constants.GROUPS_KEY, new_groups)
  }

  const createGroupDeleteAlert = (group) =>
    Alert.alert(
      `Delete the group '${group.name}'?`,
      "",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => handleRemoveGroup(group) }
      ]
    );

  const setUpFriendsModal = group => {
    setShowFriendsModal(true)
    setSelectedGroup(group)
    setFriendIds(group.friends ? group.friends : [])
  }

  const getFriendsByIds = ids => {
    let friends = []
    for (i in props.commonProps.friends) {
      const friend = props.commonProps.friends[i]
      if (ids.includes(friend.id)) {
        friends.push(friend)
      }
    }
    return friends
  }

  const cards = groups.map((group) =>
    <Card onLongPress={() => createGroupDeleteAlert(group)}>
      <View style={styles.oneLine} >
        <Text style={{ fontWeight: 'bold', margin: 5, }} >{group.name}</Text>
        <Tag color={group.color} width="13%" />
      </View>
      <View>
        <FriendsList
          disabled={true}
          elements={getFriendsByIds(group.friends)}
        />
        <View style={{alignSelf: "flex-end"}} >
          <Button title={"Edit"} onPress={() => setUpFriendsModal(group)} ></Button>
        </View>
      </View>
    </Card>
  )

  return (
    <View style={styles.container} >
      {groups.length === 0 ? <Text style={styles.hintText} >Try adding a group!</Text> : null}
      <View style={styles.cardsContainer} >
        {cards}
      </View>
      <AddGroupModal
        visible={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onSubmit={handleAddGroup}
        placeholder="New Group"
      />
      <SelectFriendsModal
        visible={showFriendsModal}
        onClose={() => setShowFriendsModal(false)}
        onSubmit={handleUpdateGroupFriends}
        friendIds={friendIds}
        setFriendIds={setFriendIds}
        friends={props.commonProps.friends}
      />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
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