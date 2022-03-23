import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import * as Constants from "../../constants.js"
import Card from "../Card.js"
import EditFriendModal from "../Modals/EditFriendModal.js"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Checkmark from "../Checkmark.js"

export default function CheckInsTab(props) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [uncheckedInFriends, setUncheckedInFriends] = useState([])
  const [checkedInFriends, setCheckedInFriends] = useState([])
  const [friendProps, setFriendProps] = useState({})
  const commonProps = props.commonProps
  const friends = commonProps.friends
  const groups = commonProps.groups

  useEffect(() => {
    setupCheckInFriends()
  }, [friends])

  const handleEditFriend = (name, intimacy, id, checkInInterval) => {
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
      checkInInterval: checkInInterval,
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

          const deadline = getDeadline(friend.checkInStartDate, friend.checkInInterval, friend.checkInDates)
          const daysSinceCheckIn = (new Date() - lastCheckIn) / (24 * 60 * 60 * 1000)

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

  function daysBetween(dateStart, dateEnd) {
    const days = (dateEnd - dateStart) / (24 * 60 * 60 * 1000)
    return isNaN(days) ? 1 : days
  }

  function getTimeLeft(dateEnd) {
    const days_left = daysBetween(new Date(), dateEnd)

    if (days_left < 7) {
      return `${Math.floor(days_left)} days left`
    } else if (days_left < 30) {
      return `${Math.floor(days_left / 7)} weeks left`
    } else if (days_left < 365) {
      return `${Math.floor(days_left / 30)} months left`
    } else {
      return `${Math.floor(days_left / 365)} years left`
    }
  }

  function getDeadline(checkInStartDate, checkInInterval, checkInDates) {
    const lastCheckIn = checkInDates.length > 0 ? checkInDates[checkInDates.length - 1] : checkInStartDate
    const days = daysBetween(checkInStartDate, lastCheckIn)
    const interval = Constants.CHECK_IN_INTERVAL_DAYS[checkInInterval]
    return addDays(checkInStartDate, (Math.ceil(days / interval) + 1) * interval)
  }

  const renderItem = ({item}, checkIn) => {
    const deadline = getDeadline(item.checkInStartDate, item.checkInInterval, item.checkInDates)
    const lastCheckIn = item.checkInDates.length > 0 ? new Date(item.checkInDates[item.checkInDates.length - 1]).toDateString() : null
    const title = checkIn ? "Check In" : "Undo Check In"

    return (
      <TouchableOpacity
        onPress={() => handleEditFriend(item.name, item.intimacy, item.id, item.checkInInterval)}
      >
        <View style={styles.rowContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Checkmark color={Constants.THEME.BUTTON} checked={!checkIn} onPress={() => props.checkInProps.onCheckInFriend(item)} />
            <View>
              <Text>{item.name}</Text>
              <View style={styles.oneLine}>
                <Text style={[styles.subtext, { color: Constants.THEME.BUTTON }]}>{getTimeLeft(deadline)}</Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            {lastCheckIn != null ? <Text style={styles.subtext}>Last check in: {lastCheckIn.slice(4)}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const renderCard = ({item, index}) => (
    <Card title={item}>
      <FlatList
        data={index == 0 ? uncheckedInFriends : checkedInFriends}
        renderItem={(item) => renderItem(item, index == 0)}
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
      <EditFriendModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={commonProps.onEditFriend}
        friend={friendProps}
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
  subtext: {
    fontSize: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});