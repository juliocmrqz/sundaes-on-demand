import { render, screen, waitFor } from '../../../test-utils/testing-library-utils'
import OrderEntry from '../OrderEntry'
import { rest } from 'msw'
import server from '../../../mocks/server'

describe('From the mocked server:', () => {
  it('should handle error for scoops and toppings routes', async () => {
    /**
     * !the options cannot be pass to Bootstrap alert as they pass the alert as a children array instead of elements
     * !const options = { name: 'An unexpected error ocurred, please try again later.' }
     * */

    /**
     * In order to test the scenarios where the server fails to deliver, we need to resetHandlers previously implemented
     * on the handlers.js file which mocks the responses for the Options component
     */
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(<OrderEntry />)

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
  it('should handle error for scoops and toppings routes getting the elements by Text instead or Role', async () => {
    const options = 'An unexpected error ocurred, please try again later.'

    /**
     * In order to test the scenarios where the server fails to deliver, we need to resetHandlers previously implemented
     * on the handlers.js file which mocks the responses for the Options component
     */
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    render(<OrderEntry />)

    /**
     *! We are using the waitFor API in order to get all the elements
     *! rendered or displaying errors prior to enter in the expect assertion
     * */
    await waitFor(
      async () => {
        const alerts = await screen.findAllByText(options)
        expect(alerts).toHaveLength(2)
      },
      { timeout: 2000 }
    )
  })
})
