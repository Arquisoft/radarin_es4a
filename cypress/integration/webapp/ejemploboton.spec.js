import * as React from 'react'
import { mount } from '@cypress/react'
import Button from './Button'

it('Button', () => {
    cy.visit('https://radarines4awebapp.herokuapp.com')
    mount(<Button>Test button</Button>)
    cy.get('button').contains('Test button').click()
})