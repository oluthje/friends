import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import { saveObjs, getSavedObjs } from "../../datastorage.js"
import AddGroupModal from "../Modals/AddGroupModal"
import Card from "../Card"
import uuid from 'react-native-uuid'
import * as Constants from "../../constants.js"

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

  const content = (
    <View>
      <View style={{alignSelf: "flex-end"}} >
        <Button title={"Add"}></Button>
      </View>
    </View>
  )

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
    <SafeAreaView style={styles.container} >
      {groups.length === 0 ? <Text style={styles.hintText} >Try adding a group!</Text> : null}
      {cards}
      <AddGroupModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddGroup}
        placeholder="New Group"
      />
      <View>
        <Button onPress={() => setShowModal(true)} title={"Add Group"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
  },
  hintText: {
    color: 'grey',
    textAlign: 'center',
  }
});