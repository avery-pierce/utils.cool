import { useCallback, useState } from "react"

/// Works like `useState`, except values are persisted to localStorage.
export default function useLocalStorageState(key, defaultValue, serialize = (v) => v, deserialize = (v) => v) {

  // getLocalObject doesn't differentiate between explicitly setting null
  // and state that's never been set. Use isLocalObjectPopulated to affirmatively
  // determine whether state has ever been set.
  const initialValue = isLocalObjectPopulated(key) ? deserialize(getLocalObject(key)) : defaultValue
  const [state, setState] = useState(initialValue)

  const setLocalStorageState = useCallback((newValue) => {
    const normalizedValue = serialize(newValue)
    setLocalObject(key, normalizedValue)
    setState(newValue)
  }, [])

  const resetLocalStorageState = useCallback(() => {
    removeLocalObject(key)
  }, [])

  return [state, setLocalStorageState, resetLocalStorageState]
}

/// Deserialize the json object stored in local storage
function getLocalObject(key) {
  const value = localStorage.getItem(key)
  return JSON.parse(value)
}

/// Returns `true` if this key has never been populated.
function isLocalObjectPopulated(key) {
  return localStorage.getItem(key) !== null
}

/// Set a JSON object to local storage state
function setLocalObject(key, obj) {
  const stringified = JSON.stringify(obj)
  return localStorage.setItem(key, stringified)
}

/// Removes the value at this key from storage
function removeLocalObject(key) {
  return localStorage.removeItem(key)
}

export const dateSerilaizer = (date) => {
  if (date === null) { return null }
  return date.getTime()
}

export const dateDeserializer = (ms) => {
  return new Date(ms)
}

export const arraySerializer = (elementSerializer) => {
  return (array) => {
    return array.map(elementSerializer)
  }
}

export const arrayDeserializer = (elementDeserializer) => {
  return (array) => {
    return array.map(elementDeserializer)
  }
}