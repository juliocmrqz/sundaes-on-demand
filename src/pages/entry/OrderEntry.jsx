import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'
import Options from './Options'

const OrderEntry = () => {
  const { granTotal } = useOrderDetails()
  return (
    <div>
      <Options optionType={'scoops'}></Options>
      <br />
      <Options optionType={'toppings'}></Options>
      <br />
      <h2>Grand Total: {formatCurrency(granTotal)}</h2>
    </div>
  )
}

export default OrderEntry
