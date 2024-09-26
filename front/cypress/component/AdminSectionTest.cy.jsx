
import AdminSection from "../../src/components/Admin/AdminSection"
import { MemoryRouter } from 'react-router-dom'

const customMount = (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>
  return cy.mount(wrapped, mountOptions)
}

describe('Componente AdminSection', () => {
  it('Testando componente sem props', () => {
    customMount(<AdminSection />);

    cy.get('h4')
      .should('have.length', 1)
      .and('be.empty')
      .and('have.attr', 'class')
      .and('include', 'mt-3')

    cy.get('div.row')
      .should('have.length', 1)
      .and('be.empty')

    cy.get('hr').should('have.length', 1)
  })

  it('Testando componente com a props tite', () => {
    customMount(<AdminSection title="Cypress" />);

    cy.get('h4')
      .should('have.length', 1)
      .and('have.text', 'Cypress')
      .and('have.attr', 'class')
      .and('include', 'mt-3')

    cy.get('div.row')
      .should('have.length', 1)
      .and('be.empty');

    cy.get('hr').should('have.length', 1)
  })
})