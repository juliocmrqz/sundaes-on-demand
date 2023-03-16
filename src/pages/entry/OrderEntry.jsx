import Options from './Options'

const OrderEntry = () => {
  return (
    <div>
      <Options optionType={'scoops'}></Options>
      <br />
      <Options optionType={'toppings'}></Options>
    </div>
  )
}

export default OrderEntry
