import { useState, useEffect } from "react"

export default function useCurrentDate(refreshRateHz = 60) {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const handle = setInterval(() => {
      setDate(new Date())
    }, 1000/refreshRateHz)

    return () => clearInterval(handle)
  }, [refreshRateHz])

  return date
}