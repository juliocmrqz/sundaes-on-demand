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
 */

describe('Application "Happy Path":', () => {
  it('order phases', () => {
    /**
     * render(<App />)
     *
     * -> Add ice cream scoops and toppings
     * -> find and click order button
     * -> check summary information based on order
     * -> accepts terms and conditions and click button to confirm order
     * -> confirm order number on confirmation page
     * -> click 'new order' button on confirmation page
     * -> check that scoops and toppings subtotals have been reset
     * -> do we need to awairt anythins to avoid test errors?
     *
     *
     */
  })
})
