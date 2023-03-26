import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'
import Options from './Options'
import Button from 'react-bootstrap/Button'

const OrderEntry = ({ setOrderPhase }) => {
  const { totals, granTotal } = useOrderDetails()
  const handleClick = () => {
    setOrderPhase('review')
  }

  // the button is going to be disables when there are no scoops
  const orderDisabled = totals.scoops === 0

  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType={'scoops'}></Options>
      <br />
      <Options optionType={'toppings'}></Options>
      <br />
      <h2>Grand Total: {formatCurrency(granTotal)}</h2>
      <Button disabled={orderDisabled} onClick={handleClick}>
        Order Sundae!
      </Button>
    </div>
  )
}

export default OrderEntry
