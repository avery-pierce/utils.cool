import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout'

const Timer = ({location}) => {
  const [startDate, setStartDate] = useState(null)
  const [stopDate, setStopDate] = useState(null)
  
  const elapsed = useSecondsElapsed(startDate, stopDate)
  const onStart = useCallback(() => {
    setStartDate(new Date()) 
    setStopDate(null)
  }, [])

  const onStop = useCallback(() => {
    setStopDate(new Date())
  }, [])

  const isTimerRunning = (!!startDate && !stopDate)

  return (
    <Layout>
      <h1>Timer</h1>
      <div>
        {!isTimerRunning && <button onClick={onStart}>Start</button>}
        {isTimerRunning && <button onClick={onStop}>Stop</button>}
      </div>
      <p>{elapsed} seconds elapsed</p>
    </Layout>
  )
}

function useSystemClock(refreshRateHz = 60) {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const handle = setInterval(() => {
      setDate(new Date())
    }, 1000/refreshRateHz)

    return () => clearInterval(handle)
  }, [refreshRateHz])

  return date
}

function useSecondsElapsed(startDate, stopDate) {
  const currentDate = useSystemClock(30)

  if (!startDate) {
    return 0;
  }

  const compareDate = stopDate || currentDate
  const ms = compareDate.getTime() - startDate.getTime()
  return ms / 1000
}

export default Timer;