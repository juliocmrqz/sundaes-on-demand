import { Col } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { useOrderDetails } from '../../context/OrderDetails'

const ScoopOptions = (props) => {
  const scoopOptionName = props.name
  const scoopOptionImgPath = props.imagePath
  const { updateItemCount } = useOrderDetails()

  const onChangeHandler = (event) => {
    updateItemCount(scoopOptionName, parseInt(event.target.value), 'scoops')
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
      <Form.Group controlId={`${scoopOptionName}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs={'6'} style={{ textAlign: 'right', fontWeight: 600 }}>
          {scoopOptionName}
        </Form.Label>
        <Col xs={'5'} style={{ textAlign: 'left' }}>
          <Form.Control type={'number'} defaultValue={0} onChange={onChangeHandler}></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ScoopOptions
