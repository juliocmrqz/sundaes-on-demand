import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

/**
 * debugging tips
 * screen.debug() to check the render at that point
 * import { logRoles } from "@testing-library/dom";
 * --> this needs to destructure the container from the render
 *
 * getBy and await findBy (async)
 * all userEvents are async
 *
 * remember to check the specific line not working
 *
 * ?-> this component evaluates and determines which page component to display
 * ?-> wrap everyting in OrderProviders
 * ?-> button that update orderPhase state in pages
 *    ?-> clicking the button calls setter from prop
 */

describe('Application "Happy Path":', () => {
  it(`Order phases:
        -> Add ice cream scoops and toppings
        -> find and click order button
        -> check summary information based on order
        -> accepts terms and conditions and click button to confirm order
        -> confirm order number on confirmation page
        -> click 'new order' button on confirmation page
        -> check that scoops and toppings subtotals have been reset`, async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    // add ice cream and toppins
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' })
    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')
    const peanutButterCheckbox = await screen.findByRole('checkbox', { name: 'Peanut butter cups' })
    await user.click(peanutButterCheckbox)

    // find and click the order button
    const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
    await user.click(orderSummaryButton)

    // order summary page
    const summaryHeading = screen.getByRole('heading', { name: /order summary/i })
    expect(summaryHeading).toBeInTheDocument()
    const scoopsHeading = screen.getByRole('heading', { name: /scoops: \$6.00/i })
    expect(scoopsHeading).toBeInTheDocument()
    const toppingHeading = screen.getByRole('heading', { name: /toppings: \$1.50/i })
    expect(toppingHeading).toBeInTheDocument()

    // summary items
    const selectedItems = screen.getAllByRole('listitem')
    const selectedItemsText = selectedItems.map((item) => item.textContent)
    expect(selectedItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Peanut butter cups'])

    // accept terms and conditions
    const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
    await user.click(tcCheckbox)
    const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i })
    await user.click(confirmOrderButton)

    // Loading on the confirmation page
    const loadingMessage = await screen.findByText(/loading.../i)
    expect(loadingMessage).toBeInTheDocument()

    // confirmation page with no errors
    // this has to wait a response from axios, so it should find and not to get
    const thankYouHeading = await screen.findByRole('heading', { name: /thank you/i })
    expect(thankYouHeading).toBeInTheDocument()
    // we need to check the loading message dissapeared
    const notLoading = screen.queryByText(/loading.../i)
    expect(notLoading).not.toBeInTheDocument()
    // finally check the confirmation number exists on page
    const orderNumber = await screen.findByText(/order number:/i)
    expect(orderNumber).toBeInTheDocument()
    // the confirmation page should have a new order button
    const newOrderButton = screen.getByRole('button', { name: /new order/i })
    await user.click(newOrderButton)

    //after clicking the new order button it should restart scoops and toppings to 0
    const scoopsTotal = await screen.findByText('Scoops total: $0.00')
    expect(scoopsTotal).toBeInTheDocument()
    const toppingsTotal = screen.getByText('Toppings total: $0.00')
    expect(toppingsTotal).toBeInTheDocument()

    // explicit component unmount to avoid not wrapped in act(...)
    unmount()
  })
})
