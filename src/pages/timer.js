import React, { useCallback, useState } from 'react';
import Layout from '../components/Layout'
import useCurrentDate from "../hooks/useCurrentDate"

const Timer = () => {
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