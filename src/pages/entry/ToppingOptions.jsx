import { Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useOrderDetails } from '../../context/OrderDetails'

const ScoopOptions = (props) => {
  const scoopOptionName = props.name
  const scoopOptionImgPath = props.imagePath
  const { updateItemCount } = useOrderDetails()

  const handleChange = (event) => {
    updateItemCount(scoopOptionName, event.target.checked ? 1 : 0, 'toppings')
  }

  return (
    <Col xs={12} sm={6} md={4} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '30%' }}
        src={`http://localhost:3030/${scoopOptionImgPath}`}
        alt={`${scoopOptionName} topping`}
        title={scoopOptionName}
      />
      <Form.Group controlId={`${scoopOptionName}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={scoopOptionName} />
      </Form.Group>
    </Col>
  )
}

export default ScoopOptions
