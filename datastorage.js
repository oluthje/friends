import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveObjs = async (key, objs) => {
  var objectStrings = []
  for (i in objs) {
    objectStrings.push(JSON.stringify(objs[i]))
  }

  try {
    const jsonValue = JSON.stringify(objectStrings)
    await AsyncStorage.setItem("@" + key, jsonValue)
  } catch (e) {

  }
}

export const getSavedObjs = async (key, setValue) => {
  try {
    const values = await AsyncStorage.getItem("@" + key)
    const parsedValues = JSON.parse(values)
    var parsedObjs = []

    for (i in parsedValues) {
      const group = JSON.parse(parsedValues[i])
      parsedObjs.push(group)
    }

    setValue(parsedObjs)
  } catch(e) {
    // error
  }
}