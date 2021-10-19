import React from "react"
import CoolText from "../components/CoolText"
import useLocalStorageState from "../hooks/useLocalStorageState"
import useSystemClock, { ClockPrecision } from "../hooks/useSystemClock"
import ALL_TIME_ZONES from "../ref/allTimeZones"

const CURRENT_TIMEZONE = Intl.DateTimeFormat([]).resolvedOptions().timeZone

export default function Timezone() {
  const systemDate = useSystemClock(ClockPrecision.SECOND)
  const [validTimezone, setValidTimezone] = useLocalStorageState("timezone.alternate_timezone", "America/Los_Angeles")

  const localTime = timeInZone(CURRENT_TIMEZONE, systemDate)
  const alternateTime = timeInZone(validTimezone, systemDate)

  return (
    <>
      <div><CoolText>Your time ({CURRENT_TIMEZONE}) is {localTime}</CoolText></div>
      <div><CoolText>Choose another timezone <select value={validTimezone} onChange={(e) => setValidTimezone(e.target.value)}>
          {ALL_TIME_ZONES.map((tz) => <option value={tz}>{tz}</option>)}
        </select></CoolText></div>
      <div><CoolText>The time in {validTimezone} is {alternateTime}</CoolText></div>
    </>
  )
}

function timeInZone(timeZone: string, date: Date) {
  return Intl.DateTimeFormat([], { timeZone, timeStyle: "full" }).format(date)
}
