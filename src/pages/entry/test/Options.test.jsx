import { render, screen } from '../../../test-utils/testing-library-utils'
import Options from '../Options'

describe('From the mocked server:', () => {
  it('Each scoop option should display an image', async () => {
    const options = { name: /scoop$/i }
    render(<Options optionType={'scoops'} />)

    // find images
    const scoopImages = await screen.findAllByRole('img', options)
    expect(scoopImages).toHaveLength(3) // because the handler is getting 3 elements

    // confirm alt text for images
    const altText = scoopImages.map((element) => {
      return element.alt
    })

    // because is an Array it uses toEqual() instead of toBe()
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop', 'Mint chip scoop'])
  })

  it('Each topping option should display an image', async () => {
    const options = {
      name: /topping$/i // regexp looking for topping at the end of the sentence case insensitive
    }
    render(<Options optionType={'toppings'} />)

    // find images
    const toppingImages = await screen.findAllByRole('img', options)
    expect(toppingImages).toHaveLength(3) // because the handler is getting 3 elements mocked

    // get the images alt text
    const altText = toppingImages.map((element) => {
      return element.alt
    })

    expect(altText).toEqual(['M&Ms topping', 'Hot fudge topping', 'Peanut butter cups topping'])
  })
})
