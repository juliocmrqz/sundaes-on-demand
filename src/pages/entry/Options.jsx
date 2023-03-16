import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import AlertBanner from '../common/AlertBanner'
import ScoopOptions from './ScoopOptions'
import ToppingOptions from './ToppingOptions'
import { formatCurrency } from '../../utilities'
import { pricePerItem } from '../../constant'
import { useOrderDetails } from '../../context/OrderDetails'

const Options = (props) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const optionType = props.optionType
  const { totals } = useOrderDetails()

  /**
   *
   * In order to get the scoops or toppings array
   * we are making a call with axios and this is nested
   * in an UseEffect as it will only applies once
   * but if the optionType changes
   * the call will be made again.
   *
   */
  useEffect(() => {
    const controller = new AbortController()
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((response) => {
        setItems(response.data)
      })
      .catch((error) => {
        if (error.name !== 'CanceledError') {
          setError(true)
        }
      })

    // abort axios call on component unmount
    return () => {
      controller.abort()
    }
  }, [optionType])

  if (error) {
    return <AlertBanner></AlertBanner>
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()
  const optionsItems = items.map((item) => {
    return <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  })

  return (
    <>
      <Row>
        <h2>{title}</h2>
        <pre>{`(${formatCurrency(pricePerItem[optionType])} each)`}</pre>
      </Row>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionsItems}</Row>
    </>
  )
}

export default Options
