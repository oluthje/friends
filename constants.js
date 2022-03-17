import {
  StyleSheet,
  PlatformColor,
} from 'react-native'
import uuid from 'react-native-uuid'

// data storage keys
export const FRIENDS_KEY = "friends"
export const GROUPS_KEY = "groups"

// everyhing else
export const INTIMACY = {
	GOOD: "Good",
	MODERATE: "Moderate",
	NEW: "New",
}
export const INTIMACIES = [
	INTIMACY.GOOD,
	INTIMACY.MODERATE,
	INTIMACY.NEW,
]
export const CARD_TITLE_FONTSIZE = 16
export const COLORS = [
  PlatformColor('systemRedColor'),
  PlatformColor('systemOrangeColor'),
  PlatformColor('systemYellowColor'),
  PlatformColor('systemGreenColor'),
  PlatformColor('systemTealColor'),
  PlatformColor('systemBlueColor'),
  PlatformColor('systemIndigoColor'),
  PlatformColor('systemPurpleColor'),
]
export const THEME = {
  HEADER: "#6ECB63",
  BACKGROUND: "#FBF4E9",
  BUTTON: "#6ECB63",
}
export const CHECK_IN_INTERVAL_NAMES = {
  0: "No Check In",
  1: "1 Day",
  2: "Weekly",
  3: "Monthly",
  4: "Quarterly",
  5: "Yearly",
}
export const CHECK_IN_INTERVAL_DAYS = {
  0: 0,
  1: 1,
  2: 7,
  3: 30,
  4: 91,
  5: 365,
}

// object creation
export function Group(name, color, friends) {
  this.name = name
  this.color = color
  this.friends = friends
  this.id = uuid.v4()
}
export function Friend(name, intimacy, groups, checkInInterval, checkInStartDate) {
  this.name = name
  this.intimacy = intimacy
  this.groups = groups
  this.id = uuid.v4()
  this.checkInInterval = checkInInterval
  this.checkInStartDate = checkInStartDate
  this.checkInDates = []
}