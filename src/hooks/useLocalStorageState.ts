import { useCallback, useState } from "react"

/// Works like `useState`, except values are persisted to localStorage.
export default function useLocalStorageState<S>(key: string, defaultValue: S, serialize: (state: S) => any = (v) => v, deserialize: (localStoageObj: any) => S = (v) => v) {

  // getLocalObject doesn't differentiate between explicitly setting null
  // and state that's never been set. Use isLocalObjectPopulated to affirmatively
  // determine whether state has ever been set.
  const initialValue = isLocalObjectPopulated(key) ? deserialize(getLocalObject(key)) : defaultValue
  const [state, setState] = useState(initialValue)

  const setLocalStorageState = useCallback((newValue: S) => {
    const normalizedValue = serialize(newValue)
    setLocalObject(key, normalizedValue)
    setState(newValue)
  }, [])

  const resetLocalStorageState = useCallback(() => {
    removeLocalObject(key)
  }, [])

  return [state, setLocalStorageState, resetLocalStorageState] as const
}

/// Deserialize the json object stored in local storage
function getLocalObject(key: string) {
  if (typeof window === "undefined") return null
  const value = window.localStorage.getItem(key)
  return JSON.parse(value)
}

/// Returns `true` if this key has never been populated.
function isLocalObjectPopulated(key: string) {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(key) !== null
}

/// Set a JSON object to local storage state
function setLocalObject(key: string, obj: any) {
  if (typeof window === "undefined") return
  const stringified = JSON.stringify(obj)
  return window.localStorage.setItem(key, stringified)
}

/// Removes the value at this key from storage
function removeLocalObject(key: string) {
  if (typeof window === "undefined") return
  return window.localStorage.removeItem(key)
}

export const dateSerilaizer = (date: Date) => {
  if (date === null) { return null }
  return date.getTime()
}

export const dateDeserializer = (ms: number | null) => {
  if (ms === null) { return null }
  return new Date(ms)
}

export const arraySerializer = <T>(elementSerializer: (el: T) => any) => {
  return (array: T[]) => {
    return array.map(elementSerializer)
  }
}

export const arrayDeserializer = <T>(elementDeserializer: (el: any) => T) => {
  return (array: any[]) => {
    return array.map(elementDeserializer)
  }
}