import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function TimerInput({ minutes, handleChange, handleSubmit, resetTimer, active }) {
    return (
        <Form className="p-0 fluid={true} mt-5 d-flex" onSubmit={active ? resetTimer : handleSubmit}>
            <Form.Group>
                <Form.Label htmlFor="timer" >Countdown Timer</Form.Label>
                <Form.Control
                    placeholder="5"
                    onChange={handleChange}
                    id="timer"
                    inputProps={{ min: '0' }}
                    name="timer"
                    type="number"
                    value={minutes}
                    required
                />
                <Button className="mt-3 p-2" disabled={minutes === 0} variant="primary" type="submit">
                    {active ? 'Clear' : 'Submit'}
                </Button>
            </Form.Group>
        </Form>
    )
}

export default TimerInput