import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Constants from "./constants.js"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Dashboard from "./Components/Tabs/Dashboard"
import FriendsTab from "./Components/Tabs/FriendsTab"
import GroupsTab from "./Components/Tabs/GroupsTab"
import uuid from 'react-native-uuid'

export function Friend(name, intimacy, groups) {
  this.name = name
  this.intimacy = intimacy
  this.groups = groups
  this.id = uuid.v4()
}

const App = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriends()
    setFriends([])
  }, [])

  const handleAddFriend = (name, intimacy) => {
    var friend = new Friend(name, intimacy, [])
    setFriends(friends => [...friends, friend])
    saveFriends([...friends, friend])
  }

  const handleEditFriend = (name, intimacy, id) => {
    let newFriends = [...friends]

    for (index in friends) {
      if (friends[index].id == id) {
        newFriends[index].name = name
        newFriends[index].intimacy = intimacy
        break
      }
    }
    
    setFriends(newFriends)
    saveFriends(newFriends)
  }

  const handleRemoveFriend = (friend) => {
    const new_friends = friends.filter(item => item.name !== friend.name)
    setFriends(new_friends)
    saveFriends(new_friends)
  }

  const saveFriends = async (friends) => {
    var objectStrings = []
    for (key in friends) {
      objectStrings.push(JSON.stringify(friends[key]))
    }

    try {
      const jsonValue = JSON.stringify(objectStrings)
      await AsyncStorage.setItem("@friends", jsonValue)
    } catch (e) {

    }
  }

  const getFriends = async () => {
    try {
      const values = await AsyncStorage.getItem("@friends")
      const parsedValues = JSON.parse(values)
      var parsedFriends = []

      for (key in parsedValues) {
        const friend = JSON.parse(parsedValues[key])
        parsedFriends.push(friend)
      }
      
      setFriends(parsedFriends)
    } catch(e) {
      // error
    }
  }

  return (
    <NavigationContainer>
      <Tabs
        friends={friends}
        onAddFriend={handleAddFriend}
        onEditFriend={handleEditFriend}
        onRemoveFriend={handleRemoveFriend}
      />
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator()

function Tabs(props) {
  const commonProps = {
    friends: props.friends,
    onAddFriend: props.onAddFriend,
    onEditFriend: props.onEditFriend,
    onRemoveFriend: props.onRemoveFriend,
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Friends" children={props => <FriendsTab commonProps={commonProps} {...props} />} />
      <Tab.Screen name="Groups" children={props => <GroupsTab commonProps={commonProps} {...props} />} />
    </Tab.Navigator>
  )
}

export default App;
