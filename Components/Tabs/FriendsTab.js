import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native';
import * as Constants from "../../constants.js"
import FriendsList from "../FriendsList"
import HalfModal from "../HalfModal"
import Card from "../Card.js"
import ActionButton from 'react-native-action-button'

export default function FriendsTab(props) {
  const [showModal, setShowModal] = useState(false)
  const commonProps = props.commonProps
  const friends = commonProps.friends

  const getIntimacyGroups = () => {
    var friendGroups = []
    for (key in Constants.INTIMACIES) {
      const intimacy = Constants.INTIMACIES[key]
      const filteredFriends = friends.filter(friend => friend.intimacy == intimacy)
      if (filteredFriends.length > 0) {
        friendGroups.push(filteredFriends)
      }
    }
    return friendGroups
  }

  const renderCard = ({ item, index }) => (
    <Card title={item[0].intimacy} key={index}>
      <FriendsList elements={item} onRemoveElement={commonProps.onRemoveFriend}/>
    </Card>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={getIntimacyGroups()}
          renderItem={renderCard}
          style={styles.cardsContainer}
        />
      </SafeAreaView>
      <HalfModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(friend, intimacy) => commonProps.onAddFriend(friend, intimacy)}
        placeholder="New friend"
      />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => setShowModal(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    margin: 20,
  }
});