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
import Tag from "./Tag.js"

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
    if (!props.disabled) {
      props.onItemPress(item.title, item.intimacy, item.id)
    }
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
          disabled={props.disabled}
          onPress={() => handleItemPress(props.item)}
          style={styles.rowFront}
          underlayColor={'lightgrey'}
        >
          <View style={styles.oneLine} >
            <Text style={styles.rowFrontText} >{props.item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Tag color={"red"} title="Climbing" style={{ marginHorizontal: 2 }} />
              <Tag color={"blue"} title="UCSC" style={{ marginHorizontal: 2 }} />
            </View>
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
        disableLeftSwipe={props.disabled}
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

const row_height = 30
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },
  rowFrontText: {
    alignSelf: 'center',
  },
  rowBack: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'space-between',
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
  oneLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})