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

// object creation
export function Group(name, color, friends) {
  this.name = name
  this.color = color
  this.friends = friends
  this.id = uuid.v4()
}
export function Friend(name, intimacy, groups) {
  this.name = name
  this.intimacy = intimacy
  this.groups = groups
  this.id = uuid.v4()
}