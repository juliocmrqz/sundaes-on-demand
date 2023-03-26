import { render, screen } from '../../../test-utils/testing-library-utils'
import OrderConfirmation from '../OrderConfirmation'
import { rest } from 'msw'
import server from '../../../mocks/server'

describe('Order confirmation number API error', () => {
  it('Should display an error message when the response is 500', async () => {
    /**
     * !We reset the mocked server post to return a 500 status
     */
    server.resetHandlers(
      rest.post('http://localhost:3030/order', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    // after the response is set, we render the component
    render(<OrderConfirmation setOrderPhase={jest.fn()} />)

    // we get the error alert in page
    // by role and message
    const errorAlert = await screen.findByRole('alert')
    expect(errorAlert).toHaveTextContent('Error, error, error!!!')
  })
})
