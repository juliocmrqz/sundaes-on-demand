import { Col } from 'react-bootstrap'
const ScoopOptions = (props) => {
  const scoopOptionName = props.name
  const scoopOptionImgPath = props.imagePath
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <p>{scoopOptionName}</p>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${scoopOptionImgPath}`}
        alt={`${scoopOptionName} scoop`}
        title={scoopOptionName}
      />
    </Col>
  )
}

export default ScoopOptions
