Feature: Orders

  Background:
    Given the orders service is instantiated
    And the orders controller is instantiated


  Scenario: Create Order
    Given an order with the following items:
      | id | quantity | 
      | 2adb5089372e | 1 |          
      | 9822481c8d8d | 2 |          
      | 4707bcf066b0 | 3 |          
    And a total of 123.45
    And a customer of "372e4fefbc1c"
    When the order is created
    Then the new order will be:
      | id | total | status | customer | payment | fulfillment |
      | 44340298 | 123.45 | OPEN | 372e4fefbc1c | PENDING | UNFULFILLED | 
  
  Scenario: Get Order
    Given an order with the following items:
      | id | quantity | 
      | 2adb5089372e | 1 |          
      | 9822481c8d8d | 2 |          
      | 4707bcf066b0 | 3 |  
    And the following order info:
      | id | total | status | customer | payment | fulfillment |
      | 44340298 | 123.45 | OPEN | 372e4fefbc1c | PENDING | UNFULFILLED | 
    When I request an order with id "44340298"
    Then I will receive an order with the following info:
      | id | total | status | customer | payment | fulfillment |
      | 44340298 | 123.45 | OPEN | 372e4fefbc1c | PENDING | UNFULFILLED | 
    And the order will have the following items:
      | id | quantity | 
      | 2adb5089372e | 1 |          
      | 9822481c8d8d | 2 |          
      | 4707bcf066b0 | 3 |  

  Scenario: Update Order
    Given an order with the following items:
      | id | quantity | 
      | 2adb5089372e | 1 |          
      | 9822481c8d8d | 2 |          
      | 4707bcf066b0 | 3 |  
    And the following order info:
      | id | total | status | customer | payment | fulfillment |
      | 44340298 | 123.45 | OPEN | 372e4fefbc1c | PENDING | UNFULFILLED | 
    When I update payment to "PAID", fulfillment to "FULFILLED", and status to "CLOSED" for order id "44340298"
    Then the updated order will have the following info:
      | id | total | status | customer | payment | fulfillment |
      | 44340298 | 123.45 | CLOSED | 372e4fefbc1c | PAID | FULFILLED | 
    And the order will have the following items:
      | id | quantity | 
      | 2adb5089372e | 1 |          
      | 9822481c8d8d | 2 |          
      | 4707bcf066b0 | 3 |  
  
  Scenario: Delete Order
    Given an order with following info:
      | id | total | status | customer | payment | fulfillment |
      | 44340298 | 123.45 | OPEN | 372e4fefbc1c | PENDING | UNFULFILLED | 
    When I request to delete an order with id "44340298"
    Then that order "44340298" will not exist anymore

  Scenario: List Orders
    Given
    When
    Then
  
  Scenario: Search Orders
    Given
    When
    Then
