Feature: The program should produce the specified output for the example given

  Scenario: The program is run with -q='ack'
    Given an empty file named "hello.txt"
    And an empty file named "world.js"
    And an empty file named "another.js"
    When I run `ack.js -q='.js'`
    Then the output should contain:
    """
    ./another.js
    ./world.js
    """

