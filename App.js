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
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getSavedObjs(Constants.FRIENDS_KEY, setFriends)
    getSavedObjs(Constants.GROUPS_KEY, setGroups)
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

  const handleAddGroup = (name, color) => {
    var group = new Constants.Group(name, color, [])
    setGroups(groups => [...groups, group])
    saveObjs(Constants.GROUPS_KEY, [...groups, group])
  }

  const handleEditGroup = (ids, id) => {
    let newGroups = [...groups]

    for (index in groups) {
      if (groups[index].id == id) {
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

  return (
    <NavigationContainer>
      <Tabs
        commonProps={{
          friends: friends,
          onAddFriend: handleAddFriend,
          onEditFriend: handleEditFriend,
          onRemoveFriend: handleRemoveFriend,
          groups: groups,
          onAddGroup: handleAddGroup,
          onEditGroup: handleEditGroup,
          onRemoveGroup: handleRemoveGroup,
        }}
      />
    </NavigationContainer>
  )
}

function Tabs({ commonProps }) {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen name="Friends" children={props => <FriendsTab commonProps={commonProps} {...props} />} />
      <Tab.Screen name="Groups" children={props => <GroupsTab commonProps={commonProps} {...props} />} />
    </Tab.Navigator>
  )
}

export default App