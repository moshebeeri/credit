@ledger
Feature: Ledger
  In order to do calculate bucket according to percentailes

  Scenario: create ledger
    Given you have initialized transactions 
    Then you should add the lines to the ledger
    Then you should retrieve the ledger transactions sorted


