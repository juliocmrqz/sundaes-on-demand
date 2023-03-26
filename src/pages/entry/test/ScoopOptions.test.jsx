import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import ScoopOptions from '../ScoopOptions'

describe('Scoop options', () => {
  it('Should not allow to enter float, negative numbers or out of range(1 - 10)', async () => {
    const user = userEvent.setup()
    render(<ScoopOptions name={'Vanilla'} imagePath={'images/vanilla.png'} />)

    const vanillaInput = screen.getByRole('spinbutton', { name: 'Vanilla' })
    // enter negative number
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '-1')
    expect(vanillaInput).toHaveClass('is-invalid')

    // enter float number
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '2.5')
    expect(vanillaInput).toHaveClass('is-invalid')

    // enter out of range number
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '11')
    expect(vanillaInput).toHaveClass('is-invalid')

    // finally enter valid number
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '2')
    expect(vanillaInput).not.toHaveClass('is-invalid')
  })
})
