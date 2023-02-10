import { render, screen } from '@testing-library/react'
import Options from '../Options'

describe('From the server:', () => {
  it('displays an image for each scoop option:', async () => {
    const options = { name: /scoop$/i }
    render(<Options optionType={'scoops'} />)

    // find images
    const scoopImages = await screen.findAllByRole('img', options)
    expect(scoopImages).toHaveLength(2) // because the handler is getting 2 elements

    // confirm alt text for images
    const altText = scoopImages.map((element) => {
      return element.alt
    })

    // because is an Array it uses toEqual() instead of toBe()
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })
})
