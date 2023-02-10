// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import server from './mocks/server'

const beforeAllHandler = () => {
  server.listen()
}
const afterEachHandler = () => {
  server.resetHandlers()
}
const afterAllHandler = () => {
  server.resetHandlers()
}

/**
 * Establish APO mocking before all tests
 */
beforeAll(beforeAllHandler)

/**
 * Reset any request handlers that we may add during the tests,
 * so they don't affect other tests
 */
afterEach(afterEachHandler)

/**
 * Cleans up after the tests are finished
 */
afterAll(afterAllHandler)