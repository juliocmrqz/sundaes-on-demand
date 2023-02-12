import Options from './Options'

const OrderEntry = () => {
  return (
    <div>
      <h2>Scoop options</h2>
      <Options optionType={'scoops'}></Options>
      <br />
      <h2>Topping options</h2>
      <Options optionType={'toppings'}></Options>
    </div>
  )
}

export default OrderEntry
