import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'

import React from 'react'

// prettier-ignore
const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionCounts } = useOrderDetails()

  const scoopsArray = Object.entries(optionCounts.scoops) // e.g. [['Chocolate', 2], ['Vanilla', 1]]
  const scoopsListToDisplay = scoopsArray.map(([key, value]) => <li key={key}>{value} {key}</li>)

  const hasToppings = totals.toppings > 0
  const toppingsArray = Object.keys(optionCounts.toppings) // e.g. ['M&Ms', 'Gummi Bears', 'Hot Fudge']
  const toppingsList = toppingsArray.map(key => <li key={key}>{key}</li>)

  const toppingsListToDisplay = hasToppings
  ? (
      <>
        <h4>Toppings: {formatCurrency(totals.toppings)}</h4>
        <ul>{toppingsList}</ul>
      </>
    )
  : (<></>)


  return (
    <div>
      <h2>Order Summary</h2>
      <h4>Scoops: {formatCurrency(totals.scoops)}</h4>
      <ul>{scoopsListToDisplay}</ul>
      {/* list of toppings */}
      {toppingsListToDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}

export default OrderSummary
