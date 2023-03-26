import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'
import Options from './Options'
import Button from 'react-bootstrap/Button'

const OrderEntry = ({ setOrderPhase }) => {
  const { granTotal } = useOrderDetails()
  const handleClick = () => {
    setOrderPhase('review')
  }
  return (
    <div>
      <Options optionType={'scoops'}></Options>
      <br />
      <Options optionType={'toppings'}></Options>
      <br />
      <h2>Grand Total: {formatCurrency(granTotal)}</h2>
      <Button onClick={handleClick}>Order Sundae!</Button>
    </div>
  )
}

export default OrderEntry
