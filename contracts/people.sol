pragma solidity ^0.4.11;

contract People {

  Person[] public people;

  struct Person {
    bytes32 firstName;
    bytes32 lastName;
    uint age;
  }

  function addPerson(bytes32 _firstName, bytes32 _lastName, uint _age) returns (bool success) {

    Person memory newPerson;
    // ethereum vm has callstack
    // and memory where you can store state variables
    // this doesn't cost gas as it deosn't change st
    newPerson.firstName = _firstName;
    newPerson.lastName = _lastName;
    newPerson.age = _age;

    people.push(newPerson);
    //this is a transaction
    //this costs gas
    //
    return true;
  }

  function getPeople() constant returns (bytes32[], bytes32[], uint[]) {
    // so return an array of arrays instead
    //because you can have different length strings,
    // it's an issue when you're adding different ones in an arrays
    // so we change strings -> hexadecimal type and then pad it
    // we'll use a loop
    // hte only time it's an issue is when you're looping over a state
    uint length = people.length;

    bytes32[] memory firstNames = new bytes32[](length);
    bytes32[] memory lastNames = new bytes32[](length);
    uint[] memory ages = new uint[](length);

    for (uint i = 0; i < people.length; i++){
      Person memory currentPerson;
      //
      currentPerson = people[i];

      firstNames[i] = currentPerson.firstName;
      lastNames[i] = currentPerson.lastName;
      ages[i] = currentPerson.age;

    }
      return (firstNames,lastNames,ages);
      //this is a tuple
  }
  //can't return struct's in solidity
  //useful if you're trying to call function from another place
}
