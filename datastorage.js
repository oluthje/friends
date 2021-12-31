import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveObjs = async (key, objs) => {
  console.log()
  console.log(key)
  console.log(objs)
  var objectStrings = []
  for (key in objs) {
    objectStrings.push(JSON.stringify(objs[key]))
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

    for (key in parsedValues) {
      const group = JSON.parse(parsedValues[key])
      parsedObjs.push(group)
    }
    
    // return parsedObjs
    console.log("SAVED STUFF")
    console.log(parsedObjs)
    setValue(parsedObjs)
  } catch(e) {
    // error
  }
}