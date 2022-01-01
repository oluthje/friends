import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import { saveObjs, getSavedObjs } from "../../datastorage.js"
import AddGroupModal from "../Modals/AddGroupModal"
import Card from "../Card"
import * as Constants from "../../constants.js"
import ActionButton from 'react-native-action-button'

export default function GroupsTab(props) {
  const [showModal, setShowModal] = useState(false)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getSavedObjs(Constants.GROUPS_KEY, setGroups)
  }, [])

  const handleAddGroup = (name, color) => {
    var group = new Contants.Group(name, color)
    setGroups(groups => [...groups, group])
    saveObjs(Constants.GROUPS_KEY, [...groups, group])
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

  const cards = groups.map((group) =>
    <Card title={group.name} onLongPress={() => createGroupDeleteAlert(group)}>
      <View>
        <View style={{alignSelf: "flex-end"}} >
          <Button title={"Add"}></Button>
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
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddGroup}
        placeholder="New Group"
      />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => setShowModal(true)}
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
  }
});