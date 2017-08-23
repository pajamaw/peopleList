import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var peopleContractAbi = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}];
var peopleContractAddress = '0x2fce1fc49a0b5f8655e5ab6ff7b8b0b6ff736def';
// since we've already deployed it we'lljust create an instance of this
//so we can now use a contract Factory method to create an instance of our contract
//via the abi

//by running ETHEREUM_CLIENT.eth.contract(peopleContractAbi)
//then passing in the address
// ETHEREUM_CLIENT.eth.contract(peopleContractAbi).at(peopleContractAddress)
// then we now have the true contract!

var peopleContract = new ETHEREUM_CLIENT.eth.Contract(peopleContractAbi, peopleContractAddress);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }
  componentWillMount() {
    peopleContract.methods.getPeople().call().then( res => (
      this.setState({
        firstNames: (String(res[0])).split(','),
        lastNames: (String(res[1])).split(','),
        ages: String(res[2]).split(',')
      })
    )

    )

  }

  render() {

    let tableRows = this.state.firstNames.map((value, index) => (
      <tr>
        <td>{Web3.utils.toUtf8(this.state.firstNames[index])}</td>
        <td>{Web3.utils.toUtf8(this.state.lastNames[index])}</td>
        <td>{this.state.ages[index]}</td>
      </tr>
    ))
    return (
      <div className="App">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
        {tableRows}

        </tbody>
      </table>
      </div>
    );
  }
}

export default App;
