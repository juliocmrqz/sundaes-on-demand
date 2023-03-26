// import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../context/OrderDetails'

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch((error) => {})
  }, [])

  const handleClick = () => {
    resetOrder()
    setOrderPhase('inProgress')
  }

  if (orderNumber != null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number: {orderNumber}</p>
        <p style={{ fontSize: '50%' }}>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default OrderConfirmation
