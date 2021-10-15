import React, { useState } from "react"
import CoolText from "../components/CoolText"
import useSystemClock, { ClockPrecision } from "../hooks/useSystemClock"

const CURRENT_TIMEZONE = Intl.DateTimeFormat([]).resolvedOptions().timeZone

export default function Timezone() {
  const systemDate = useSystemClock(ClockPrecision.SECOND)
  const [alternateTimeZone, setAlternateTimeZone] = useState("America/Los_Angeles")
  const localTime = timeInZone(CURRENT_TIMEZONE, systemDate)
  const alternateTime = timeInZone(alternateTimeZone, systemDate)

  return (
    <>
      <div><CoolText>Your time ({CURRENT_TIMEZONE}) is {localTime}</CoolText></div>
      <div><CoolText>The time in {alternateTimeZone} is {alternateTime}</CoolText></div>
    </>
  )
}

function timeInZone(timeZone: string, date: Date) {
  return Intl.DateTimeFormat([], { timeZone, timeStyle: "full" }).format(date)
}
