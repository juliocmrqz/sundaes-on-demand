import { render } from '@testing-library/react'
import { OrderDetailsProvider } from '../context/OrderDetails'

/**
 * As an optional behaviour, we can override the render method in order
 * to use the same method name rendering with the OrderDetailsProvider
 * ----
 * If we need to render with providers we use it from here, if not
 * we can directly call the render method from the testing-library/react
 * ----
 * As this file is re-exporting * (everything) from the testing-library/react
 * we can use the whole library import from this file
 */
const renderWithContext_OrderDetailsProvider = (uiComponent, options) => {
  return render(uiComponent, { wrapper: OrderDetailsProvider, ...options })
}

export * from '@testing-library/react'
export { renderWithContext_OrderDetailsProvider as render }
