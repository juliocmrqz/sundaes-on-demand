import { Alert } from 'react-bootstrap'

const AlertBanner = (props) => {
  const message = props.message
    ? props.message
    : 'An unexpected error ocurred, please try again later.'
  const variant = props.variant ? props.variant : 'danger'

  return <Alert variant={variant}>{message}</Alert>
}

export default AlertBanner
