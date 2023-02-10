import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import ScoopOptions from './ScoopOptions'

const Options = (props) => {
  const [items, setItems] = useState([])
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
        // TODO: handle error response
      })
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null
  const optionsItems = items.map((item) => {
    return <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  })

  return <Row>{optionsItems}</Row>
}

export default Options
