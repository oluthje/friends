import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
  Button,
} from 'react-native'
import * as Constants from "../../constants.js"
import Card from "../Card.js"
import EditFriendModal from "../Modals/EditFriendModal.js"

export default function CheckInsTab(props) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [uncheckedInFriends, setUncheckedInFriends] = useState([])
  const [checkedInFriends, setCheckedInFriends] = useState([])
  const commonProps = props.commonProps
  const friends = commonProps.friends
  const groups = commonProps.groups

  useEffect(() => {
    setupCheckInFriends()
  }, [friends])

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

  const setupCheckInFriends = () => {
    var checkedInFriends = []
    var uncheckedInFriends = []

    friends.forEach(friend => {
      if (friend.checkInInterval != null && friend.checkInInterval != 0) {

        if (friend.checkInDates instanceof Array) {
          
          const lastCheckIn = friend.checkInDates[friend.checkInDates.length - 1]

          if (new Date(lastCheckIn).toDateString() != new Date().toDateString()) {
            uncheckedInFriends.push(friend)
          } else {
            checkedInFriends.push(friend)
          }

        } else {
          uncheckedInFriends.push(friend)
        }
      }
    })
    setCheckedInFriends(checkedInFriends)
    setUncheckedInFriends(uncheckedInFriends)
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
    const lastCheckIn = item.checkInDates ? new Date(item.checkInDates[item.checkInDates.length - 1]).toDateString() : 'None'

    return (
      <View style={{ marginBottom: 15 }}>
        <View style={styles.oneLine}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.oneLine}>
          <Text>{timeLeft(deadline)}</Text>
          <Button onPress={() => props.checkInProps.onCheckInFriend(item)} title="Check In" />
        </View>
        <Text>Last check in: {lastCheckIn.slice(4)}</Text>
      </View>
    )
  }

  const renderCard = ({item, index}) => (
    <Card title={item}>
      <FlatList
        data={index == 0 ? uncheckedInFriends : checkedInFriends}
        renderItem={renderItem}
      />
    </Card>
  )

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={["Check Ins", "Completed Check Ins"]}
          renderItem={renderCard}
          style={styles.cardsContainer}
        />
    </SafeAreaView>
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