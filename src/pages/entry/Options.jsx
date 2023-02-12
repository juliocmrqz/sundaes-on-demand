import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import AlertBanner from '../common/AlertBanner'
import ScoopOptions from './ScoopOptions'
import ToppingOptions from './ToppingOptions'

const Options = (props) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const optionType = props.optionType

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
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data)
      })
      .catch((error) => {
        setError(true)
      })
  }, [optionType])

  if (error) {
    return <AlertBanner></AlertBanner>
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions

  const optionsItems = items.map((item) => {
    return <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  })

  return <Row>{optionsItems}</Row>
}

export default Options
