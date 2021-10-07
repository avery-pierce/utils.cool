import React, { useCallback, useState } from 'react';
import Layout from '../components/Layout'
import useCurrentDate from "../hooks/useCurrentDate"

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
    <Layout>
      <h1>Timer</h1>
      <div>
        {!isTimerRunning && <button onClick={onStart}>Start</button>}
        {isTimerRunning && <button onClick={onTapLap}>Lap</button>}
        {isTimerRunning && <button onClick={onStop}>Stop</button>}
      </div>
      <p>{elapsed} seconds elapsed</p>
      <ol>
        {laps.map(lapTime => (
          <li>
            {deltaS(startDate, lapTime)}s
          </li>
        ))}
      </ol>
    </Layout>
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