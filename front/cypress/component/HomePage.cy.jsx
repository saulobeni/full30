
import Home from "../../src/pages/Home"
import { MemoryRouter } from 'react-router-dom'

const customMount = (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>
  return cy.mount(wrapped, mountOptions)
}

describe('HomePage.cy.jsx', () => {
  it('playground', () => {
    customMount(<Home />);
    cy.get(':nth-child(1) > a').should('have.text', 'Dashboard')
  })
})