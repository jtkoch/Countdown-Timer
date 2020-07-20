import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from 'react-bootstrap/Navbar'
import TimerInput from './components/TimerInput'
import TimeDisplay from './components/TimerDisplay'


const Timer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const Warning = styled.p`
  color: rgb(255, 0, 0);
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 0;
  margin-top: 2rem;
`


function App() {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [rate, setRate] = useState(1000)
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(false)

  const halfTime = (minutes / 2) * 60

  let interval

  useEffect(() => {
    if (seconds) {
      interval = setInterval(() => {
        setSeconds(seconds - 1)
      }, rate)
    }
    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  const onPause = () => {
    setPaused(true)
    clearInterval(interval)
  }

  const onResume = () => {
    setPaused(false)
    setSeconds(seconds - 1)
  }

  const resetTimer = e => {
    e.preventDefault()
    setPaused(false)
    setSeconds(0)
    setActive(false)
    setMinutes(0)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setPaused(false)
    setActive(true)

    const minutesToSeconds = minutes * 60
    setSeconds(minutesToSeconds - 1)
  }

  const handleChange = e => {
    setMinutes(parseInt(e.target.value, 10))
    setActive(false)
  }

  return (
    <Timer>
      <Navbar bg="transparent">
        <Navbar.Brand>Jensen Koch</Navbar.Brand>
      </Navbar>

      <TimerInput
        active={active}
        minutes={minutes}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        resetTimer={resetTimer}
      />

      {
        seconds <= halfTime
          && active
          && seconds >= 1 ? <Warning>More than halfway there!</Warning> : null
      }
      {
        seconds === 0 && active ? <Warning>Time is up!</Warning> : null
      }

      <TimeDisplay
        seconds={seconds}
        pause={onPause}
        paused={paused}
        resume={onResume}
        setRate={setRate}
        rate={rate}
      />

    </Timer>
  );
}

export default App;