import userEventsPlusRender from '../../common/userRender'
import { render, screen } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

// case insensitive regular expression
const buttonOptions = { name: /confirm order/i }
const checkboxOptions = { name: /terms and conditions/i }

describe('Initial conditions:', () => {
  it('Button disabled', async () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />)
    const submitButton = screen.getByRole('button', buttonOptions)
    expect(submitButton).toBeDisabled()
  })

  it('Checkbox unchecked', async () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />)
    const termsAndConditionsCheckbox = screen.getByRole('checkbox', checkboxOptions)
    expect(termsAndConditionsCheckbox).not.toBeChecked()
  })

  it('Popup is not on the document', async () => {
    render(<SummaryForm setOrderPhase={jest.fn()} />)
    const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()
  })
})

describe('Checkbox:', () => {
  it(`Enables the button when checked
      &&
      Disables the button when unchecked back`, async () => {
    const { user } = userEventsPlusRender(<SummaryForm setOrderPhase={jest.fn()} />)

    const submitButton = screen.getByRole('button', buttonOptions)
    const termsAndConditionsCheckbox = screen.getByRole('checkbox', checkboxOptions)

    await user.click(termsAndConditionsCheckbox)
    expect(submitButton).toBeEnabled()
    await user.click(termsAndConditionsCheckbox)
    expect(submitButton).toBeDisabled()
  })
})

describe('Label:', () => {
  it('Popup responds to hover', async () => {
    const { user } = userEventsPlusRender(<SummaryForm setOrderPhase={jest.fn()} />)
    // popover is hidden when the page loads
    const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()

    // popover appears on hover of the checkbox label
    const termsAndConditionsCheckbox = screen.getByText(checkboxOptions.name)
    await user.hover(termsAndConditionsCheckbox)
    const popover = screen.getByText(/No ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    // popover dissapears when we mouse out
    await user.unhover(termsAndConditionsCheckbox)
    expect(popover).not.toBeInTheDocument()
  })
})
