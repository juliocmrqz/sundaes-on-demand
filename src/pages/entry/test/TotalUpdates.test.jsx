import userEventsPlusRender from '../../common/userRender'
import { screen } from '../../common/userRender'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

describe('Scoops update when the entry changes:', () => {
  //! test =================================================
  it('The subtotal should start at $0.00', () => {
    const { unmount } = userEventsPlusRender(<Options optionType={'scoops'} />)
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })

    // Make sure the total starts out at $0.00
    expect(scoopsSubtotal).toHaveTextContent('0.00')
    unmount()
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
    // the second test shouldn't fail with get as the data already loaded
    const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' })
    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')

    expect(scoopsSubtotal).toHaveTextContent('6.00')
  })
})

describe('Toppings update when the entry changes:', () => {
  //! test =================================================
  it('The subtotal should start at $0.00', () => {
    const { unmount } = userEventsPlusRender(<Options optionType={'toppings'} />)
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })

    // Make sure the total starts out at $0.00
    expect(toppingsSubtotal).toHaveTextContent('0.00')
    unmount()
  })

  //! test =================================================
  it(`The subtotal should change:
            when peanut butter cups is checked = $1.50
            then hot fudge is checked = $3.00
            ----
            the user decides not hot fudge = $1.50`, async () => {
    const { user } = userEventsPlusRender(<Options optionType={'toppings'} />)
    const scoopsSubtotal = screen.getByText('Toppings total: $', { exact: false })

    // update the peanut butter cups checkbox to true and checks subtotal
    const peanutButterCheckbox = await screen.findByRole('checkbox', { name: 'Peanut butter cups' })
    // await user.clear(peanutButterCheckbox) // opposite to the input number, we don't need to clear the checkbox prior to the test
    await user.click(peanutButterCheckbox)

    expect(scoopsSubtotal).toHaveTextContent('1.50')

    // update hot fudge checkbox to true and checks subtotal
    // the second test shouldn't fail with get as the data already loaded
    const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' })
    // await user.clear(chocolateInput) // opposite to the input number, we don't need to clear the checkbox prior to the test
    await user.click(hotFudgeCheckbox)
    expect(scoopsSubtotal).toHaveTextContent('3.00')

    // the user decides to not get the hot fudge
    await user.click(hotFudgeCheckbox)
    expect(scoopsSubtotal).toHaveTextContent('1.50')
  })
})

describe('The Grand Total:', () => {
  it('Starts at cero 0.00', async () => {
    const { unmount } = userEventsPlusRender(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
    expect(grandTotal).toHaveTextContent('0.00')
    unmount()
  })

  it('Updates properly if scoops are added first than toppings', async () => {
    // as we need to interact, the firt thing to do is to add the userEvent.setup
    // already included in the userEventsPlusRender, so we proceed to destructure
    const { user } = userEventsPlusRender(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i }) // we search for a RegExp in order to simply obtain the element without the actual total.
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' }) // we specify an option to type in.
    const mintChip = await screen.findByRole('spinbutton', { name: 'Mint chip' }) // we specify an option to type in.
    const mmsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' })

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '2')
    await user.clear(mintChip)
    await user.type(mintChip, '1')
    expect(grandTotal).toHaveTextContent('6.00')

    await user.click(mmsCheckbox)
    expect(grandTotal).toHaveTextContent('7.50')
  })

  it('Updates properly if topping is added first', async () => {
    // idem to previous test
    const { user } = userEventsPlusRender(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i }) // we search for a RegExp in order to simply obtain the element without the actual total.
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' }) // we specify an option to type in.
    const mintChip = screen.getByRole('spinbutton', { name: 'Mint chip' }) // we specify an option to type in.
    const mmsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' })

    await user.click(mmsCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    await user.clear(mintChip)
    await user.type(mintChip, '1')
    expect(grandTotal).toHaveTextContent('5.50')
  })

  it('Updates properly if an item is removed', async () => {
    // idem to previous test
    const { user } = userEventsPlusRender(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i }) // we search for a RegExp in order to simply obtain the element without the actual total.
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' }) // we specify an option to type in.
    const mintChip = screen.getByRole('spinbutton', { name: 'Mint chip' }) // we specify an option to type in.
    const mmsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' })

    await user.click(mmsCheckbox)
    // expect(grandTotal).toHaveTextContent('1.50') commented as this is happening behind the curtains in previous tests, no need for assertions here.

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    await user.clear(mintChip)
    await user.type(mintChip, '1')
    // expect(grandTotal).toHaveTextContent('5.50') commented as this is happening behind the curtains in previous tests, no need for assertions here.

    await user.click(mmsCheckbox)
    expect(grandTotal).toHaveTextContent('4.00')
  })
})
