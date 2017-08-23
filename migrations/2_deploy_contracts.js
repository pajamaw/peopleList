var people = artifacts.require("./people.sol");

module.exports = function(deployer) {
  deployer.deploy(people);
};
