import { Col } from 'react-bootstrap'
const ScoopOptions = (props) => {
  const scoopOptionName = props.name
  const scoopOptionImgPath = props.imagePath
  return (
    <Col xs={12} sm={6} md={4} lg={2} style={{ textAlign: 'center' }}>
      <p>{scoopOptionName}</p>
      <img
        style={{ width: '30%' }}
        src={`http://localhost:3030/${scoopOptionImgPath}`}
        alt={`${scoopOptionName} topping`}
        title={scoopOptionName}
      />
    </Col>
  )
}

export default ScoopOptions
