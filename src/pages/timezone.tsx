import React from "react"
import CoolText from "../components/CoolText"
import useSystemClock, { ClockPrecision } from "../hooks/useSystemClock"

export default function Timezone() {
  const systemDate = useSystemClock(ClockPrecision.SECOND)
  const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <>
      <div><CoolText>The current time is {systemDate.toLocaleString()}</CoolText></div>
      <div><CoolText>{timezoneName}</CoolText></div>
    </>
  )
}
