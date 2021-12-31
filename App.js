import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { saveObjs, getSavedObjs } from "./datastorage.js"
import * as Constants from "./constants.js"
import FriendsTab from "./Components/Tabs/FriendsTab"
import GroupsTab from "./Components/Tabs/GroupsTab"

const App = () => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    getSavedObjs(Constants.FRIENDS_KEY, setFriends)
  }, [])

  const handleAddFriend = (name, intimacy) => {
    var friend = new Constants.Friend(name, intimacy, [])
    setFriends(friends => [...friends, friend])
    saveObjs(Constants.FRIENDS_KEY, [...friends, friend])
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
    saveObjs(Constants.FRIENDS_KEY, newFriends)
  }

  const handleRemoveFriend = (friend) => {
    const new_friends = friends.filter(item => item.name !== friend.name)
    setFriends(new_friends)
    saveObjs(Constants.FRIENDS_KEY, new_friends)
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

function Tabs(props) {
  const commonProps = {
    friends: props.friends,
    onAddFriend: props.onAddFriend,
    onEditFriend: props.onEditFriend,
    onRemoveFriend: props.onRemoveFriend,
  }

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen name="Friends" children={props => <FriendsTab commonProps={commonProps} {...props} />} />
      <Tab.Screen name="Groups" children={props => <GroupsTab commonProps={commonProps} {...props} />} />
    </Tab.Navigator>
  )
}

export default App;
