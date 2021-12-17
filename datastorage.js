import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(parsedValues)
    await AsyncStorage.setItem('@' + key, jsonValue)
  } catch (e) {
    // error
  }
}

export const getData = async (key) => {
  console.log("try get DS value")
  try {
    const value = await AsyncStorage.getItem("@friends")//'@' + key)
    console.log("DS value: ")
    console.log(value)
    // if(value !== null) {
    //   const parsedValue = JSON.parse(value)
    //   return parsedValue
    // }
    return value
  } catch(e) {
    // error
  }
}

export const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
}


// store objects in array in useState

// when saving, convert each object to string, then add string to array to be saved.