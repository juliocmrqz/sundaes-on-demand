import { Col } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { useOrderDetails } from '../../context/OrderDetails'
import { useState } from 'react'

const ScoopOptions = (props) => {
  const scoopOptionName = props.name
  const scoopOptionImgPath = props.imagePath
  const { updateItemCount } = useOrderDetails()
  const [isValid, setIsValid] = useState(true)

  const onChangeHandler = (event) => {
    const currentValue = event.target.value
    // we validate a number, event.target.value returns a string
    const currentValueFloat = parseFloat(currentValue)
    // ! isValid when value is within 0-10 and it's an integer
    // prettier-ignore
    const valueIsValid = 0 <= currentValueFloat && currentValueFloat <= 10 && Math.floor(currentValueFloat) === currentValueFloat
    // set the valid state
    setIsValid(valueIsValid)

    // only update the value when valid
    const valueToUpdate = valueIsValid ? parseInt(currentValue) : 0
    updateItemCount(scoopOptionName, valueToUpdate, 'scoops')
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <p>{scoopOptionName}</p>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${scoopOptionImgPath}`}
        alt={`${scoopOptionName} scoop`}
        title={scoopOptionName}
      />
      {/* prettier-ignore */}
      <Form.Group controlId={`${scoopOptionName.replace(' ', '-')}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs={'6'} style={{ textAlign: 'right', fontWeight: 600 }}>
          {scoopOptionName}
        </Form.Label>
        <Col xs={'5'} style={{ textAlign: 'left' }}>
          <Form.Control isInvalid={!isValid} type={'number'} defaultValue={0} onChange={onChangeHandler}></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ScoopOptions
