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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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

  const handleEditFriend = (name, intimacy, id, groupIds) => {

    // update friend
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

    /*
    update groups for each group, if group doesn't have (friend)id add friend.
    Else remove friend
    */
    let newGroups = [...groups]
    newGroups.forEach((group) => {
      if (groupIds.includes(group.id)) {
        if (!group.friends.includes(id)) {
          group.friends = [...group.friends, id]
        }
      } else {
        if (group.friends.includes(id)) {
          group.friends = group.friends.filter(friendId => friendId !== id)
        }
      }
    })
    setGroups(newGroups)
    saveObjs(Constants.GROUPS_KEY, newGroups)
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

  const handleEditGroup = (name, color, id, friendIds) => {
    let newGroups = [...groups]

    for (index in groups) {
      if (groups[index].id == id) {
        newGroups[index].name = name
        newGroups[index].color = color
        newGroups[index].friends = friendIds
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
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Constants.THEME.HEADER,
        },
        headerTitleStyle: {
          color: "white",
        },
        tabBarStyle: {
          backgroundColor: Constants.THEME.HEADER,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#555",
      }}
    >
      <Tab.Screen
        name="Friends"
        children={props => <FriendsTab commonProps={commonProps} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen
        name="Groups"
        children={props => <GroupsTab commonProps={commonProps} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default App