import userEventsPlusRender from '../../common/userRender'
import { screen } from '@testing-library/react'
import Options from '../Options'

describe('Updates when the entry changes:', () => {
  //! test =================================================
  it('The subtotal should start at $0.00', () => {
    userEventsPlusRender(<Options optionType={'scoops'} />)
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })

    // Make sure the total starts out at $0.00
    expect(scoopsSubtotal).toHaveTextContent('0.00')
  })

  //! test =================================================
  it(`The subtotal should change:
            when vanilla scoops to 1 subtotal = $2.00
            then chocolate scoops to 2 subtotal = $4.00
            total 3 scoops subtotal = $6.00`, async () => {
    const { user } = userEventsPlusRender(<Options optionType={'scoops'} />)
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })

    // update vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')

    expect(scoopsSubtotal).toHaveTextContent('2.00')

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')

    expect(scoopsSubtotal).toHaveTextContent('6.00')
  })
})
