import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import { OrderDetailsProvider } from './context/OrderDetails'

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page needs provider */}
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  )
}

export default App
