import { render, screen, waitFor } from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import { rest } from 'msw'
import server from '../../../mocks/server'
import userEvent from '@testing-library/user-event'

describe('Order Entry API returns 500:', () => {
  it('Should handle errors displaying alerts', async () => {
    /**
     * !the options cannot be pass to Bootstrap alert as they pass the alert as a children array instead of elements
     * !const options = { name: 'An unexpected error ocurred, please try again later.' }
     * */

    /**
     * In order to test the scenarios where the server fails to deliver, we need to
     * resetHandlers previously implemented on the handlers.js file which mocks the responses
     * for the Options component
     */
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(<OrderEntry setOrderPhase={jest.fn()} />)

    /**
     *! We are using the waitFor API in order to get all the elements
     *! rendered or displaying errors prior to enter in the expect assertion
     * */
    await waitFor(
      async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts).toHaveLength(2)
      },
      { timeout: 2000 }
    )
  })

  it('Should display "An unexpected error ocurred please try again later."', async () => {
    const errorMessageToDisplay = 'An unexpected error ocurred, please try again later.'

    /**
     * In order to test the scenarios where the server fails to deliver, we need to
     * resetHandlers previously implemented on the handlers.js file which mocks the responses
     * for the Options component
     */
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(<OrderEntry setOrderPhase={jest.fn()} />)

    /**
     *! We are using the waitFor API in order to get all the elements
     *! rendered or displaying errors prior to enter in the expect assertion
     * */
    await waitFor(
      async () => {
        const alerts = await screen.findAllByText(errorMessageToDisplay)
        expect(alerts).toHaveLength(2)
      },
      { timeout: 2000 }
    )
  })
})

describe('Button to order sundae', () => {
  it('Should be disabled if there are no scoops ordered', () => {
    const { unmount } = render(<OrderEntry setOrderPhase={jest.fn()} />)

    const orderButton = screen.getByRole('button', { name: /order sundae/i })
    expect(orderButton).toBeDisabled()
    unmount()
  })

  it('Should be disabled if user enters a scoop and then removes it', async () => {
    const user = userEvent.setup()
    render(<OrderEntry setOrderPhase={jest.fn()} />)

    const orderButton = screen.getByRole('button', { name: /order sundae/i })
    expect(orderButton).toBeDisabled()

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    expect(orderButton).toBeEnabled()

    await user.clear(vanillaInput)
    await user.type(vanillaInput, '0')
    expect(orderButton).toBeDisabled()
  })
})
