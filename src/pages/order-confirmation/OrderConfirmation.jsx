// import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../context/OrderDetails'
import AlertBanner from '../common/AlertBanner'

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch((error) => {
        setError(true)
      })
  }, [])

  const handleClick = () => {
    resetOrder()
    setOrderPhase('inProgress')
  }

  const newOrderButton = <Button onClick={handleClick}>Create new order</Button>

  if (error) {
    return (
      <>
        <AlertBanner message={'Error, error, error!!!'} variant={'danger'} />
        {newOrderButton}
      </>
    )
  }

  if (orderNumber != null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number: {orderNumber}</p>
        <p style={{ fontSize: '50%' }}>as per our terms and conditions, nothing will happen now</p>
        {newOrderButton}
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default OrderConfirmation
