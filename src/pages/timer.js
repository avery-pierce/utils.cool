import React, { useCallback } from 'react';
import CoolMobileFullscreenLayout from '../components/CoolMobileFullscreenLayout';
import useCurrentDate from "../hooks/useCurrentDate"
import CoolText from '../components/CoolText';
import useLocalStorageState from '../hooks/useLocalStorageState';

const dateSerilaizer = (date) => {
  if (date === null) { return null }
  return date.getTime()
}

const dateDeserializer = (ms) => {
  return new Date(ms)
}

const arraySerializer = (elementSerializer) => {
  return (array) => {
    return array.map(elementSerializer)
  }
}

const arrayDeserializer = (elementDeserializer) => {
  return (array) => {
    return array.map(elementDeserializer)
  }
}

const Timer = () => {
  const [startDate, setStartDate] = useLocalStorageState("timer.startDate", null, dateSerilaizer, dateDeserializer)
  const [stopDate, setStopDate] = useLocalStorageState("timer.stopDate", null, dateSerilaizer, dateDeserializer)
  const [laps, setLaps] = useLocalStorageState("timer.laps", [], arraySerializer(dateSerilaizer), arrayDeserializer(dateDeserializer))
  
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
    const newLaps = [
      ...laps,
      new Date(),
    ]
    setLaps(newLaps)
  }, [laps])

  const lapD = lapDeltas(startDate, laps)
  const isTimerRunning = (!!startDate && !stopDate)
  return (
    <CoolMobileFullscreenLayout>
      <div style={{ flexGrow: 1 }}>
      </div>
      <div style={{ padding: "1em", flexShrink: 2 }}>
        <div style={{
          background: "rgba(233, 233, 233, 0.65)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          borderRadius: 8,
          padding: "1em",
        }}>
          {lapD.map((lapTime, i) => (
            <LapDetail 
              key={lapTime.date.getTime()}
              index={i} 
              durationSeconds={lapTime.duration / 1000} 
              deltaSeconds={lapTime.delta / 1000} 
              timestamp={lapTime.date} />
          ))}
        </div>
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

function CoolButton({ children, onClick, style, disabled }) {
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

function lapDeltas(startTime, lapTimes) {
  const lapDurations = lapTimes.map((date, i, allTimes) => {
    const previousStop = (i === 0 ? startTime : allTimes[i - 1])
    const lapDuration = date.getTime() - previousStop.getTime()
    return {
      date,
      duration: lapDuration,
    }
  })
  return lapDurations.map((duration, i, allDurations) => {
    if (i === 0) {
      return {
        ...duration,
        delta: null,
      }
    } else {
      const prevDuration = allDurations[i - 1]
      const delta = duration.duration - prevDuration.duration
      return {
        ...duration,
        delta,
      }
    }
  })
}

function LapDetail({ index, timestamp, durationSeconds, deltaSeconds }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      margin: "0.6em auto",
    }}>
      <div style={{
        paddingRight: "0.4em",
        marginRight: "0.4em",
        borderRight: "solid 0.5px rgba(0, 0, 0, 0.5)",
      }}>
        <CoolText style={{ color: "black" }}>{index+1}</CoolText>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        <span style={{fontSize: "1.2em"}}>
          <CoolText style={{color: "black", fontWeight: "bold", marginRight: "0.4em"}}>{durationSeconds}s</CoolText>
          <CoolText style={{color: "black" }}>(<CoolText style={{ color: deltaSeconds > 0 ? "red" : "green" }}>{deltaSeconds}</CoolText>)</CoolText>
        </span>
        <CoolText style={{color: "black", opacity: 0.6}}>{timestamp.toLocaleString()}</CoolText>
      </div>
    </div>
  )
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