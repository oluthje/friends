import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddGroupModal from "../Modals/AddGroupModal"
import Card from "../Card"
import uuid from 'react-native-uuid'

export function Group(name, color) {
  this.name = name
  this.color = color
  this.id = uuid.v4()
}

export default function GroupsTab(props) {
  const [showModal, setShowModal] = useState(false)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getGroups()
  }, [])

  const handleAddGroup = (name, color) => {
    var group = new Group(name, color)
    setGroups(groups => [...groups, group])
    saveGroups([...groups, group])
  }

  const handleRemoveGroup = (group) => {
    const new_groups = groups.filter(item => item.id !== group.id)
    setGroups(new_groups)
    saveGroups(new_groups)
  }

  const saveGroups = async (groups) => {
    var objectStrings = []
    for (key in groups) {
      objectStrings.push(JSON.stringify(groups[key]))
    }

    try {
      const jsonValue = JSON.stringify(objectStrings)
      await AsyncStorage.setItem("@groups", jsonValue)
    } catch (e) {

    }
  }

  const getGroups = async () => {
    try {
      const values = await AsyncStorage.getItem("@groups")
      const parsedValues = JSON.parse(values)
      var parsedGroups = []

      for (key in parsedValues) {
        const group = JSON.parse(parsedValues[key])
        parsedGroups.push(group)
      }
      
      setGroups(parsedGroups)
    } catch(e) {
      // error
    }
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