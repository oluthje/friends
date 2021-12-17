import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import FriendsList from "../FriendsList"
import HalfModal from "../HalfModal"

export default function Dashboard(props) {
  const [showModal, setShowModal] = useState(false)
  const commonProps = props.commonProps
  const friends = commonProps.friends

  const isDarkMode = useColorScheme() === 'dark'
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <FriendsList elements={friends} onRemoveElement={commonProps.onRemoveFriend}/>
        <HalfModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(friend) => commonProps.onAddFriend(friend)}
          placeholder="New friend"
        />
        <Button title="Add Friend" onPress={() => setShowModal(true)}></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'flex-end',
  },
});