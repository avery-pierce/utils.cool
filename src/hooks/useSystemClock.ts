import { useEffect, useState } from "react";

export enum ClockPrecision {
  SECOND,
  MINUTE,
  HOUR,
}

/// Returns the current system time, updating only when the value at precision changes.
/// The effect is that this hook triggers a re-render in sync with the system clock time.
export default function useSystemClock(precision: ClockPrecision = ClockPrecision.SECOND) {
  const [cachedTime, setCachedTime] = useState(new Date())

  useEffect(() => {

    let handle: NodeJS.Timeout

    const scheduleUpdate = () => {
      const delay = millisecondsUntilNextUpdate(new Date(), precision)
      handle = setTimeout(() => {
        setCachedTime(new Date())
        scheduleUpdate()
      }, delay)
    }

    scheduleUpdate()
    return () => clearTimeout(handle)
  }, [precision])

  return cachedTime
}

function millisecondsUntilNextUpdate(referenceDate: Date = new Date(), precision: ClockPrecision) {
  const millisecondsUntilNextSecond = 1000 - referenceDate.getMilliseconds()
  if (precision === ClockPrecision.SECOND) {
    return millisecondsUntilNextSecond
  }

  const secondsUntilNextMinute = 60 - referenceDate.getSeconds()
  if (precision === ClockPrecision.MINUTE) {
    return (secondsUntilNextMinute * 1000) - referenceDate.getMilliseconds()
  }

  const minutesUntilNextHour = 60 - referenceDate.getMinutes()
  if (precision === ClockPrecision.HOUR) {
    return (minutesUntilNextHour * 60 * 1000) -
      referenceDate.getSeconds() -
      referenceDate.getMilliseconds()
      
  }

  return null
}