import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { saveObjs, getSavedObjs } from "./datastorage.js"
import * as Constants from "./constants.js"
import FriendsTab from "./Components/Tabs/FriendsTab"
import GroupsTab from "./Components/Tabs/GroupsTab"
import CheckInsTab from "./Components/Tabs/CheckInsTab"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const App = () => {
  const [friends, setFriends] = useState([])
  const [groups, setGroups] = useState([])

  useEffect(() => {
    getSavedObjs(Constants.FRIENDS_KEY, setFriends)
    getSavedObjs(Constants.GROUPS_KEY, setGroups)
  }, [])

  const handleAddFriend = (name, intimacy, checkInInterval) => {
    var friend = new Constants.Friend(name, intimacy, [], checkInInterval, new Date())
    setFriends(friends => [...friends, friend])
    saveObjs(Constants.FRIENDS_KEY, [...friends, friend])
  }

  const handleEditFriend = (name, intimacy, id, groupIds, checkInInterval) => {

    // update friend
    let newFriends = [...friends]
    for (index in friends) {
      if (friends[index].id == id) {
        newFriends[index].name = name
        newFriends[index].intimacy = intimacy
        if (checkInInterval != newFriends[index].checkInInterval) {
          newFriends[index].checkInInterval = checkInInterval
          newFriends[index].checkInStartDate = new Date()
        }
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

  const handleCheckInFriend = (checkInFriend) => {
    let newFriends = [...friends]

    // if todays date not present in checkins, add date
    friends.forEach(friend => {
      if (friend.id == checkInFriend.id) {
        let dates = friend.checkInDates

        if (dates instanceof Array) {
          const sameDates = dates.filter(date => new Date(date).toDateString() == new Date().toDateString())
          if (sameDates.length == 0) {
            friend.checkInDates = [...friend.checkInDates, new Date()]
          }
        } else {
          friend.checkInDates = [new Date()]
        }

        setFriends(newFriends)
        saveObjs(Constants.FRIENDS_KEY, newFriends)
      }
    })
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
        checkInProps={{
          onCheckInFriend: handleCheckInFriend,
        }}
      />
    </NavigationContainer>
  )
}

function Tabs({ commonProps, checkInProps }) {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator
      tabBarPosition={'bottom'}
      initialRouteName={'Friends'}
      screenOptions={{
        headerStyle: { backgroundColor: Constants.THEME.HEADER },
        headerTitleStyle: { color: "white" },
        tabBarStyle: { backgroundColor: Constants.THEME.HEADER },
        tabBarIndicatorStyle: { height: 0 },
        tabBarLabelStyle: { marginBottom: 10 },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#555",
      }}
    >
      <Tab.Screen
        name="Check Ins"
        children={props => <CheckInsTab checkInProps={checkInProps} commonProps={commonProps} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        children={props => <FriendsTab commonProps={commonProps} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
        />
      <Tab.Screen
        name="Groups"
        children={props => <GroupsTab commonProps={commonProps} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default App