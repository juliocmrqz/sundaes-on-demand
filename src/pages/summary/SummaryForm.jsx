import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap'
import { useState } from 'react'

export default function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false)

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement={'auto'} overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setOrderPhase('completed')
  }

  return (
    <Form onSubmit={handleSubmit} style={{ marginBottom: '50px' }}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  )
}
