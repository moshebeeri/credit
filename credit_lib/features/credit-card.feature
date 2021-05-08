@credit
Feature: Credit Card
  In-order to do limit card validity
  any card has expiresion date
  I would like the card to have a 
  future expiration of 5 years from creation

  Scenario: Create Card With Expiretion Date
    Given card been created for new client 
    Then card expiration year in 5

  Scenario: Charge the creadit card
    Given a system created for the card
    Given issuer with balance of $100
    When card charge for $100 succeeded
    Then issuer obligo is $0

