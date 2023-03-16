import { createContext, useContext, useState } from 'react'
import { pricePerItem } from '../constant'
const OrderDetails = createContext()

/**
 * Custom hook to use the Context setters and getters from the OrderDetailsProvider
 *
 * @returns orderDetailsContext extracted from the OrderDetailsProvider
 *
 * getters:    { optionCounts, totals }
 *
 * setters:    { updateItemCount, resetOrder }
 */
const useOrderDetails = () => {
  const orderDetailsContext = useContext(OrderDetails)

  if (!orderDetailsContext) {
    throw new Error('useOrderDetails must be call from within an OrderDetailsProvider')
  }

  return orderDetailsContext
}

/**
 * The provider is going to get the options the user inputs,
 * it sets an internal state to store the options
 * @param {*} props
 * @returns
 */
const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // e.g.: { Chocolate: 1, Vanilla: 2 }
    toppings: {} // e.g.: { "Gummy Bears": 1 }
  })

  /**
   *
   * @param {string} itemName
   * @param {number} newItemCount
   * @param {string} optionType
   *
   * @returns an updated state for the optionCounts
   */
  const updateItemCount = (itemName, newItemCount, optionType) => {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts }

    // update the copy with the receiving information
    newOptionCounts[optionType][itemName] = newItemCount

    // set the updated state with the updated copy
    setOptionCounts(newOptionCounts)
  }

  const resetOrder = () => {
    setOptionCounts({
      scoops: {},
      toppings: {}
    })
  }

  const calculateTotal = (optionType) => {
    const initialValue = 0
    // getting the currency (values) not the property
    const countsArray = Object.values(optionCounts[optionType])

    // total the values in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, initialValue)

    // multitply the total number of items by the price for this item type
    return totalCount * pricePerItem[optionType]
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings')
  }

  const value = { optionCounts, totals, updateItemCount, resetOrder }
  return <OrderDetails.Provider value={value} {...props} />
}

export { useOrderDetails, OrderDetailsProvider }
