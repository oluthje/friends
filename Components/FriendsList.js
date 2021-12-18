import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableHighlight,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

export default function elementList(props) {
  const [listData, setListData] = useState()
  const elements = props.elements
  var animationIsRunning = false

  useEffect(() => {
    if (elements) {
      createListData(elements)
    }
  }, [elements])

  const createListData = elements => {
    if (elements) {
      setListData(elements.map((element, index) => ({
        key: `${index}`,
        title: element.name,
        value: new Animated.Value(1),
        intimacy: element.intimacy,
        id: element.id,
      })))
    }
  }

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData
    if (value < -Dimensions.get('window').width && !animationIsRunning) {
      animationIsRunning = true
      Animated.timing(listData[key].value, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setListData(listData.filter(item => item.key !== key))
        props.onRemoveElement(elements[key])
        animationIsRunning = false
      })
    }
  }

  const handleItemPress = (item) => {
    props.onItemPress(item.title, item.intimacy, item.id)
  }

  const renderItem = props => {
    return (
      <Animated.View
        style={[styles.rowFrontContainer, {
            height: props.item.value.interpolate({
              inputRange: [0, 1],
              outputRange: [0, row_height],
            }),
          },
        ]}
      >
        <TouchableHighlight
          onPress={() => handleItemPress(props.item)}
          style={styles.rowFront}
          underlayColor={'#AAA'}
        >
          <View>
            <Text>{props.item.title}</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    )
  }

  const renderHiddenItem = () => {
    return (
      <View style={styles.rowBack}>
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text style={styles.backTextWhite}>Delete</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
    </View>
  )
}

const row_padding = 5
const row_height = 30
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: "white",
    alignItems: "baseline",
    borderRadius: 5,
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 1,
    // elevation: 5,
    // borderColor: 'grey',
    // borderWidth: 1,
    padding: row_padding,
    // marginVertical: 2
  },
  rowBack: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: row_padding,
    marginVertical: 5,
    marginLeft: 5,
  },
  backRightBtn: {
    alignItems: 'center',
    borderRadius: 6,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
})