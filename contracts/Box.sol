// Logic Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Box is Ownable {
    uint256 internal value;
    
    // mitted when the stores value changes
    event ValueChanged(uint256 newValue);

    constructor() {}

    // stores a new value in the contract
    function store(uint256 newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // reads the last store value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
