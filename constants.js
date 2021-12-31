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

// object creation
export function Group(name, color) {
  this.name = name
  this.color = color
  this.id = uuid.v4()
}
export function Friend(name, intimacy, groups) {
  this.name = name
  this.intimacy = intimacy
  this.groups = groups
  this.id = uuid.v4()
}