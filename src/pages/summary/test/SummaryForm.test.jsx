import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

const summaryFormRender = () => {
  render(<SummaryForm />)
}
// case insensitive regular expression
const buttonOptions = { name: /confirm order/i }
const checkboxOptions = { name: /terms and conditions/i }

/**
 * it tests the button is enabled when the checkbox is checked
 * it tests the button is disabled when the checkbox is unchecked back again
 */
const enableButtonByCheckbox = () => {
  const submitButton = screen.getByRole('button', buttonOptions)
  const termsAndConditionsCheckbox = screen.getByRole('checkbox', checkboxOptions)

  fireEvent.click(termsAndConditionsCheckbox)
  expect(submitButton).toBeEnabled()
  fireEvent.click(termsAndConditionsCheckbox)
  expect(submitButton).toBeDisabled()
}

describe('Initial conditions:', () => {
  it('Button disabled', () => {
    summaryFormRender()
    const submitButton = screen.getByRole('button', buttonOptions)
    expect(submitButton).toBeDisabled()
  })

  it('Checkbox unchecked', () => {
    summaryFormRender()
    const termsAndConditionsCheckbox = screen.getByRole('checkbox', checkboxOptions)
    expect(termsAndConditionsCheckbox).not.toBeChecked()
  })
})

describe('Checkbox:', () => {
  it(`Enables the button when checked
      &&
      Disables the button when unchecked back`, () => {
    summaryFormRender()
    enableButtonByCheckbox()
  })
})
