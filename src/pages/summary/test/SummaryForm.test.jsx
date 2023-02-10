import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

const userFormRender = (jsx) => {
  return { user: userEvent.setup(), ...render(jsx) }
}
// case insensitive regular expression
const buttonOptions = { name: /confirm order/i }
const checkboxOptions = { name: /terms and conditions/i }

describe('Initial conditions:', () => {
  it('Button disabled', async () => {
    userFormRender(<SummaryForm />)
    const submitButton = screen.getByRole('button', buttonOptions)
    expect(submitButton).toBeDisabled()
  })

  it('Checkbox unchecked', async () => {
    userFormRender(<SummaryForm />)
    const termsAndConditionsCheckbox = screen.getByRole('checkbox', checkboxOptions)
    expect(termsAndConditionsCheckbox).not.toBeChecked()
  })

  it('Popup is not on the document', async () => {
    userFormRender(<SummaryForm />)
    const nullPopover = screen.queryByText(/No ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()
  })
})

describe('Checkbox:', () => {
  it(`Enables the button when checked
      &&
      Disables the button when unchecked back`, async () => {
    const { user } = userFormRender(<SummaryForm />)

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
    const { user } = userFormRender(<SummaryForm />)
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
