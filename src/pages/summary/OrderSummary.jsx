import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'

import React from 'react'

const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionCounts } = useOrderDetails()

  const scoopsArray = Object.entries(optionCounts.scoops) // e.g. [['Chocolate', 2], ['Vanilla', 1]]
  const scoopsListToDisplay = scoopsArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    )
  })
  const toppingsArray = Object.keys(optionCounts.toppings) // e.g. ['M&Ms', 'Gummi Bears', 'Hot Fudge']
  const toppingsListToDisplay = toppingsArray.map((key) => {
    return <li key={key}>{key}</li>
  })

  return (
    <div>
      <h2>Order Summary</h2>
      <h4>Scoops: {formatCurrency(totals.scoops)}</h4>
      <ul>{scoopsListToDisplay}</ul>
      <h4>Toppings: {formatCurrency(totals.toppings)}</h4>
      <ul>{toppingsListToDisplay}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}

export default OrderSummary
