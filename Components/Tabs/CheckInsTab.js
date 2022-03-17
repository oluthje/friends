import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native'
import ActionButton from 'react-native-action-button'
import * as Constants from "../../constants.js"
import FriendsList from "../FriendsList"
import Card from "../Card.js"
import AddFriendModal from "../Modals/AddFriendModal.js"
import EditFriendModal from "../Modals/EditFriendModal.js"

export default function CheckInsTab(props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [friendProps, setFriendProps] = useState({})
  const commonProps = props.commonProps
  const friends = commonProps.friends
  const groups = commonProps.groups

  const handleEditFriend = (name, intimacy, id) => {
    let selectedGroupIds = []
    groups.forEach((group) => {
      if (group.friends.includes(id)) {
        selectedGroupIds.push(group.id)
      }
    })

    setFriendProps({
      name: name,
      intimacy: intimacy,
      id: id,
      groups: groups,
      selectedGroupIds: selectedGroupIds,
    })
    setShowEditModal(true)
  }

  const getCheckInFriends = () => {
    var checkInFriends = []
    for (key in friends) {
      const friend = friends[key]
      if (friend.checkInInterval != null && friend.checkInInterval != 0) {
        checkInFriends.push(friend)
      }
    }
    return checkInFriends
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function timeLeft(dateEnd) {
    const days_left = (dateEnd - new Date()) / (24 * 60 * 60 * 1000)

    if (days_left < 7) {
      return `${Math.round(days_left)} days left`
    } else if (days_left < 30) {
      return `${Math.round(days_left / 7)} weeks left`
    } else if (days_left < 365) {
      return `${Math.round(days_left / 30)} months left`
    } else {
      return `${Math.round(days_left / 365)} years left`
    }
  }

  const renderItem = ({ item, index }) => {
    const date = new Date(item.checkInStartDate)

    const deadline = addDays(item.checkInStartDate, Constants.CHECK_IN_INTERVAL_DAYS[item.checkInInterval ? item.checkInInterval : 0])
    return (
      <View style={{ marginBottom: 15 }} >
        <View style={styles.oneLine} >
          <Text>{item.name}</Text>
        </View>
        <View style={styles.oneLine} >
          <Text>{timeLeft(deadline)}</Text>
          <Text>Last check in: </Text>
        </View>
      </View>
    )
  }

  const checkInCard = () => (
    <Card>
      <FlatList
        data={getCheckInFriends()}
        renderItem={renderItem}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.cardsContainer}>
          {checkInCard()}
        </View>
      </SafeAreaView>
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
  oneLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});