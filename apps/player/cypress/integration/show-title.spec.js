/* eslint-env mocha */
/* globals cy */
describe('<show-title>', () => {
  beforeEach(cy.setup)

  describe('render', () => {
    it('should render', function() {
      cy.bootstrap('<show-title></show-title>', [this.show])
      cy.select('show-title').should('exist')
    })

    it('should set the font', function() {
      cy.bootstrap('<show-title></show-title>', [this.show, this.theme])
      cy.select('show-title').should('have.css', 'font-family', 'boldFont')
      cy.select('show-title').should('have.css', 'color', 'rgb(230, 68, 21)')
    })
  })

  describe('logic', () => {
    it('should render just the text if no link is available', function() {
      cy.bootstrap('<show-title></show-title>', [{ title: this.show.title }])
      cy.select('show-title--link').should('not.exist')
      cy.select('show-title--text').should('exist')
    })

    it('should render the show link if available', function() {
      cy.bootstrap('<show-title></show-title>', [this.show])
      cy.select('show-title--link')
        .its('href')
        .should('be', 'http://link/to/show')
    })

    it('should render the target to _parent when in native mode', function() {
      cy.bootstrap('<show-title></show-title>', [this.show])
      cy.select('show-title--link')
        .its('target')
        .should('be', '_parent')
    })

    it('should render the target to _blank when in native mode', function() {
      cy.bootstrap('<show-title></show-title>', [this.show, { runtime: { mode: 'embed' } }])
      cy.select('show-title--link')
        .its('target')
        .should('be', '_blank')
    })
  })
})
