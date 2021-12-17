import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import HalfModal from "../HalfModal"
import Card from "../Card"


export default function GroupsTab() {
  const [showModal, setShowModal] = useState(false)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getGroups()
  }, [])

  const getGroups = async (value) => {
    try {
      const value = await AsyncStorage.getItem('@groups')
      if(value !== null) {
        const parsedValue = JSON.parse(value)
        setGroups(parsedValue)
      }
    } catch(e) {
      // error
    }
  }

  const saveGroups = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@groups', jsonValue)
    } catch (e) {
      // error
    }
  }

  const handleAddGroup = (group) => {
    setGroups(groups => [...groups, group])
    saveGroups([...groups, group])
  }

  const content = (
    <View>
      <View style={{alignSelf: "flex-end"}} >
        <Button title={"Add"}></Button>
      </View>
    </View>
  )

  const cards = groups.map((group) =>
    <Card title={group}>
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
      <HalfModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(group) => handleAddGroup(group)}
        placeholder="New Group"
      />
      <View>
        <Button onPress={() => setShowModal(true)} title={"Add Group"} />
      </View>
    </SafeAreaView>
  );
};

// for each group, make flatlist with two columns

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