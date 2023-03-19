import { render } from '../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'

/**
 *
 * @param {JSX.Element | JSX.Element[]} jsx element to be rendered by the function
 * @returns userEvent async setup and the render of the element pass as a param
 *
 * @example it can be destructure as { user } = userFormRender(<Element />)
 * then it can be used as await user.methodToUse()
 */
const userEventsPlusRender = (jsx) => {
  return { user: userEvent.setup(), ...render(jsx) }
}

export { screen } from '../../test-utils/testing-library-utils'
export default userEventsPlusRender
