import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/order-confirmation/OrderConfirmation'
import { OrderDetailsProvider } from './context/OrderDetails'
import { useState } from 'react'

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress')

  let Component = OrderEntry // order page by default
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry
      break

    case 'review':
      Component = OrderSummary
      break

    case 'completed':
      Component = OrderConfirmation
      break
    default:
  }
  return (
    <OrderDetailsProvider>
      {/* Summary page and entry page needs provider */}
      {/* Confirmation page does not need provider */}
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
      {/* <OrderEntry />
        <OrderSummary /> */}
    </OrderDetailsProvider>
  )
}

export default App
