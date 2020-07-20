import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import Button from 'react-bootstrap/Button'

const blinker = keyframes`
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const blinkAnimation = css`
    animation: ${blinker} 1s linear infinite;
    color: rbg(255, 0, 0);
`

const Display = styled.h1`
    display: flex;
    font-size: 7rem;
    color: ${({ warning }) => (warning ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 0)')};
    ${({ blink }) => (blink ? blinkAnimation : null)};
`

const Click = styled.button`
    background-color: rgb(0, 123, 255);
    border: none;
    color: white;
    border-radius: 5px;
    padding: 10px;
`

const TimerDisplay = ({
  seconds, pause, resume, setRate, rate, paused,
}) => {
  const getSeconds = () => (`0${seconds % 60}`).slice(-2);
  const getMinutes = () => Math.floor(seconds / 60);
  const minutes = getMinutes();

  const timeBlink = () => (seconds <= 10 && seconds > 0 && minutes === 0);
  const timeRed = () => (seconds <= 20 && seconds > 0 && minutes === 0);
  const option = (condition, then, otherwise) => (condition ? then : otherwise);
  return (
    <div>
      <div>
        <Display blink={timeBlink()} warning={timeRed()}>
          {`${minutes}:${getSeconds()}`}
        </Display>
        {
          seconds > 0
            ? option(paused, <Click onClick={resume}>Resume</Click>, <Click onClick={pause}>Pause</Click>)
            : null
      }
      </div>
      <div>
        <Button className="m-3" variant="outline-success" type="button" disabled={rate === 1000} onClick={() => setRate(1000)}>1x</Button>
        <Button className="m-3" variant="outline-warning" type="button" disabled={rate === 750} onClick={() => setRate(750)}>1.5x</Button>
        <Button className="m-3" variant="outline-danger" type="button" disabled={rate === 500} onClick={() => setRate(500)}>2x</Button>
      </div>
    </div>
  );
};

export default TimerDisplay