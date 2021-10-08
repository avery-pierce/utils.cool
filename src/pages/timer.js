import React, { useCallback, useState } from 'react';
import Layout from '../components/Layout'
import CoolMobileFullscreenLayout from '../components/CoolMobileFullscreenLayout';
import useCurrentDate from "../hooks/useCurrentDate"
import CoolText, { CoolTitle } from '../components/CoolText';

const Timer = () => {
  const [startDate, setStartDate] = useState(null)
  const [stopDate, setStopDate] = useState(null)
  const [laps, setLaps] = useState([])
  
  const elapsed = useSecondsElapsed(startDate, stopDate)
  const onStart = useCallback(() => {
    setStartDate(new Date()) 
    setStopDate(null)
    setLaps([])
  }, [])

  const onStop = useCallback(() => {
    setStopDate(new Date())
  }, [])

  const onTapLap = useCallback(() => {
    setLaps((prevLaps) => {
      return [
        ...prevLaps,
        new Date()
      ]
    })
  }, [])

  const isTimerRunning = (!!startDate && !stopDate)

  return (
    <CoolMobileFullscreenLayout>
      <div style={{ padding: "1em", flexGrow: 1 }}>
      </div>
      <div style={{ padding: "1em" }}>
          {laps.map(lapTime => (
              <CoolText style={{display: "block"}}>{deltaS(startDate, lapTime)}s</CoolText>
          ))}
      </div>
      <div style={{ padding: "1em" }}>
        <CoolText bold style={{
          display: "block",
          textAlign: "center",
          fontSize: "60pt",
        }}>{formatTimeInterval(elapsed)}</CoolText>
      </div>
      <StopwatchControls
        onStart={onStart}
        onStop={onStop}
        onLap={onTapLap}
        isTimerRunning={isTimerRunning} />
    </CoolMobileFullscreenLayout>
  )
}

const secondFormatter = new Intl.NumberFormat("en-US", { 
  minimumIntegerDigits: 2, 
  minimumFractionDigits: 2, 
  maximumFractionDigits: 2,
})

function formatTimeInterval(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds = secondFormatter.format(remainingSeconds)
  return `${minutes}:${formattedSeconds}`
}

function StopwatchControls({ onStart, onStop, onLap, isTimerRunning }) {
  return(
    <div style={{ display: "flex", flexDirection: "row" }}>
      {!isTimerRunning && <CoolButton onClick={onStart} style={{ flex: 1, margin: "1em", backgroundColor: "green" }}>Start</CoolButton>}
      {isTimerRunning && <CoolButton onClick={onLap} style={{ flex: 1, margin: "1em", backgroundColor: "blue" }}>Lap</CoolButton>}
      <CoolButton disabled={!isTimerRunning} onClick={onStop} style={{ flex: 1, margin: "1em", marginLeft: 0, backgroundColor: "red" }}>Stop</CoolButton>
    </div>
  )
}

function CoolButton({ children, onClick, style, disabled, ...props}) {
  return (
    <button onClick={onClick} style={{
      height: "7em",
      borderRadius: 8,
      fontSize: "15pt",
      border: "none",
      textTransform: "uppercase",
      fontWeight: "bold",
      opacity: disabled ? 0.4 : 1.0,
      ...style,
    }}>{children}</button>
  )
}

function deltaS(date1, date2) {
  const deltams = Math.abs(date1.getTime() - date2.getTime())
  return deltams / 1000
}

function useSecondsElapsed(startDate, stopDate) {
  const currentDate = useCurrentDate(30)

  if (!startDate) {
    return 0;
  }

  const compareDate = stopDate || currentDate
  const ms = compareDate.getTime() - startDate.getTime()
  return ms / 1000
}

export default Timer;